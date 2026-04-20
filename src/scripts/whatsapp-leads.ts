(function () {
  const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwwQYjhrF2Ydx8-McQn_4oS4BFFmVUUEi6WrnvhcEd5zmttgHX-6i_9jaRZh02Maqo6/exec";

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

  interface GeoInfo {
    ip: string;
    pais: string;
    ciudad: string;
  }

  interface LeadPayload extends UTMs, UAInfo, GeoInfo {
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

  async function getGeoIP(): Promise<GeoInfo> {
    try {
      const res = await fetch(
        "https://ip-api.com/json/?fields=status,country,city,query",
      );
      const geo = await res.json();
      if (geo.status === "success") {
        return { ip: geo.query, pais: geo.country, ciudad: geo.city };
      }
    } catch (_) {}
    return { ip: "", pais: "", ciudad: "" };
  }

  async function capturarLead(): Promise<void> {
    const { os, navegador, dispositivo } = parseUserAgent();
    const utms = getUTMs();
    const geo = await getGeoIP();

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
      ...geo,
    };

    const blob = new Blob([JSON.stringify(payload)], {
      type: "application/json",
    });
    navigator.sendBeacon(APPS_SCRIPT_URL, blob);
  }

  function init(): void {
    const selector = 'a[href*="wa.me"], a[href*="api.whatsapp.com"]';

    document.querySelectorAll<HTMLAnchorElement>(selector).forEach((btn) => {
      btn.addEventListener("click", () => {
        capturarLead();
      });
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll<HTMLAnchorElement>(selector).forEach((btn) => {
        if (!btn.dataset.leadTracked) {
          btn.dataset.leadTracked = "1";
          btn.addEventListener("click", () => {
            capturarLead();
          });
        }
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
