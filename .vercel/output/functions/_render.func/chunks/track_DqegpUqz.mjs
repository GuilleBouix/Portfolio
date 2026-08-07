import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
//#region src/pages/api/track.ts
var track_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	let data;
	if ((request.headers.get("content-type") ?? "").includes("application/json")) data = await request.json();
	else {
		const rawBody = await request.text();
		try {
			data = JSON.parse(rawBody);
		} catch {
			return new Response(JSON.stringify({
				ok: false,
				error: "Body must be valid JSON"
			}), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}
	}
	await fetch("https://script.google.com/macros/s/AKfycbwwQYjhrF2Ydx8-McQn_4oS4BFFmVUUEi6WrnvhcEd5zmttgHX-6i_9jaRZh02Maqo6/exec", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	});
	return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/track@_@ts
var page = () => track_exports;
//#endregion
export { page };
