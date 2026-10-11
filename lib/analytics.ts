/**
 * Google Analytics (gtag) helper for Zoenex Studios
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEventName =
  | "audit_cta_click"
  | "audit_form_start"
  | "audit_form_submit"
  | "audit_form_success"
  | "audit_form_error"
  | "contact_form_start"
  | "contact_form_submit"
  | "contact_form_success"
  | "contact_form_error";

export function trackEvent(
  eventName: AnalyticsEventName | string,
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
