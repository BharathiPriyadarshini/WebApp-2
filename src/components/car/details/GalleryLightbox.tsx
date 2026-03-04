'use client';

export default function GalleryLightbox({ images, index, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
      <img src={images[index].src} className="max-h-[80vh]" />
      <button onClick={onClose} className="absolute top-4 right-4 text-white">
        Close
      </button>
    </div>
  );
}