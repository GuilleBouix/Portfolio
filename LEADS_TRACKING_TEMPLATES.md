# Plantilla Universal: Tracking de Leads a Google Sheets (Apps Script)

Usa esta base en cualquier stack:
1. Frontend captura el evento y manda `POST` a `/api/track`.
2. Tu backend valida y reenvia al Web App de Apps Script.
3. Apps Script guarda en Google Sheets.

---

## 1) Frontend Universal (Vanilla JS)

```html
<script>
  (function () {
    const TRACK_URL = "/api/track";

    function getUTMs() {
      const params = new URLSearchParams(window.location.search);
      return {
        utm_source: params.get("utm_source") || "",
        utm_medium: params.get("utm_medium") || "",
        utm_campaign: params.get("utm_campaign") || "",
        utm_term: params.get("utm_term") || "",
        utm_content: params.get("utm_content") || "",
      };
    }

    function parseUA() {
      const ua = navigator.userAgent;
      let os = "Desconocido";
      let browser = "Desconocido";
      let device = /Mobi|Android|iPhone|iPad/i.test(ua) ? "Mobile" : "Desktop";

      if (/Windows/i.test(ua)) os = "Windows";
      else if (/Mac OS/i.test(ua)) os = "macOS";
      else if (/Android/i.test(ua)) os = "Android";
      else if (/iPhone|iPad/i.test(ua)) os = "iOS";
      else if (/Linux/i.test(ua)) os = "Linux";

      if (/Edg\//i.test(ua)) browser = "Edge";
      else if (/OPR\//i.test(ua)) browser = "Opera";
      else if (/Chrome\//i.test(ua)) browser = "Chrome";
      else if (/Firefox\//i.test(ua)) browser = "Firefox";
      else if (/Safari\//i.test(ua)) browser = "Safari";

      return { os, browser, device };
    }

    function makePayload() {
      const ua = parseUA();
      return {
        timestamp: new Date().toISOString(),
        pagina: window.location.href,
        resolucion: screen.width + "x" + screen.height,
        idioma: navigator.language || "",
        tipo: ua.device,
        os: ua.os,
        navegador: ua.browser,
        ...getUTMs(),
      };
    }

    function sendLead() {
      const payload = makePayload();
      const blob = new Blob([JSON.stringify(payload)], { type: "text/plain" });
      navigator.sendBeacon(TRACK_URL, blob);
    }

    document.querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp.com"]').forEach((btn) => {
      btn.addEventListener("click", sendLead);
    });
  })();
</script>
```

---

## 2) Endpoint Base (Node/Serverless)

Este patron sirve para Astro API routes, Next API routes, Vercel functions, Netlify functions, etc.

```ts
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const scriptUrl = process.env.APPS_SCRIPT_WEBAPP_URL!;
    const r = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      return res.status(502).json({ ok: false, error: "Apps Script error" });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid body" });
  }
}
```

---

## 3) WordPress (Plugin simple)

### 3.1 JS en frontend

```php
// functions.php o plugin
add_action('wp_enqueue_scripts', function () {
  wp_enqueue_script('lead-tracker', get_template_directory_uri() . '/js/lead-tracker.js', [], null, true);
  wp_localize_script('lead-tracker', 'LeadTrack', [
    'endpoint' => rest_url('leadtrack/v1/track'),
    'nonce' => wp_create_nonce('wp_rest'),
  ]);
});
```

```js
// /js/lead-tracker.js
(function () {
  function sendLead(payload) {
    fetch(LeadTrack.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": LeadTrack.nonce,
      },
      body: JSON.stringify(payload),
    });
  }
})();
```

### 3.2 Endpoint REST en WP

```php
add_action('rest_api_init', function () {
  register_rest_route('leadtrack/v1', '/track', [
    'methods' => 'POST',
    'callback' => function (WP_REST_Request $request) {
      $script_url = getenv('APPS_SCRIPT_WEBAPP_URL');
      $body = $request->get_json_params();

      $response = wp_remote_post($script_url, [
        'headers' => ['Content-Type' => 'application/json'],
        'body' => wp_json_encode($body),
        'timeout' => 10
      ]);

      if (is_wp_error($response)) {
        return new WP_REST_Response(['ok' => false], 502);
      }

      return new WP_REST_Response(['ok' => true], 200);
    },
    'permission_callback' => '__return_true',
  ]);
});
```

---

## 4) PHP Puro

`track.php`

```php
<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
  exit;
}

$scriptUrl = getenv('APPS_SCRIPT_WEBAPP_URL');

$ch = curl_init($scriptUrl);
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
  CURLOPT_POSTFIELDS => json_encode($data),
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 10,
]);

$resp = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode < 200 || $httpCode >= 300) {
  http_response_code(502);
  echo json_encode(['ok' => false, 'error' => 'Apps Script error']);
  exit;
}

echo json_encode(['ok' => true]);
```

Frontend apunta a:

```js
fetch("/track.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
```

---

## 5) Next.js

### App Router (`app/api/track/route.ts`)

```ts
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const scriptUrl = process.env.APPS_SCRIPT_WEBAPP_URL!;

    const r = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!r.ok) {
      return Response.json({ ok: false, error: "Apps Script error" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
}
```

---

## 6) Astro

`src/pages/api/track.ts`

```ts
export const prerender = false;

export const POST = async ({ request }: { request: Request }) => {
  let data: unknown;
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    data = await request.json();
  } else {
    const raw = await request.text();
    data = JSON.parse(raw);
  }

  const scriptUrl = import.meta.env.APPS_SCRIPT_WEBAPP_URL;
  const r = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!r.ok) {
    return new Response(JSON.stringify({ ok: false }), { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
```

Y en `astro.config.mjs`:

```js
import vercel from "@astrojs/vercel";
export default defineConfig({
  adapter: vercel(),
  output: "static",
});
```

---

## 7) Apps Script (doPost)

```js
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById("TU_SHEET_ID").getSheetByName("Leads");
    var data = JSON.parse(e.postData.contents || "{}");

    sheet.appendRow([
      new Date(),
      data.timestamp || "",
      data.pagina || "",
      data.tipo || "",
      data.os || "",
      data.navegador || "",
      data.idioma || "",
      data.resolucion || "",
      data.utm_source || "",
      data.utm_medium || "",
      data.utm_campaign || "",
      data.utm_term || "",
      data.utm_content || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## 8) Checklist Rapido

- Usa variable de entorno `APPS_SCRIPT_WEBAPP_URL`.
- No expongas URL de Apps Script en frontend.
- Valida `POST` y JSON.
- Responde siempre JSON en tu endpoint.
- Agrega rate limit y captcha si recibes spam.

