import getValue from "@/configs/constants";

const API_BASE = getValue("API");

export interface HeroPromo {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  media_url: string;
  media_type: "image" | "video";
  thumbnail_url?: string | null;
  button_text?: string | null;
  button_link?: string | null;
  display_order: number;
  duration_seconds: number;
  is_active: boolean;
  start_date?: string | null;
  end_date?: string | null;
}

export interface FeatureCard {
  id: string;
  title: string;
  description?: string | null;
  image_url: string;
  button_text?: string | null;
  button_link?: string | null;
  display_order: number;
  is_active: boolean;
  start_date?: string | null;
  end_date?: string | null;
}

export interface PromoVideo {
  id: string;
  title: string;
  description?: string | null;
  video_url: string;
  thumbnail_url: string;
  category?: string | null;
  display_order: number;
  is_active: boolean;
  start_date?: string | null;
  end_date?: string | null;
}

export async function getActiveHeroPromos(): Promise<HeroPromo[]> {
  try {
    const response = await fetch(`${API_BASE}website/hero-promos/active`, {
      method: "GET",
      cache: "no-store", // Always fetch fresh data
    });

    if (!response.ok) {
      console.error("Failed to fetch hero promos:", response.statusText);
      return [];
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching hero promos:", error);
    return [];
  }
}

export async function getActiveFeatureCards(): Promise<FeatureCard[]> {
  try {
    const response = await fetch(`${API_BASE}website/feature-cards/active`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch feature cards:", response.statusText);
      return [];
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching feature cards:", error);
    return [];
  }
}

export async function getActivePromoVideos(category?: string): Promise<PromoVideo[]> {
  try {
    const url = category
      ? `${API_BASE}website/promo-videos/active?category=${encodeURIComponent(category)}`
      : `${API_BASE}website/promo-videos/active`;

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch promo videos:", response.statusText);
      return [];
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching promo videos:", error);
    return [];
  }
}
