'use client'

import { useState } from 'react'
import type { CosmicImage } from '@/types'

interface ImageGalleryProps {
  featuredImage?: CosmicImage;
  gallery?: CosmicImage[];
  title: string;
}

export default function ImageGallery({ featuredImage, gallery, title }: ImageGalleryProps) {
  const images: CosmicImage[] = [
    ...(featuredImage ? [featuredImage] : []),
    ...(gallery || []),
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="w-full h-64 sm:h-96 bg-gray-100 rounded-2xl flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  const activeImage = images[activeIndex];

  if (!activeImage) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="w-full h-64 sm:h-96 md:h-[28rem] rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={`${activeImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
          alt={title}
          width={1600}
          height={900}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                i === activeIndex ? 'border-coral' : 'border-transparent'
              }`}
            >
              <img
                src={`${img.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={`${title} thumbnail ${i + 1}`}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}