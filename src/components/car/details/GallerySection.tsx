'use client';

import { useState } from 'react';
import Image from 'next/image';
import GalleryLightbox from './GalleryLightbox';

export default function GallerySection({ car }: any) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="design" className="space-y-6">
      <h2 className="text-2xl font-bold">Gallery</h2>

      <div className="grid grid-cols-2 gap-4">
        {car.gallery.exterior.map((img: any, i: number) => (
          <div key={i} onClick={() => setLightbox(i)}>
            <Image src={img.src} alt={img.title} width={400} height={300} />
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <GalleryLightbox
          images={car.gallery.exterior}
          index={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}