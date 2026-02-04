"use client";

import { useState } from "react";
import Image from "next/image";

type ProductGalleryProps = {
  images: string[];
  title: string;
};

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div style={{ 
        width: "100%", 
        height: "400px", 
        background: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px"
      }}>
        <p style={{ color: "#999" }}>Sin imágenes</p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      {/* Imagen principal */}
      <div style={{ position: "relative", width: "100%", height: "400px", marginBottom: "1rem" }}>
        <Image
          src={images[selectedImage]}
          alt={`${title} - imagen ${selectedImage + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: "cover",
            borderRadius: "12px",
            border: "1px solid #ddd",
          }}
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              style={{
                position: "relative",
                width: "80px",
                height: "80px",
                padding: 0,
                border: selectedImage === index ? "3px solid #0070f3" : "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                cursor: "pointer",
                background: "transparent",
                transition: "all 0.2s",
                opacity: selectedImage === index ? 1 : 0.6,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                if (selectedImage !== index) {
                  e.currentTarget.style.opacity = "0.6";
                }
              }}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                style={{
                  objectFit: "cover",
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
