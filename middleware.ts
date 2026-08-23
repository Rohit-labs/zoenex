import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALID_PATHS = new Set([
  "/",
  "/work",
  "/services/ai-automation",
  "/services/websites",
  "/contact"
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, internal Next.js routes, or files containing extensions (e.g. .ico, .txt, .png)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const acceptHeader = request.headers.get("accept") || "";
  const isMarkdownRequested =
    acceptHeader.includes("text/markdown") ||
    acceptHeader.includes("text/x-markdown");

  if (isMarkdownRequested) {
    const url = request.nextUrl.clone();

    if (VALID_PATHS.has(pathname)) {
      url.pathname = `/markdown${pathname === "/" ? "" : pathname}`;
      const response = NextResponse.rewrite(url);
      response.headers.set("Content-Type", "text/markdown; charset=utf-8");
      response.headers.set("Vary", "Accept");
      return response;
    } else {
      url.pathname = "/markdown/not-found";
      const response = NextResponse.rewrite(url, {
        status: 404,
        statusText: "Not Found",
      });
      response.headers.set("Content-Type", "text/markdown; charset=utf-8");
      response.headers.set("Vary", "Accept");
      return response;
    }
  }

  // Regular HTML client requests
  const response = NextResponse.next();
  response.headers.set("Vary", "Accept");
  return response;
}
