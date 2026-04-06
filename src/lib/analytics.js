import ReactGA from "react-ga4";

let initialized = false;

export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;

  const trackingIds = [
    import.meta.env.VITE_GA_MEASUREMENT_ID,
    import.meta.env.VITE_GOOGLE_ADS_ID,
  ].filter(Boolean);
  if (trackingIds.length === 0) return;

  ReactGA.initialize(
    trackingIds.map((trackingId) => ({ trackingId })),
  );
  initialized = true;
}

function track(eventName, params) {
  if (!initialized) return;
  ReactGA.event(eventName, params);
}

export function trackPremiumNodeClick(params) {
  track("premium_node_click", params);
}

export function trackPremiumMenuClick(eventName, params) {
  track(eventName, params);
}
