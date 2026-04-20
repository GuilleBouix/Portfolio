(function () {
  const APPS_SCRIPT_URL = "/api/track";

  interface UTMs {
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_term: string;
    utm_content: string;
  }

  interface UAInfo {
    os: string;
    navegador: string;
    dispositivo: string;
  }

  interface LeadPayload extends UTMs, UAInfo {
    timestamp: string;
    pagina: string;
    resolucion: string;
    idioma: string;
    tipo: string;
  }

  function getUTMs(): UTMs {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      utm_term: params.get("utm_term") ?? "",
      utm_content: params.get("utm_content") ?? "",
    };
  }

  function parseUserAgent(): UAInfo {
    const ua = navigator.userAgent;
    let os = "Desconocido",
      navegador = "Desconocido",
      dispositivo = "Desktop";

    if (/Windows/.test(ua)) os = "Windows";
    else if (/Mac OS/.test(ua)) os = "macOS";
    else if (/Android/.test(ua)) os = "Android";
    else if (/iPhone|iPad/.test(ua)) os = "iOS";
    else if (/Linux/.test(ua)) os = "Linux";

    if (/Edg\//.test(ua)) navegador = "Edge";
    else if (/OPR\//.test(ua)) navegador = "Opera";
    else if (/Chrome\//.test(ua)) navegador = "Chrome";
    else if (/Firefox\//.test(ua)) navegador = "Firefox";
    else if (/Safari\//.test(ua)) navegador = "Safari";

    if (/Mobi|Android|iPhone|iPad/.test(ua)) dispositivo = "Mobile";

    return { os, navegador, dispositivo };
  }

  function capturarLead(): void {
    const { os, navegador, dispositivo } = parseUserAgent();
    const utms = getUTMs();

    const payload: LeadPayload = {
      timestamp: new Date().toISOString(),
      pagina: window.location.href,
      dispositivo,
      os,
      navegador,
      resolucion: `${screen.width}x${screen.height}`,
      idioma: navigator.language ?? "",
      tipo: dispositivo,
      ...utms,
    };

    const body = JSON.stringify(payload);
    const blob = new Blob([body], { type: "application/json" });
    const sentByBeacon = navigator.sendBeacon(APPS_SCRIPT_URL, blob);

    if (!sentByBeacon) {
      fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  }

  function init(): void {
    const selector =
      'a[href*="wa.me"], a[href*="api.whatsapp.com"], a[href*="whatsapp.com"], a[href*="wa.link"]';

    document.querySelectorAll<HTMLAnchorElement>(selector).forEach((btn) => {
      if (btn.dataset.leadTracked) return;
      btn.dataset.leadTracked = "1";
      btn.addEventListener("click", capturarLead, { passive: true });
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll<HTMLAnchorElement>(selector).forEach((btn) => {
        if (btn.dataset.leadTracked) return;
        btn.dataset.leadTracked = "1";
        btn.addEventListener("click", capturarLead, { passive: true });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
