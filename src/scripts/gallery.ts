interface GalleryImage {
  src: string;
  alt: string;
}

export function initGallery(container: HTMLElement, images: GalleryImage[]): void {
  const wrapper = container.querySelector<HTMLElement>('#gallery-wrapper');
  const image = container.querySelector<HTMLImageElement>('#gallery-image');
  const previous = container.querySelector<HTMLButtonElement>('#prev-btn');
  const next = container.querySelector<HTMLButtonElement>('#next-btn');
  const counter = container.querySelector<HTMLElement>('#current-index');
  const status = container.querySelector<HTMLElement>('#gallery-status');

  if (!wrapper || !image || !previous || !next || !counter || !status || images.length === 0) return;

  let currentIndex = 0;

  const applyAspectRatio = () => {
    if (image.naturalWidth && image.naturalHeight) {
      wrapper.style.aspectRatio = `${image.naturalWidth} / ${image.naturalHeight}`;
    }
  };

  const updateControls = () => {
    previous.setAttribute('aria-disabled', String(currentIndex === 0));
    next.setAttribute('aria-disabled', String(currentIndex === images.length - 1));
  };

  const move = (offset: number) => {
    const index = currentIndex + offset;
    if (index < 0 || index >= images.length) return;

    currentIndex = index;
    const { src, alt } = images[currentIndex];
    image.src = src;
    image.alt = alt;
    counter.textContent = String(currentIndex + 1);
    status.textContent = `Imagen ${currentIndex + 1} de ${images.length}. ${alt}`;
    updateControls();

    if (image.complete) applyAspectRatio();
  };

  image.addEventListener('load', applyAspectRatio);
  if (image.complete) applyAspectRatio();

  if (images.length === 1) return;

  updateControls();
  previous.hidden = false;
  next.hidden = false;

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));

  container.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

    event.preventDefault();
    move(event.key === 'ArrowLeft' ? -1 : 1);
  });
}
