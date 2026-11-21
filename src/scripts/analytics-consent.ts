const containerId = document.documentElement.dataset.analyticsId;
const preferenceKey = 'portfolio-analytics-consent';
const tagManagerScriptId = 'portfolio-tag-manager';

function hasConsent(): boolean {
  try {
    return localStorage.getItem(preferenceKey) === 'granted';
  } catch {
    return false;
  }
}

function loadTagManager(id: string): void {
  if (document.getElementById(tagManagerScriptId)) return;

  const tagWindow = window as Window & { dataLayer?: unknown[] };
  const dataLayer = tagWindow.dataLayer ??= [];
  dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.id = tagManagerScriptId;
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtm.js?id=' + id;
  document.head.append(script);
}

function initializeAnalytics(id: string): void {
  if (hasConsent()) loadTagManager(id);

  const preferences = document.getElementById('analytics-preferences');
  const checkbox = document.querySelector<HTMLInputElement>('#analytics-consent');
  const status = document.getElementById('analytics-status');

  function updatePreferences(): void {
    const granted = hasConsent();
    if (checkbox) checkbox.checked = granted;
    if (status) status.textContent = granted ? 'Medición activada.' : 'Medición desactivada.';
  }

  function stopIfRevoked(): void {
    if (!hasConsent() && document.getElementById(tagManagerScriptId)) {
      window.location.reload();
    }
  }

  if (preferences && checkbox && status) {
    updatePreferences();
    preferences.hidden = false;

    checkbox.addEventListener('change', () => {
      try {
        localStorage.setItem(preferenceKey, checkbox.checked ? 'granted' : 'denied');
      } catch {
        updatePreferences();
        status.textContent = 'No se pudo guardar la preferencia en este navegador.';
        return;
      }

      updatePreferences();
      if (checkbox.checked) loadTagManager(id);
      else stopIfRevoked();
    });
  }

  window.addEventListener('storage', (event) => {
    if (event.key !== preferenceKey && event.key !== null) return;
    stopIfRevoked();
    updatePreferences();
  });

  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    stopIfRevoked();
    updatePreferences();
  });
}

if (containerId) initializeAnalytics(containerId);
