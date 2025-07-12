declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
export const GA_MEASUREMENT_ID = "G-NSQ7GER1G"; // Replace with your actual ID

type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

export const pageview = (url: string) => {
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
