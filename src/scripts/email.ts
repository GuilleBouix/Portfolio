// Copy Email to Clipboard
const EMAIL_ADDRESS = 'bouix.dev@gmail.com';

async function copyEmailToClipboard(): Promise<void> {
  try {
    await navigator.clipboard.writeText(EMAIL_ADDRESS);
    alert('¡Dirección de Email copiada!');
  } catch (err) {
    console.error('Error al copiar la dirección de Email:', err);
  }
}

const copyEmailBtn = document.getElementById('copy-email-btn');

copyEmailBtn?.addEventListener('click', copyEmailToClipboard);
