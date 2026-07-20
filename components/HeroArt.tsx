"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";

/* ============================================================
   HERO 3D — neural / data-flow graph (Three.js)
   A rotating node network with pulses travelling the edges,
   reacting to the pointer. Reads as "AI automation".

   three.js is loaded lazily and the scene only starts once the
   intro loader has finished (or the browser is idle), so first
   paint / hydration never competes with WebGL setup — the CSS
   fallback covers the gap.
   ============================================================ */

type Pulse = {
  mesh: THREE.Mesh;
  glow: THREE.Sprite;
  edge: number;
  t: number;
  speed: number;
};

export default function HeroArt() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // keep static fallback

    let disposed = false;
    let teardown: (() => void) | null = null;

    function init(THREE: typeof import("three")) {
      let scene: THREE.Scene;
      let camera: THREE.PerspectiveCamera;
      let renderer: THREE.WebGLRenderer | null = null;
      let group: THREE.Group;
      let raf: number | null = null;
      let ro: ResizeObserver | null = null;
      const pulses: Pulse[] = [];
      const pointer = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };
      let W = 1;
      let H = 1;
      // phones don't need retina-density WebGL here — the art sits at
      // 50% opacity behind the copy; 1.5x is indistinguishable
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const DPR = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);

      // palette
      const COBALT = 0x243ee8,
        INK = 0x252323,
        SKY = 0x243ee8;

      function size() {
        const r = mount!.getBoundingClientRect();
        W = Math.max(1, r.width);
        H = Math.max(1, r.height);
      }

      function build() {
        size();
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
        camera.position.set(0, 0, 22);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(DPR);
        renderer.setSize(W, H);
        mount!.appendChild(renderer.domElement);
        mount!.classList.add("live");

        group = new THREE.Group();
        scene.add(group);

        // radial glow sprite texture (reused for bloom-like halos)
        const glowTex = (() => {
          const c = document.createElement("canvas");
          c.width = c.height = 128;
          const g = c.getContext("2d")!;
          const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
          grd.addColorStop(0, "rgba(255,255,255,1)");
          grd.addColorStop(0.25, "rgba(36,62,232,0.85)");
          grd.addColorStop(1, "rgba(36,62,232,0)");
          g.fillStyle = grd;
          g.fillRect(0, 0, 128, 128);
          return new THREE.CanvasTexture(c);
        })();

        // --- generate nodes on a rough sphere (fibonacci) ---
        const N = 36,
          R = 3.6,
          nodes: THREE.Vector3[] = [];
        for (let i = 0; i < N; i++) {
          const y = 1 - (i / (N - 1)) * 2,
            r = Math.sqrt(1 - y * y);
          const phi = i * Math.PI * (3 - Math.sqrt(5));
          nodes.push(new THREE.Vector3(Math.cos(phi) * r, y, Math.sin(phi) * r).multiplyScalar(R * (0.82 + Math.random() * 0.18)));
        }

        // node meshes (small icosahedrons = "processing units") + glow halos
        const nodeGeo = new THREE.IcosahedronGeometry(0.16, 0);
        const nodeMat = new THREE.MeshBasicMaterial({ color: COBALT });
        const nodeMatDim = new THREE.MeshBasicMaterial({ color: INK });
        nodes.forEach((p, idx) => {
          const hot = idx % 4 === 0;
          const m = new THREE.Mesh(nodeGeo, hot ? nodeMat : nodeMatDim);
          m.position.copy(p);
          const s = 0.7 + Math.random() * 0.9;
          m.scale.setScalar(s);
          m.userData.base = s;
          group.add(m);
          if (hot) {
            // glow halo only on the cobalt "active" nodes
            const halo = new THREE.Sprite(
              new THREE.SpriteMaterial({
                map: glowTex,
                color: 0x243ee8,
                transparent: true,
                opacity: 0.55,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
              })
            );
            halo.position.copy(p);
            const hs = 1.6 + Math.random() * 0.8;
            halo.scale.setScalar(hs);
            halo.userData.haloBase = hs;
            halo.userData.seed = Math.random() * 6.28;
            group.add(halo);
          }
        });

        // --- edges: connect near neighbours ---
        const edges: Array<[number, number]> = [];
        for (let a = 0; a < N; a++) {
          const d: Array<[number, number]> = [];
          for (let b = 0; b < N; b++) {
            if (a !== b) d.push([b, nodes[a].distanceTo(nodes[b])]);
          }
          d.sort((x, y) => x[1] - y[1]);
          const k = 2 + (a % 2); // 2-3 connections each
          for (let c = 0; c < k; c++) {
            const j = d[c][0];
            if (a < j) edges.push([a, j]); // avoid dupes
          }
        }

        // depth-graded line colours (closer = cobalt, farther = faint ink) via vertex colors
        const linePos: number[] = [],
          lineCol: number[] = [];
        const cCobalt = new THREE.Color(COBALT),
          cInk = new THREE.Color(INK);
        edges.forEach((e) => {
          const p1 = nodes[e[0]],
            p2 = nodes[e[1]];
          linePos.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
          [p1, p2].forEach((pp) => {
            const mix = (pp.z + R) / (2 * R); // 0..1 by depth
            const col = cInk.clone().lerp(cCobalt, mix * 0.6);
            lineCol.push(col.r, col.g, col.b);
          });
        });
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
        lineGeo.setAttribute("color", new THREE.Float32BufferAttribute(lineCol, 3));
        const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.32 });
        const lines = new THREE.LineSegments(lineGeo, lineMat);
        group.add(lines);

        // --- travelling pulses: bright core + additive glow sprite ---
        const pulseGeo = new THREE.SphereGeometry(0.11, 10, 10);
        const pulseMat = new THREE.MeshBasicMaterial({ color: 0xf3f0eb });
        for (let pI = 0; pI < 12; pI++) {
          const mesh = new THREE.Mesh(pulseGeo, pulseMat);
          const glow = new THREE.Sprite(
            new THREE.SpriteMaterial({
              map: glowTex,
              color: pI % 2 ? SKY : COBALT,
              transparent: true,
              opacity: 0.9,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            })
          );
          glow.scale.setScalar(1.1);
          mesh.add(glow);
          group.add(mesh);
          pulses.push({ mesh, glow, edge: (Math.random() * edges.length) | 0, t: Math.random(), speed: 0.14 + Math.random() * 0.22 });
        }

        // --- ambient particle dust field ---
        const pcount = 140,
          pPos: number[] = [];
        for (let d2 = 0; d2 < pcount; d2++) {
          const rr = R * (1.05 + Math.random() * 0.7),
            th = Math.random() * 6.28,
            ph = Math.acos(2 * Math.random() - 1);
          pPos.push(rr * Math.sin(ph) * Math.cos(th), rr * Math.sin(ph) * Math.sin(th), rr * Math.cos(ph));
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute("position", new THREE.Float32BufferAttribute(pPos, 3));
        const particles = new THREE.Points(
          pGeo,
          new THREE.PointsMaterial({ color: 0x252323, size: 0.06, transparent: true, opacity: 0.5, sizeAttenuation: true })
        );
        group.add(particles);

        // faint outer wireframe shell for depth
        const shell = new THREE.Mesh(
          new THREE.IcosahedronGeometry(R * 1.12, 1),
          new THREE.MeshBasicMaterial({ color: INK, wireframe: true, transparent: true, opacity: 0.06 })
        );
        group.add(shell);

        // stash for animation
        group.userData = { nodes, edges, particles };

        // keep canvas correctly sized against any later layout shifts
        if (typeof ResizeObserver !== "undefined") {
          ro = new ResizeObserver(() => onResize());
          ro.observe(mount!);
        }
      }

      function animate() {
        raf = requestAnimationFrame(animate);
        target.x += (pointer.x - target.x) * 0.05;
        target.y += (pointer.y - target.y) * 0.05;

        const t = performance.now() * 0.001;
        group.rotation.y = t * 0.1 + target.x * 0.5;
        group.rotation.x = Math.sin(t * 0.18) * 0.12 + target.y * 0.35;

        // pulse nodes + breathe halos
        for (let i = 0; i < group.children.length; i++) {
          const c = group.children[i] as THREE.Mesh | THREE.Sprite;
          if (c.userData && c.userData.base != null) {
            c.scale.setScalar(c.userData.base * (1 + Math.sin(t * 2.4 + i) * 0.12));
          } else if (c.userData && c.userData.haloBase != null) {
            const hb = c.userData.haloBase * (1 + Math.sin(t * 1.8 + c.userData.seed) * 0.18);
            c.scale.setScalar(hb);
            (c as THREE.Sprite).material.opacity = 0.4 + Math.sin(t * 1.8 + c.userData.seed) * 0.18;
          }
        }

        // move pulses along edges
        const nodes: THREE.Vector3[] = group.userData.nodes,
          edges: Array<[number, number]> = group.userData.edges;
        for (let p = 0; p < pulses.length; p++) {
          const pu = pulses[p];
          pu.t += pu.speed * 0.016;
          if (pu.t >= 1) {
            pu.t = 0;
            pu.edge = (Math.random() * edges.length) | 0;
          }
          const e = edges[pu.edge],
            a = nodes[e[0]],
            b = nodes[e[1]];
          pu.mesh.position.lerpVectors(a, b, pu.t);
          const fade = Math.sin(pu.t * Math.PI);
          pu.mesh.scale.setScalar(0.5 + fade * 0.9);
          if (pu.glow) pu.glow.material.opacity = fade;
        }

        // drift the particle dust the opposite way for subtle depth
        if (group.userData.particles) {
          group.userData.particles.rotation.y = -t * 0.04;
          group.userData.particles.rotation.z = t * 0.02;
        }

        renderer!.render(scene, camera);
      }

      function onResize() {
        if (!renderer) return;
        size();
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        renderer.setSize(W, H);
      }

      // pointer parallax (whole window, subtle)
      const onMouseMove = (e: MouseEvent) => {
        pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
        pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("resize", onResize);

      // pause when tab hidden to save battery
      const onVisibility = () => {
        if (document.hidden) {
          if (raf) {
            cancelAnimationFrame(raf);
            raf = null;
          }
        } else if (!raf && renderer) {
          animate();
        }
      };
      document.addEventListener("visibilitychange", onVisibility);

      let didBuild = false;
      let pollId: number | null = null;
      function tryBuild() {
        if (didBuild) return;
        const r = mount!.getBoundingClientRect();
        if (r.width > 4 && r.height > 4) {
          didBuild = true;
          try {
            build();
            animate();
          } catch {
            mount!.classList.remove("live");
            if (renderer && renderer.domElement && renderer.domElement.parentNode) {
              renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
            renderer = null;
          }
        }
      }

      // build once the mount has a size (poll a generous window, as before)
      let tries = 0;
      (function poll() {
        if (didBuild) return;
        tryBuild();
        if (!didBuild && tries++ < 720) pollId = requestAnimationFrame(poll);
      })();

      return () => {
        if (raf) cancelAnimationFrame(raf);
        if (pollId) cancelAnimationFrame(pollId);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
        if (ro) ro.disconnect();
        if (renderer) {
          renderer.dispose();
          if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
          renderer = null;
        }
        mount!.classList.remove("live");
      };
    }

    // start fetching the three.js chunk right away (network + streaming
    // compile happen off the critical path) …
    const threePromise = import("three");
    const begin = () => {
      threePromise.then((THREE) => {
        if (!disposed) teardown = init(THREE);
      });
    };

    // … but only build the scene after the intro loader has swept away
    // (hard load) or the main thread is idle (soft navigation)
    let onLoaded: (() => void) | null = null;
    let idleId: number | null = null;
    let timeoutId: number | null = null;
    if (document.body.classList.contains("loading")) {
      onLoaded = begin;
      window.addEventListener("zoenex:loaded", onLoaded, { once: true });
    } else if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(begin, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(begin, 200);
    }

    return () => {
      disposed = true;
      if (onLoaded) window.removeEventListener("zoenex:loaded", onLoaded);
      if (idleId != null && typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
      if (timeoutId != null) clearTimeout(timeoutId);
      if (teardown) teardown();
    };
  }, []);

  return (
    <div className="hero-art" ref={mountRef} aria-hidden="true">
      <div className="fallback">
        <div className="ring" />
        <div className="ring" />
        <div className="ring" />
        <div className="core" />
      </div>
    </div>
  );
}
