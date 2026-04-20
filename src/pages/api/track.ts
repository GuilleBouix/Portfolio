export const prerender = false;

export const POST = async ({ request }: { request: Request }) => {
  let data: unknown;

  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    data = await request.json();
  } else {
    const rawBody = await request.text();
    try {
      data = JSON.parse(rawBody);
    } catch {
      return new Response(
        JSON.stringify({ ok: false, error: "Body must be valid JSON" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  }

  await fetch(
    "https://script.google.com/macros/s/AKfycbwwQYjhrF2Ydx8-McQn_4oS4BFFmVUUEi6WrnvhcEd5zmttgHX-6i_9jaRZh02Maqo6/exec",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
