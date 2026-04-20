export const POST = async ({ request }: { request: Request }) => {
  const data = await request.json();

  await fetch(
    "https://script.google.com/macros/s/AKfycbwwQYjhrF2Ydx8-McQn_4oS4BFFmVUUEi6WrnvhcEd5zmttgHX-6i_9jaRZh02Maqo6/exec",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
