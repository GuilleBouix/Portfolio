import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Dk3mbiKQ.mjs';
import { manifest } from './manifest_BDGy1paj.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/track.astro.mjs');
const _page3 = () => import('./pages/privacy-policy.astro.mjs');
const _page4 = () => import('./pages/projects/beardcut.astro.mjs');
const _page5 = () => import('./pages/projects/finence.astro.mjs');
const _page6 = () => import('./pages/projects/last-dying-website.astro.mjs');
const _page7 = () => import('./pages/projects/sistema-gca.astro.mjs');
const _page8 = () => import('./pages/projects/textly-chat.astro.mjs');
const _page9 = () => import('./pages/projects/training-plus.astro.mjs');
const _page10 = () => import('./pages/projects/yagua-image-processor.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.18.0_@types+node@24_3b52b3ba704d73f6e7bb042682cb4494/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/track.ts", _page2],
    ["src/pages/privacy-policy.astro", _page3],
    ["src/pages/projects/beardcut.astro", _page4],
    ["src/pages/projects/finence.astro", _page5],
    ["src/pages/projects/last-dying-website.astro", _page6],
    ["src/pages/projects/sistema-gca.astro", _page7],
    ["src/pages/projects/textly-chat.astro", _page8],
    ["src/pages/projects/training-plus.astro", _page9],
    ["src/pages/projects/yagua-image-processor.astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "abd41b6b-74c3-423c-a8f6-555afd207f47",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
