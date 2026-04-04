// Gallery Navigation
interface GalleryImage {
  src: string;
  alt: string;
}

export function initGallery(images: GalleryImage[]): void {
  let currentIndex = 0;

  const galleryImage = document.getElementById('gallery-image') as HTMLImageElement | null;
  const prevBtn = document.getElementById('prev-btn') as HTMLButtonElement | null;
  const nextBtn = document.getElementById('next-btn') as HTMLButtonElement | null;
  const currentIndexSpan = document.getElementById('current-index');

  if (!galleryImage || !prevBtn || !nextBtn || !currentIndexSpan) return;

  function updateGallery(): void {
    galleryImage.src = images[currentIndex].src;
    galleryImage.alt = images[currentIndex].alt;
    currentIndexSpan.textContent = String(currentIndex + 1);

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === images.length - 1;
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
