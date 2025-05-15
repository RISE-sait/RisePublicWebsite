"use client";

import { useState, useEffect } from "react";
import { getHaircuts } from "@/services/haircuts";

/**
 * React hook to fetch haircut image URLs.
 *
 * @param limit Optional maximum number of images to return.
 * @returns An object { images, loading, error }
 */
export function useHaircuts(limit?: number) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setLoading(true);
    setError(undefined);

    getHaircuts()
      .then((list) => {
        // optionally slice to the requested limit
        setImages(limit ? list.slice(0, limit) : list);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [limit]);

  return { images, loading, error };
}
