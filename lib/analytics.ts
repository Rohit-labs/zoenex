/**
 * Google Analytics (gtag) helper for Zoenex Studios
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AuditEventName =
  | "audit_cta_click"
  | "audit_form_start"
  | "audit_form_submit"
  | "audit_form_success"
  | "audit_form_error";

export function trackEvent(
  eventName: AuditEventName | string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", eventName, params);
    } catch (err) {
      console.warn("Analytics event tracking failed:", err);
    }
  }
}
