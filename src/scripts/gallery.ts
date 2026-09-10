// Gallery Navigation
interface GalleryImage {
  src: string;
  alt: string;
}

export function initGallery(images: GalleryImage[]): void {
  let currentIndex = 0;

  const galleryWrapper = document.getElementById('gallery-wrapper') as HTMLElement | null;
  const galleryImage = document.getElementById('gallery-image') as HTMLImageElement | null;
  const prevBtn = document.getElementById('prev-btn') as HTMLButtonElement | null;
  const nextBtn = document.getElementById('next-btn') as HTMLButtonElement | null;
  const currentIndexSpan = document.getElementById('current-index');

  if (!galleryWrapper || !galleryImage || !prevBtn || !nextBtn || !currentIndexSpan) return;

  function applyAspectRatio(): void {
    if (!galleryImage!.naturalWidth || !galleryImage!.naturalHeight) return;
    galleryWrapper!.style.aspectRatio = `${galleryImage!.naturalWidth} / ${galleryImage!.naturalHeight}`;
  }

  function updateGallery(): void {
    galleryImage.src = images[currentIndex].src;
    galleryImage.alt = images[currentIndex].alt;
    currentIndexSpan.textContent = String(currentIndex + 1);

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === images.length - 1;

    if (galleryImage.complete) {
      applyAspectRatio();
    } else {
      galleryImage.addEventListener('load', applyAspectRatio, { once: true });
    }
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateGallery();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      updateGallery();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      currentIndex--;
      updateGallery();
    } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
      currentIndex++;
      updateGallery();
    }
  });

  updateGallery();
}
