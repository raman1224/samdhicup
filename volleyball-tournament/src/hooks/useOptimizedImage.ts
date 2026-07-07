"use client";

import { useState, useEffect } from "react";

interface OptimizedImageOptions {
  quality?: number;
  width?: number;
  height?: number;
}

export function useOptimizedImage(
  src: string,
  options: OptimizedImageOptions = {}
) {
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!src) return;

    const { quality = 80, width = 800, height } = options;
    
    // Cloudinary optimization
    if (src.includes("cloudinary.com")) {
      const urlParts = src.split("/upload/");
      const transformations = `q_${quality},w_${width}${height ? `,h_${height}` : ""},f_auto,c_limit`;
      setOptimizedSrc(`${urlParts[0]}/upload/${transformations}/${urlParts[1]}`);
    }
    
    setLoading(false);
  }, [src, options]);

  return { optimizedSrc, loading };
}