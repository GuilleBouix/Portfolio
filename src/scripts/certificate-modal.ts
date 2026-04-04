// Certificate Modal
interface CertificateMap {
  [key: string]: string;
}

const CERTIFICATES: CertificateMap = {
  btnCertificate1: '/img/certificates/certificate-1.webp',
  btnCertificate2: '/img/certificates/certificate-2.webp',
  btnCertificate3: '/img/certificates/certificate-3.webp',
};

export function initCertificateModal(): void {
  const modal = document.getElementById('certificateModal');
  const certificateImg = document.getElementById('certificateImg') as HTMLImageElement | null;
  const closeModal = document.getElementById('closeModal');

  if (!modal || !certificateImg || !closeModal) return;

  function openModal(imagePath: string): void {
    certificateImg.src = imagePath;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModalFunc(): void {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  Object.entries(CERTIFICATES).forEach(([btnId, imagePath]) => {
    const btn = document.getElementById(btnId);
    btn?.addEventListener('click', () => openModal(imagePath));
  });

  closeModal.addEventListener('click', closeModalFunc);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModalFunc();
    }
  });
}

initCertificateModal();
