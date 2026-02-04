import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Si en el futuro usas imágenes de dominios externos, agrégalos aquí
    remotePatterns: [],
  },
};

export default nextConfig;
