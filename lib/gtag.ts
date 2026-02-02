declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const GA_MEASUREMENT_ID = "G-NSQ7GER1GK";

type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

// Check if GA is loaded (user gave consent and scripts loaded)
const isGALoaded = (): boolean => {
  return typeof window !== "undefined" && typeof window.gtag === "function";
};

export const pageview = (url: string): void => {
  if (!isGALoaded()) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: GTagEvent): void => {
  if (!isGALoaded()) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
