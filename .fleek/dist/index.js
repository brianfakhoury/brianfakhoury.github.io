// .vercel/output/static/_worker.js/index.js
import { AsyncLocalStorage } from "node:async_hooks";
var sharedGlobalProperties = /* @__PURE__ */ new Set([
  "_nextOriginalFetch",
  "fetch",
  "__incrementalCache"
]);
function getProxyFor(route) {
  const existingProxy = globalThis.__nextOnPagesRoutesIsolation._map.get(route);
  if (existingProxy) {
    return existingProxy;
  }
  const newProxy = createNewRouteProxy();
  globalThis.__nextOnPagesRoutesIsolation._map.set(route, newProxy);
  return newProxy;
}
function createNewRouteProxy() {
  const overrides = /* @__PURE__ */ new Map();
  return new Proxy(globalThis, {
    get: (_, property) => {
      if (overrides.has(property)) {
        return overrides.get(property);
      }
      return Reflect.get(globalThis, property);
    },
    set: (_, property, value) => {
      if (sharedGlobalProperties.has(property)) {
        return Reflect.set(globalThis, property, value);
      }
      overrides.set(property, value);
      return true;
    }
  });
}
globalThis.__nextOnPagesRoutesIsolation ??= {
  _map: /* @__PURE__ */ new Map(),
  getProxyFor
};
var originalFetch = globalThis.fetch;
function setRequestUserAgentIfNeeded(request) {
  if (!request.headers.has("user-agent")) {
    request.headers.set(`user-agent`, `Next.js Middleware`);
  }
}
var patchFlagSymbol = Symbol.for("next-on-pages fetch patch");
async function handleInlineAssetRequest(request) {
  if (request.url.startsWith("blob:")) {
    try {
      const url = new URL(request.url);
      const pathname = url.pathname;
      const noExt = pathname.replace(/.html$/, "");
      const withExt = `${noExt.replace(/^\/$/, "/index")}.html`;
      const builtUrl = `https://${process.env.ASSETS_CID}.ipfs.flk-ipfs.xyz/_worker.js/__next-on-fleek-dist__/assets/${pathname}`;
      const response = await fetch(
        builtUrl
      );
      return Promise.resolve(response);
    } catch (error) {
      console.log("Failed to fetch from IPFS");
      console.error(error);
    }
  }
  return null;
}
globalThis.fetch = async (...args) => {
  const request = new Request(...args);
  const response = await handleInlineAssetRequest(request);
  if (response) return response;
  setRequestUserAgentIfNeeded(request);
  return originalFetch(request);
};
globalThis.ASSETS = {
  fetch: async (req) => {
    try {
      let pathname;
      if (req instanceof URL) {
        pathname = new URL(req).pathname;
      } else {
        pathname = new URL(req.url).pathname;
      }
      let assetPath = pathname;
      if (!/\.[^.]+$/.test(assetPath)) {
        const noExt = pathname.replace(/.html$/, "");
        assetPath = `${noExt.replace(/\/$/, "/index")}.html`;
      }
      const response = await fetch(
        `https://${process.env.ASSETS_CID}.ipfs.flk-ipfs.xyz${assetPath}`
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
import("node:buffer").then(({ Buffer }) => {
  globalThis.Buffer = Buffer;
}).catch(() => null);
var define_BUILD_METADATA_default = { collectedLocales: [] };
var define_CONFIG_default = { version: 3, routes: { none: [{ src: "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$", headers: { Location: "/$1" }, status: 308, continue: true }, { src: "^/_next/__private/trace$", dest: "/404", status: 404, continue: true }, { src: "^/404/?$", status: 404, continue: true, missing: [{ type: "header", key: "x-prerender-revalidate" }] }, { src: "^/500$", status: 500, continue: true }, { src: "^/?$", has: [{ type: "header", key: "rsc" }], dest: "/index.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }, continue: true, override: true }, { src: "^/((?!.+\\.rsc).+?)(?:/)?$", has: [{ type: "header", key: "rsc" }], dest: "/$1.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }, continue: true, override: true }], filesystem: [{ src: "^/index(\\.action|\\.rsc)$", dest: "/", continue: true }, { src: "^/_next/data/(.*)$", dest: "/_next/data/$1", check: true }, { src: "^/\\.prefetch\\.rsc$", dest: "/__index.prefetch.rsc", check: true }, { src: "^/(.+)/\\.prefetch\\.rsc$", dest: "/$1.prefetch.rsc", check: true }, { src: "^/\\.rsc$", dest: "/index.rsc", check: true }, { src: "^/(.+)/\\.rsc$", dest: "/$1.rsc", check: true }], miss: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media)/.+$", status: 404, check: true, dest: "$0" }], rewrite: [{ src: "^/_next/data/(.*)$", dest: "/404", status: 404 }], resource: [{ src: "^/.*$", status: 404 }], hit: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media|yray\\-7w1aokbjRtlaYbY9)/.+$", headers: { "cache-control": "public,max-age=31536000,immutable" }, continue: true, important: true }, { src: "^/index(?:/)?$", headers: { "x-matched-path": "/" }, continue: true, important: true }, { src: "^/((?!index$).*?)(?:/)?$", headers: { "x-matched-path": "/$1" }, continue: true, important: true }], error: [{ src: "^/.*$", dest: "/404", status: 404 }, { src: "^/.*$", dest: "/500", status: 500 }] }, images: { domains: [], sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 16, 32, 48, 64, 96, 128, 256, 384], remotePatterns: [], minimumCacheTTL: 60, formats: ["image/avif", "image/webp"], dangerouslyAllowSVG: false, contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;", contentDispositionType: "inline" }, overrides: { "404.html": { path: "404", contentType: "text/html; charset=utf-8" }, "500.html": { path: "500", contentType: "text/html; charset=utf-8" }, "_app.rsc.json": { path: "_app.rsc", contentType: "application/json" }, "_error.rsc.json": { path: "_error.rsc", contentType: "application/json" }, "_document.rsc.json": { path: "_document.rsc", contentType: "application/json" }, "404.rsc.json": { path: "404.rsc", contentType: "application/json" } }, framework: { version: "14.2.15" }, crons: [] };
var __BUILD_OUTPUT__ = { "/404.html": {
  type: "override",
  path: "/404.html",
  headers: { "content-type": "text/html; charset=utf-8" }
}, "/404.rsc.json": {
  type: "override",
  path: "/404.rsc.json",
  headers: { "content-type": "application/json" }
}, "/500.html": {
  type: "override",
  path: "/500.html",
  headers: { "content-type": "text/html; charset=utf-8" }
}, "/_app.rsc.json": {
  type: "override",
  path: "/_app.rsc.json",
  headers: { "content-type": "application/json" }
}, "/_document.rsc.json": {
  type: "override",
  path: "/_document.rsc.json",
  headers: { "content-type": "application/json" }
}, "/_error.rsc.json": {
  type: "override",
  path: "/_error.rsc.json",
  headers: { "content-type": "application/json" }
}, "/_next/static/chunks/10066.5e52cbc5ed6dd599.js": { type: "static" }, "/_next/static/chunks/10128.5abad8ef63603e0d.js": { type: "static" }, "/_next/static/chunks/10138.28551a5ca6bed2a6.js": { type: "static" }, "/_next/static/chunks/10172.416877cedb45924f.js": { type: "static" }, "/_next/static/chunks/10176.21d8c2c74ee571df.js": { type: "static" }, "/_next/static/chunks/10209.b6666ecfc41f41b2.js": { type: "static" }, "/_next/static/chunks/10306.e18820f013a3667a.js": { type: "static" }, "/_next/static/chunks/10407.aead34b30588e5db.js": { type: "static" }, "/_next/static/chunks/10484.4b3da90b6d519cc8.js": { type: "static" }, "/_next/static/chunks/10506.8c78314e7c57d54f.js": { type: "static" }, "/_next/static/chunks/10570.adeb64cfa795545b.js": { type: "static" }, "/_next/static/chunks/1058.1f48dd8c2d6c0104.js": { type: "static" }, "/_next/static/chunks/10585.ff05fcd155e4713f.js": { type: "static" }, "/_next/static/chunks/10596.7dd93eac1b99e01b.js": { type: "static" }, "/_next/static/chunks/10820.467bc4530d4c589f.js": { type: "static" }, "/_next/static/chunks/10866.84aa69a7d6e78524.js": { type: "static" }, "/_next/static/chunks/10904.63fabdb3098a7336.js": { type: "static" }, "/_next/static/chunks/11055.da502316c5e5c910.js": { type: "static" }, "/_next/static/chunks/11126.a91ae5eb94384499.js": { type: "static" }, "/_next/static/chunks/11239.ab6bfb95cf9fcb14.js": { type: "static" }, "/_next/static/chunks/11299.2447978ad25ad827.js": { type: "static" }, "/_next/static/chunks/11340.6cdbd4091e2736ad.js": { type: "static" }, "/_next/static/chunks/11448.e94c109da4d03de0.js": { type: "static" }, "/_next/static/chunks/11590.8c75adde588fba24.js": { type: "static" }, "/_next/static/chunks/11760.a55bb3fcdcb83c06.js": { type: "static" }, "/_next/static/chunks/11784.fdf39081b1d77b44.js": { type: "static" }, "/_next/static/chunks/11939.4db6079f0c9e242f.js": { type: "static" }, "/_next/static/chunks/12115.444a452a391a34bf.js": { type: "static" }, "/_next/static/chunks/12194.2b044caad0e9da32.js": { type: "static" }, "/_next/static/chunks/12196.106ba6d6388d08e5.js": { type: "static" }, "/_next/static/chunks/12357.1788c5f265708d6f.js": { type: "static" }, "/_next/static/chunks/12371.dd46ef8a35436b28.js": { type: "static" }, "/_next/static/chunks/12414.8bf6731098fc75ce.js": { type: "static" }, "/_next/static/chunks/12527.aa215da996fb1eea.js": { type: "static" }, "/_next/static/chunks/12674.e10143039952ece8.js": { type: "static" }, "/_next/static/chunks/12708.18e17c9938911945.js": { type: "static" }, "/_next/static/chunks/12780.ab77b7e56e1f9b00.js": { type: "static" }, "/_next/static/chunks/12791.5715ff0834d19bb6.js": { type: "static" }, "/_next/static/chunks/12805.2d205cfc259c7774.js": { type: "static" }, "/_next/static/chunks/12843.130623e78c1fd5f6.js": { type: "static" }, "/_next/static/chunks/13030.6b0757d60eebce13.js": { type: "static" }, "/_next/static/chunks/13041.10a820603648cb02.js": { type: "static" }, "/_next/static/chunks/13298.b62b9aaefae6b229.js": { type: "static" }, "/_next/static/chunks/13345.567e1bd8436044c4.js": { type: "static" }, "/_next/static/chunks/1340.40fa2cea8ac90210.js": { type: "static" }, "/_next/static/chunks/13420.b63ab2a4a2f24ff9.js": { type: "static" }, "/_next/static/chunks/13507.8e8051a66a6ee24f.js": { type: "static" }, "/_next/static/chunks/1351.eeb9588d38b728c0.js": { type: "static" }, "/_next/static/chunks/1356.2d4e5273b525d8ea.js": { type: "static" }, "/_next/static/chunks/13720.0f299518fd5653c8.js": { type: "static" }, "/_next/static/chunks/13781.130cf80b0337a31f.js": { type: "static" }, "/_next/static/chunks/13837.c1417ba5fbd710e0.js": { type: "static" }, "/_next/static/chunks/13910.020cbee7b7f5b6d6.js": { type: "static" }, "/_next/static/chunks/1399.768608cfdaffd278.js": { type: "static" }, "/_next/static/chunks/14064.9da3744ef83341e5.js": { type: "static" }, "/_next/static/chunks/14168.bc4082d4f426ce5e.js": { type: "static" }, "/_next/static/chunks/14177.56d1476ffc70302d.js": { type: "static" }, "/_next/static/chunks/14220.8bf06860b03c6d11.js": { type: "static" }, "/_next/static/chunks/14461.03c517e31ff4a80d.js": { type: "static" }, "/_next/static/chunks/14463.0eb406819f26fbcd.js": { type: "static" }, "/_next/static/chunks/14571.046f9a7f904eb633.js": { type: "static" }, "/_next/static/chunks/14586.46f454f3719f0c35.js": { type: "static" }, "/_next/static/chunks/14760.1f3cca9033fb3967.js": { type: "static" }, "/_next/static/chunks/14789.75031c28c79bf45f.js": { type: "static" }, "/_next/static/chunks/14796.c9fcdd235cc765cb.js": { type: "static" }, "/_next/static/chunks/14822.3bf5b6c10f85b12e.js": { type: "static" }, "/_next/static/chunks/14923.52832dc9e61c3819.js": { type: "static" }, "/_next/static/chunks/14924.e13bbdf138100298.js": { type: "static" }, "/_next/static/chunks/14938.c9227f66bdab7ad0.js": { type: "static" }, "/_next/static/chunks/14970.7a1837ad0471a64c.js": { type: "static" }, "/_next/static/chunks/15001.71ee239f5ef2ba32.js": { type: "static" }, "/_next/static/chunks/15051.00f71288540fb218.js": { type: "static" }, "/_next/static/chunks/15145.54d060fdf783726d.js": { type: "static" }, "/_next/static/chunks/15161.d0b7d3e25bf4eff5.js": { type: "static" }, "/_next/static/chunks/15162.e5daf15f218e914b.js": { type: "static" }, "/_next/static/chunks/15169.3d8b10ba953fa187.js": { type: "static" }, "/_next/static/chunks/15326.d8b7d43220f1d8a0.js": { type: "static" }, "/_next/static/chunks/15454.fb675864fd4569bc.js": { type: "static" }, "/_next/static/chunks/15626.9c376fe88c404f3a.js": { type: "static" }, "/_next/static/chunks/15673.66449fe851f24620.js": { type: "static" }, "/_next/static/chunks/15720.6d942127c18eb113.js": { type: "static" }, "/_next/static/chunks/15787.547b4c6b13af73dd.js": { type: "static" }, "/_next/static/chunks/15868.2014fb46d8a911ea.js": { type: "static" }, "/_next/static/chunks/15898.f8601dd2ef7cd1bd.js": { type: "static" }, "/_next/static/chunks/15899.bde655f238aea424.js": { type: "static" }, "/_next/static/chunks/16026.f6ee7346dcd40553.js": { type: "static" }, "/_next/static/chunks/16066.1c3f2e41222a03a8.js": { type: "static" }, "/_next/static/chunks/16119.26e984142aa317e7.js": { type: "static" }, "/_next/static/chunks/16128.025ba4ebfdda30bf.js": { type: "static" }, "/_next/static/chunks/1616.e96b31971d31588f.js": { type: "static" }, "/_next/static/chunks/16167.c1ea9d04283f630d.js": { type: "static" }, "/_next/static/chunks/16184.a633594d094eb2c6.js": { type: "static" }, "/_next/static/chunks/16275.50eecae00ef4ea41.js": { type: "static" }, "/_next/static/chunks/16443.c6a80e18160bdb6d.js": { type: "static" }, "/_next/static/chunks/16466.f77341ccf96ed23c.js": { type: "static" }, "/_next/static/chunks/16524.fba3ab633894f890.js": { type: "static" }, "/_next/static/chunks/16657.4d61d982c152c8fc.js": { type: "static" }, "/_next/static/chunks/16798.358d24da25888d02.js": { type: "static" }, "/_next/static/chunks/16841.2616dd1849faac76.js": { type: "static" }, "/_next/static/chunks/16974.b27fa6e5be355e0a.js": { type: "static" }, "/_next/static/chunks/17003.41e0ec8435c1b307.js": { type: "static" }, "/_next/static/chunks/17162.c152473df3321c58.js": { type: "static" }, "/_next/static/chunks/17342.d38bc1b16c5d4db0.js": { type: "static" }, "/_next/static/chunks/1740.bb8954a6d413bbd8.js": { type: "static" }, "/_next/static/chunks/17437.9270c05a832e5a27.js": { type: "static" }, "/_next/static/chunks/17486.fb39c88fc6f63c0d.js": { type: "static" }, "/_next/static/chunks/17494.0ad77540954cc7c9.js": { type: "static" }, "/_next/static/chunks/17572.5eb74e38e6bbb8d8.js": { type: "static" }, "/_next/static/chunks/17580.6f63e1f8d38cb50f.js": { type: "static" }, "/_next/static/chunks/1759.d7b92f520f7ae2ca.js": { type: "static" }, "/_next/static/chunks/17625.73bb22e145a6b6f7.js": { type: "static" }, "/_next/static/chunks/17689.a3eb5584d9b3eee8.js": { type: "static" }, "/_next/static/chunks/1770.efadd91b8755d18e.js": { type: "static" }, "/_next/static/chunks/17711.a6b62c227d3a3416.js": { type: "static" }, "/_next/static/chunks/17718.8371ce7f6670dc8f.js": { type: "static" }, "/_next/static/chunks/17722.9eba8b8ff23c7c0d.js": { type: "static" }, "/_next/static/chunks/17881.b0051919dcb77c95.js": { type: "static" }, "/_next/static/chunks/18110.1cbd3667494dfefd.js": { type: "static" }, "/_next/static/chunks/18133.f9c0d4806b7e2d28.js": { type: "static" }, "/_next/static/chunks/18213.fac96cdbe53187a4.js": { type: "static" }, "/_next/static/chunks/18236.9c9695c5892c024f.js": { type: "static" }, "/_next/static/chunks/18342.d0a820c74da298d0.js": { type: "static" }, "/_next/static/chunks/18400.662868201235df81.js": { type: "static" }, "/_next/static/chunks/18405.3805be236813f0f4.js": { type: "static" }, "/_next/static/chunks/18429.ba70e592206c62ea.js": { type: "static" }, "/_next/static/chunks/18477.fa5da895098828c1.js": { type: "static" }, "/_next/static/chunks/18519.19b0db9792e256f6.js": { type: "static" }, "/_next/static/chunks/18537.791adb27360d21e0.js": { type: "static" }, "/_next/static/chunks/18584.a0c651720351533a.js": { type: "static" }, "/_next/static/chunks/18678.dbdf347bda7d671c.js": { type: "static" }, "/_next/static/chunks/18778.241386649a6d1a52.js": { type: "static" }, "/_next/static/chunks/18930.0b3b20291d080e79.js": { type: "static" }, "/_next/static/chunks/18950.e131f44a6f1b4707.js": { type: "static" }, "/_next/static/chunks/19037.e39be658aa3bb816.js": { type: "static" }, "/_next/static/chunks/19056.f762821810eeed33.js": { type: "static" }, "/_next/static/chunks/19209.3ebbd3e84156a681.js": { type: "static" }, "/_next/static/chunks/19338.90b320f112b05b1f.js": { type: "static" }, "/_next/static/chunks/19596.0a64ccc80529ab6f.js": { type: "static" }, "/_next/static/chunks/19651.d1a4ae95e7bb21c9.js": { type: "static" }, "/_next/static/chunks/19680.18340a797c425145.js": { type: "static" }, "/_next/static/chunks/19686.f5b61cea37b0ce8b.js": { type: "static" }, "/_next/static/chunks/19725.379afc22de6fefc7.js": { type: "static" }, "/_next/static/chunks/19833.197eae0b9a2e0b0c.js": { type: "static" }, "/_next/static/chunks/19935.ce5dd3f4b0d92a44.js": { type: "static" }, "/_next/static/chunks/19953.6584e4e63a5cb8f5.js": { type: "static" }, "/_next/static/chunks/20026.785e4881fca5a580.js": { type: "static" }, "/_next/static/chunks/20218.64b300758f91367f.js": { type: "static" }, "/_next/static/chunks/20265.454285eb5175bad5.js": { type: "static" }, "/_next/static/chunks/20395.2e00fa9c5e20f3a9.js": { type: "static" }, "/_next/static/chunks/20464.08b18dd72fda92df.js": { type: "static" }, "/_next/static/chunks/20465.31d816aa702cad37.js": { type: "static" }, "/_next/static/chunks/20698.c386e3ac7db1ab79.js": { type: "static" }, "/_next/static/chunks/20740.10d21660a8002e70.js": { type: "static" }, "/_next/static/chunks/20748.5cf2f4dc1ec29871.js": { type: "static" }, "/_next/static/chunks/20773.308f193c8168b127.js": { type: "static" }, "/_next/static/chunks/20783.7c21d666b5d03305.js": { type: "static" }, "/_next/static/chunks/20859.6167511d166d0eb7.js": { type: "static" }, "/_next/static/chunks/20893.e011edaf47063d82.js": { type: "static" }, "/_next/static/chunks/2099.d188f80c15d12a50.js": { type: "static" }, "/_next/static/chunks/21047.629911ad6a497df1.js": { type: "static" }, "/_next/static/chunks/21052.3adb83efbac5f8f9.js": { type: "static" }, "/_next/static/chunks/21200.adf32dd4cf7cdfd9.js": { type: "static" }, "/_next/static/chunks/21219.dc368435b18b2f54.js": { type: "static" }, "/_next/static/chunks/21563.b82ad073fc6a1672.js": { type: "static" }, "/_next/static/chunks/21824.0c230bca8697f205.js": { type: "static" }, "/_next/static/chunks/22047.e27bdf116fd71aef.js": { type: "static" }, "/_next/static/chunks/2207.e2d7b4d97a262a1f.js": { type: "static" }, "/_next/static/chunks/22106.26e8d833144d3ae5.js": { type: "static" }, "/_next/static/chunks/22135.806d835c6dc5ff4f.js": { type: "static" }, "/_next/static/chunks/22238.17e5960fd28a9d18.js": { type: "static" }, "/_next/static/chunks/22300.92509b0415cf03de.js": { type: "static" }, "/_next/static/chunks/22481.c08c3c73c8cac108.js": { type: "static" }, "/_next/static/chunks/22510.89ae214db6e7fe88.js": { type: "static" }, "/_next/static/chunks/22538.dd0e2571ac01dc70.js": { type: "static" }, "/_next/static/chunks/22568.d12fcf5a8b9e5f38.js": { type: "static" }, "/_next/static/chunks/22575.a07d213b1396bbbd.js": { type: "static" }, "/_next/static/chunks/22624.4fb47021aa7f9b50.js": { type: "static" }, "/_next/static/chunks/22636.271ac7a841764c3b.js": { type: "static" }, "/_next/static/chunks/22676.d246d7a6c362cbe6.js": { type: "static" }, "/_next/static/chunks/22700.f38ef6e678cf051b.js": { type: "static" }, "/_next/static/chunks/22716.3ced548f9b6ddbb9.js": { type: "static" }, "/_next/static/chunks/22762.02bbc58c59ce0499.js": { type: "static" }, "/_next/static/chunks/2277.d6f9ee95fc26b20b.js": { type: "static" }, "/_next/static/chunks/22839.b3752882111e672c.js": { type: "static" }, "/_next/static/chunks/22857.7e2f5ad672d9b639.js": { type: "static" }, "/_next/static/chunks/22975.17879cf11a0b49bc.js": { type: "static" }, "/_next/static/chunks/22989.20ee9d84f83432b7.js": { type: "static" }, "/_next/static/chunks/23107.7c0f434b6cc314ca.js": { type: "static" }, "/_next/static/chunks/23136.344fcd6c22df9846.js": { type: "static" }, "/_next/static/chunks/23206.347a7a3d24856d33.js": { type: "static" }, "/_next/static/chunks/23216.44a6de716a479831.js": { type: "static" }, "/_next/static/chunks/23231.e5c762997c71d68f.js": { type: "static" }, "/_next/static/chunks/23392.6b3ff227142e04cd.js": { type: "static" }, "/_next/static/chunks/23400.5d4d05120f9d596b.js": { type: "static" }, "/_next/static/chunks/23486.068e53f194ec07b3.js": { type: "static" }, "/_next/static/chunks/2358.c376c92c553c5ed4.js": { type: "static" }, "/_next/static/chunks/23628.caa3ff28d05ca92c.js": { type: "static" }, "/_next/static/chunks/23759.b1f52df6ebd10572.js": { type: "static" }, "/_next/static/chunks/23787.2bc8614a045572c6.js": { type: "static" }, "/_next/static/chunks/23815.6f24767f0d5badcf.js": { type: "static" }, "/_next/static/chunks/23850.3f1a4af700d1ccd5.js": { type: "static" }, "/_next/static/chunks/23917.9721edea145ff954.js": { type: "static" }, "/_next/static/chunks/23927.a0146a12513e34a7.js": { type: "static" }, "/_next/static/chunks/23959.00ba63f6f7988f77.js": { type: "static" }, "/_next/static/chunks/24132.71f042dce78d1854.js": { type: "static" }, "/_next/static/chunks/24156.cc47d7ff7ba2ae3e.js": { type: "static" }, "/_next/static/chunks/2421.2d83ac47f99ce2ba.js": { type: "static" }, "/_next/static/chunks/24246.37939575eaf65b2d.js": { type: "static" }, "/_next/static/chunks/24336.e63979d2ea7904db.js": { type: "static" }, "/_next/static/chunks/24581.1395ffb35b45ae6c.js": { type: "static" }, "/_next/static/chunks/24622.1bdc84249f968ac5.js": { type: "static" }, "/_next/static/chunks/247.e0364f21aa0c7e0c.js": { type: "static" }, "/_next/static/chunks/24786.8d91f000830b5625.js": { type: "static" }, "/_next/static/chunks/2499.fbc210696de69293.js": { type: "static" }, "/_next/static/chunks/25028.74eafdace58808cd.js": { type: "static" }, "/_next/static/chunks/25035.6b56727266cf2229.js": { type: "static" }, "/_next/static/chunks/25051.9e515a57026d5489.js": { type: "static" }, "/_next/static/chunks/25083.c11e7b5013a17c47.js": { type: "static" }, "/_next/static/chunks/2521.3e6f680952e61676.js": { type: "static" }, "/_next/static/chunks/253.7ca4c59acc9fe457.js": { type: "static" }, "/_next/static/chunks/25330.320b92c86c60eb75.js": { type: "static" }, "/_next/static/chunks/25413.96e36d5db1e0e412.js": { type: "static" }, "/_next/static/chunks/25440.f61dea774f6efe53.js": { type: "static" }, "/_next/static/chunks/25466.76aad8e3d793fa31.js": { type: "static" }, "/_next/static/chunks/2551.a258ae393b73e404.js": { type: "static" }, "/_next/static/chunks/25792.b42b8ffd6c99ad43.js": { type: "static" }, "/_next/static/chunks/25811.4a25091a10e2ddbc.js": { type: "static" }, "/_next/static/chunks/25846.7e18cbe0110e4e72.js": { type: "static" }, "/_next/static/chunks/25887.2c47d00c43268d5a.js": { type: "static" }, "/_next/static/chunks/26034.84d0f08c73e02b29.js": { type: "static" }, "/_next/static/chunks/26035.3df387dc2ca45ba4.js": { type: "static" }, "/_next/static/chunks/26148.1264972c8268016c.js": { type: "static" }, "/_next/static/chunks/26198.525105dd6f317491.js": { type: "static" }, "/_next/static/chunks/26208.f22cb22f3416d1df.js": { type: "static" }, "/_next/static/chunks/26312.d387aa8d52e2e20b.js": { type: "static" }, "/_next/static/chunks/26327.3cdff07ec603ed46.js": { type: "static" }, "/_next/static/chunks/26363.7ad036662ab84525.js": { type: "static" }, "/_next/static/chunks/26458.a70afa9c65f4722b.js": { type: "static" }, "/_next/static/chunks/26463.aeb37cfd4c46b4a5.js": { type: "static" }, "/_next/static/chunks/26534.478073fc23f8b586.js": { type: "static" }, "/_next/static/chunks/2655.9e91e03acf8fa7c2.js": { type: "static" }, "/_next/static/chunks/26610.0dbdfb74111b10d6.js": { type: "static" }, "/_next/static/chunks/26730.b2e2751461305e8d.js": { type: "static" }, "/_next/static/chunks/26748.7c19ebf342eea31f.js": { type: "static" }, "/_next/static/chunks/26841.9460c7db25887998.js": { type: "static" }, "/_next/static/chunks/26852.afcc4778f17954fc.js": { type: "static" }, "/_next/static/chunks/26899.a8ffeb1782cba1cb.js": { type: "static" }, "/_next/static/chunks/2692.15058b4f9e4e0396.js": { type: "static" }, "/_next/static/chunks/26937.c1447de6112e094d.js": { type: "static" }, "/_next/static/chunks/27246.13dcad01bf10b67b.js": { type: "static" }, "/_next/static/chunks/27280.337b7248372c1c6b.js": { type: "static" }, "/_next/static/chunks/27413.55c4fc35657bc9cd.js": { type: "static" }, "/_next/static/chunks/27693.c2218868b6ec8fee.js": { type: "static" }, "/_next/static/chunks/27721.3843fa0f942b92cb.js": { type: "static" }, "/_next/static/chunks/27744.7a563bf257a477b3.js": { type: "static" }, "/_next/static/chunks/27863.4873fce0810f61a6.js": { type: "static" }, "/_next/static/chunks/2787.a5163a490a2c82b3.js": { type: "static" }, "/_next/static/chunks/27880.7b2d07903568a5a0.js": { type: "static" }, "/_next/static/chunks/27995.a8151a6631a90062.js": { type: "static" }, "/_next/static/chunks/28124.06fa3f88bc9fddc6.js": { type: "static" }, "/_next/static/chunks/2822.44034a29010b3085.js": { type: "static" }, "/_next/static/chunks/28380.c382ade50d2f2d00.js": { type: "static" }, "/_next/static/chunks/28494.50d6031ae1d008a5.js": { type: "static" }, "/_next/static/chunks/28495.854a7d6bebfe5747.js": { type: "static" }, "/_next/static/chunks/28553.028a7537f93bdf0f.js": { type: "static" }, "/_next/static/chunks/28574.7cdde3a2ee0c4a97.js": { type: "static" }, "/_next/static/chunks/28610.3113f425196ab5d1.js": { type: "static" }, "/_next/static/chunks/2864.7dee24aebe68dcc6.js": { type: "static" }, "/_next/static/chunks/28645.2c3c23ebed99361a.js": { type: "static" }, "/_next/static/chunks/28676.cfcb74d64886b72f.js": { type: "static" }, "/_next/static/chunks/28679.00f04b784b8c921e.js": { type: "static" }, "/_next/static/chunks/28768.ce6b5c09364658bc.js": { type: "static" }, "/_next/static/chunks/28842.9022791c270a66cd.js": { type: "static" }, "/_next/static/chunks/28870.4e79d8ac13d243d6.js": { type: "static" }, "/_next/static/chunks/28921.5abfa05932a88731.js": { type: "static" }, "/_next/static/chunks/28940.9496d0095c172be8.js": { type: "static" }, "/_next/static/chunks/28950.8d9009dbdcc91e31.js": { type: "static" }, "/_next/static/chunks/29057.d2613c9bc89f6ea7.js": { type: "static" }, "/_next/static/chunks/29090.950e148d32bc4aa4.js": { type: "static" }, "/_next/static/chunks/29202.bd014d83733da2e5.js": { type: "static" }, "/_next/static/chunks/29219.8e4fb301f06f0044.js": { type: "static" }, "/_next/static/chunks/2926.d7e698824f782cde.js": { type: "static" }, "/_next/static/chunks/29349.6b9885402c50f9f3.js": { type: "static" }, "/_next/static/chunks/29374.a2c24272031065ba.js": { type: "static" }, "/_next/static/chunks/29525.242f76af138cba15.js": { type: "static" }, "/_next/static/chunks/2961.ec82a81bffa0a164.js": { type: "static" }, "/_next/static/chunks/29633.b4ac44ce9c712056.js": { type: "static" }, "/_next/static/chunks/29659.e598a626010b74b3.js": { type: "static" }, "/_next/static/chunks/29735.8a646e04cf049874.js": { type: "static" }, "/_next/static/chunks/29747.d4580bb9544e32fa.js": { type: "static" }, "/_next/static/chunks/29788.57211f6c08fec361.js": { type: "static" }, "/_next/static/chunks/29793.296da60cba8b9fee.js": { type: "static" }, "/_next/static/chunks/29852.06542358bb94f2b4.js": { type: "static" }, "/_next/static/chunks/29857.1694ebf2ccc5d2ff.js": { type: "static" }, "/_next/static/chunks/2988.bfa297bc2220dc68.js": { type: "static" }, "/_next/static/chunks/29899.ffd47e695653b423.js": { type: "static" }, "/_next/static/chunks/29945.c2e48ba5f280fcbc.js": { type: "static" }, "/_next/static/chunks/29985.69571e1280e64901.js": { type: "static" }, "/_next/static/chunks/30044.9b394cab77f3e9ba.js": { type: "static" }, "/_next/static/chunks/30066.995b7894e8c2d9c7.js": { type: "static" }, "/_next/static/chunks/30185.23bea117531e8c06.js": { type: "static" }, "/_next/static/chunks/30351.4c05bb4820065084.js": { type: "static" }, "/_next/static/chunks/30401.3df9db9440c07ee3.js": { type: "static" }, "/_next/static/chunks/30421.5fec3f9acd6b25a9.js": { type: "static" }, "/_next/static/chunks/305.ba09d282702e168f.js": { type: "static" }, "/_next/static/chunks/30509.22a1764c1786f4e5.js": { type: "static" }, "/_next/static/chunks/30623.a33c39bdba790b9c.js": { type: "static" }, "/_next/static/chunks/30694.6b0aee09de0cb9b5.js": { type: "static" }, "/_next/static/chunks/30755.071d74f9c328c8d3.js": { type: "static" }, "/_next/static/chunks/3085.d51878ea75c09f59.js": { type: "static" }, "/_next/static/chunks/31006.6d7f13da18b7e594.js": { type: "static" }, "/_next/static/chunks/31041.7ff00fe126a08f7b.js": { type: "static" }, "/_next/static/chunks/31047.da94e3d0cef77dc2.js": { type: "static" }, "/_next/static/chunks/31062.303778a993f03b8f.js": { type: "static" }, "/_next/static/chunks/31310.dc014c452adfd28b.js": { type: "static" }, "/_next/static/chunks/31349.4722c7ada2462def.js": { type: "static" }, "/_next/static/chunks/3137.e74087931766abc0.js": { type: "static" }, "/_next/static/chunks/31477.7b62215213f8994c.js": { type: "static" }, "/_next/static/chunks/31734.72fe4a537936e521.js": { type: "static" }, "/_next/static/chunks/31810.81e8e79445e15c97.js": { type: "static" }, "/_next/static/chunks/31862.bdad3bcce802ba1f.js": { type: "static" }, "/_next/static/chunks/31949.24cd1cf1903821c8.js": { type: "static" }, "/_next/static/chunks/32050.e74c9b38dfba6524.js": { type: "static" }, "/_next/static/chunks/32062.39dcc8bb61f01e98.js": { type: "static" }, "/_next/static/chunks/32096.2244b897337a7d52.js": { type: "static" }, "/_next/static/chunks/32101.341e8f008748b29b.js": { type: "static" }, "/_next/static/chunks/32115.f61e164eef5dfd3f.js": { type: "static" }, "/_next/static/chunks/32150.3dbee86b2494c11a.js": { type: "static" }, "/_next/static/chunks/32151.64ea52cbaa42a08a.js": { type: "static" }, "/_next/static/chunks/32184.b6396d455745db49.js": { type: "static" }, "/_next/static/chunks/32278.549646d24e6b7e8d.js": { type: "static" }, "/_next/static/chunks/32364.87dcc9030c7bcd2d.js": { type: "static" }, "/_next/static/chunks/32368.921569888114dac0.js": { type: "static" }, "/_next/static/chunks/32456.2f0a8b2053c35c98.js": { type: "static" }, "/_next/static/chunks/32489.7e95be25768c81d1.js": { type: "static" }, "/_next/static/chunks/32506.232b0faf63cc2dbb.js": { type: "static" }, "/_next/static/chunks/32526.8a2d5083bb7893b4.js": { type: "static" }, "/_next/static/chunks/32561.e721a448a2dd520f.js": { type: "static" }, "/_next/static/chunks/32601.98c99aff67f8968c.js": { type: "static" }, "/_next/static/chunks/32656.195a569d2ef06bb6.js": { type: "static" }, "/_next/static/chunks/32660.5fa4551b45473030.js": { type: "static" }, "/_next/static/chunks/32790.26a4529533b2871f.js": { type: "static" }, "/_next/static/chunks/32795.ca782aa47d98281a.js": { type: "static" }, "/_next/static/chunks/32819.101bbce2990d597b.js": { type: "static" }, "/_next/static/chunks/32866.4b7b0b623642b1f0.js": { type: "static" }, "/_next/static/chunks/3289.0f4738480c493b64.js": { type: "static" }, "/_next/static/chunks/32979.f1120bf62d00ec95.js": { type: "static" }, "/_next/static/chunks/33003.e5e6ad796456fa53.js": { type: "static" }, "/_next/static/chunks/33073.c7856e2879082b6c.js": { type: "static" }, "/_next/static/chunks/33117.06ebbda135a6f3d8.js": { type: "static" }, "/_next/static/chunks/33183.1f894e0fa63c3f81.js": { type: "static" }, "/_next/static/chunks/33210.7e2a184ee58e56fb.js": { type: "static" }, "/_next/static/chunks/33245.b556b6ad68d9e1af.js": { type: "static" }, "/_next/static/chunks/33276.b92f7d52512e8c54.js": { type: "static" }, "/_next/static/chunks/33327.807e7692145fbd21.js": { type: "static" }, "/_next/static/chunks/33388.65c40e69d5ebeb12.js": { type: "static" }, "/_next/static/chunks/33433.0040312991db4f1c.js": { type: "static" }, "/_next/static/chunks/33674.1d88fb72f6834981.js": { type: "static" }, "/_next/static/chunks/33741.38bb1d71641d5d95.js": { type: "static" }, "/_next/static/chunks/33747.870ea3a01401268f.js": { type: "static" }, "/_next/static/chunks/33867.dc7b655537ed0c84.js": { type: "static" }, "/_next/static/chunks/33899.12fd69c04a1e9385.js": { type: "static" }, "/_next/static/chunks/33920.74a3370896f340ac.js": { type: "static" }, "/_next/static/chunks/33949.e03784c282cbfdbe.js": { type: "static" }, "/_next/static/chunks/33953.d3aa45df24ba2a08.js": { type: "static" }, "/_next/static/chunks/33954.8cbc5ddb7c8b8ac5.js": { type: "static" }, "/_next/static/chunks/341.2ae64df78bafc6bf.js": { type: "static" }, "/_next/static/chunks/34105.5765a77f4262c4c8.js": { type: "static" }, "/_next/static/chunks/3414.e0cca4f180eeded9.js": { type: "static" }, "/_next/static/chunks/34224.f7229cf773cb39f4.js": { type: "static" }, "/_next/static/chunks/3423.98e51f9ebe71f7bb.js": { type: "static" }, "/_next/static/chunks/34278.de2a77c9c93b80fc.js": { type: "static" }, "/_next/static/chunks/3430.133863c24e8ff2c1.js": { type: "static" }, "/_next/static/chunks/34405.9b5e61fccf811757.js": { type: "static" }, "/_next/static/chunks/34415.4d6cfa4d28bda612.js": { type: "static" }, "/_next/static/chunks/34423.a5ff177f1b3d59aa.js": { type: "static" }, "/_next/static/chunks/34544.b92706c02197c203.js": { type: "static" }, "/_next/static/chunks/34610.9614361ad8b5cee1.js": { type: "static" }, "/_next/static/chunks/34715.5c91faf8527ad043.js": { type: "static" }, "/_next/static/chunks/34763.978792475514a4e7.js": { type: "static" }, "/_next/static/chunks/34838.6c6684ba6adfa2a0.js": { type: "static" }, "/_next/static/chunks/34840.9d48c9d4cf685c25.js": { type: "static" }, "/_next/static/chunks/34928.ecc9f30c3fbfe254.js": { type: "static" }, "/_next/static/chunks/35078.05acc205f7159671.js": { type: "static" }, "/_next/static/chunks/35224.bb053d85496f7089.js": { type: "static" }, "/_next/static/chunks/35363.586055e6d289313b.js": { type: "static" }, "/_next/static/chunks/35411.37732554434b966d.js": { type: "static" }, "/_next/static/chunks/35471.dd339e0f36ae5028.js": { type: "static" }, "/_next/static/chunks/3556.dafbc41068b13b49.js": { type: "static" }, "/_next/static/chunks/35575.c736894bdd46919d.js": { type: "static" }, "/_next/static/chunks/35751.077d6bdfa2c8b572.js": { type: "static" }, "/_next/static/chunks/35754.abf81979a2a95e8c.js": { type: "static" }, "/_next/static/chunks/35836.f233f7c53d3e2e33.js": { type: "static" }, "/_next/static/chunks/35900.87628b1de7363fb6.js": { type: "static" }, "/_next/static/chunks/35912.bd5e86fd9b9e7734.js": { type: "static" }, "/_next/static/chunks/3609.ecb1eecc91a9e867.js": { type: "static" }, "/_next/static/chunks/36116.80bf00318edc5b4b.js": { type: "static" }, "/_next/static/chunks/3612.c3d8e3ea92767ad7.js": { type: "static" }, "/_next/static/chunks/36130.ef639377def4b3ca.js": { type: "static" }, "/_next/static/chunks/36150.795e27e33919c116.js": { type: "static" }, "/_next/static/chunks/36321.9eba7d4551e16722.js": { type: "static" }, "/_next/static/chunks/36346.d526409278391b3d.js": { type: "static" }, "/_next/static/chunks/36394.44d51d603e901591.js": { type: "static" }, "/_next/static/chunks/3641.3d15d31c253eafe3.js": { type: "static" }, "/_next/static/chunks/3650.0e776290ffbe524d.js": { type: "static" }, "/_next/static/chunks/36503.a3e3c876e7a8f75f.js": { type: "static" }, "/_next/static/chunks/36715.08dac76642bcde62.js": { type: "static" }, "/_next/static/chunks/36739.da672072da4e22cb.js": { type: "static" }, "/_next/static/chunks/36776.bcb8918dbbbaac54.js": { type: "static" }, "/_next/static/chunks/36803.20acc17e011e6289.js": { type: "static" }, "/_next/static/chunks/36808.60665945d7d8c896.js": { type: "static" }, "/_next/static/chunks/36821.27e2982a3bef9a62.js": { type: "static" }, "/_next/static/chunks/36828.dbe4908ab21e5dce.js": { type: "static" }, "/_next/static/chunks/36883.94f7a4d3278586fa.js": { type: "static" }, "/_next/static/chunks/36888.dd899a2786729f41.js": { type: "static" }, "/_next/static/chunks/36899.3b3df53a70a4cb2e.js": { type: "static" }, "/_next/static/chunks/36904.e77beb9be45a0a4a.js": { type: "static" }, "/_next/static/chunks/37034.fbe3839986ae02f6.js": { type: "static" }, "/_next/static/chunks/3712.2d8aa0189dd93959.js": { type: "static" }, "/_next/static/chunks/37157.5a59553e5764ecd3.js": { type: "static" }, "/_next/static/chunks/37206.2ffcdd1d5780bb12.js": { type: "static" }, "/_next/static/chunks/37213.91c87e53d007c9a5.js": { type: "static" }, "/_next/static/chunks/37267.c369ff3a1052d7aa.js": { type: "static" }, "/_next/static/chunks/37337.b9ad9fd06df4e758.js": { type: "static" }, "/_next/static/chunks/37533.70abddf92397d0ca.js": { type: "static" }, "/_next/static/chunks/37683.2d85083109eb3404.js": { type: "static" }, "/_next/static/chunks/37760.0b77e5195d3c5f6e.js": { type: "static" }, "/_next/static/chunks/37806.652b4f283c44b336.js": { type: "static" }, "/_next/static/chunks/37829.365ae09fecf9b73e.js": { type: "static" }, "/_next/static/chunks/37832.49300fab7312f6af.js": { type: "static" }, "/_next/static/chunks/37862.5940c1f12e9e6323.js": { type: "static" }, "/_next/static/chunks/37984.32a61d9929c9aa94.js": { type: "static" }, "/_next/static/chunks/38060.ca8dd8c542e2facd.js": { type: "static" }, "/_next/static/chunks/38098.4cb221b0e2e75c80.js": { type: "static" }, "/_next/static/chunks/38220.d19115709c906e31.js": { type: "static" }, "/_next/static/chunks/38312.5790f2d5ae40a961.js": { type: "static" }, "/_next/static/chunks/3840.b165d07e3e271f9b.js": { type: "static" }, "/_next/static/chunks/3847.6c17bf6e62cbc503.js": { type: "static" }, "/_next/static/chunks/38542.c9a4aead9cd73980.js": { type: "static" }, "/_next/static/chunks/38553.bf30d52fabedc192.js": { type: "static" }, "/_next/static/chunks/38554.e3cfb89017b3d8c5.js": { type: "static" }, "/_next/static/chunks/38584.de49b7fab8e243d4.js": { type: "static" }, "/_next/static/chunks/38659.dde2292cff7e6673.js": { type: "static" }, "/_next/static/chunks/38866.571de9ea3bd359b2.js": { type: "static" }, "/_next/static/chunks/38925.a0f3b5edf22a44b0.js": { type: "static" }, "/_next/static/chunks/38949.10c1c2ceb56414df.js": { type: "static" }, "/_next/static/chunks/3909.3e5107fe543c7edd.js": { type: "static" }, "/_next/static/chunks/39199.dc7eac18dfa8ba57.js": { type: "static" }, "/_next/static/chunks/39334.77ae4f7543370832.js": { type: "static" }, "/_next/static/chunks/39409.2816f8dd5cf3b999.js": { type: "static" }, "/_next/static/chunks/39522.52f974794056b8a1.js": { type: "static" }, "/_next/static/chunks/39613.3334ec6bf9bcbe48.js": { type: "static" }, "/_next/static/chunks/39693.8961e88302acaa95.js": { type: "static" }, "/_next/static/chunks/39723.26eaf3bf6914da50.js": { type: "static" }, "/_next/static/chunks/3974.da947d9b8371c984.js": { type: "static" }, "/_next/static/chunks/39823.8ea76d7ca84a06ba.js": { type: "static" }, "/_next/static/chunks/39845.59cfa26d22ce2a41.js": { type: "static" }, "/_next/static/chunks/39853.db90c69d1f49bab8.js": { type: "static" }, "/_next/static/chunks/39893.5e28bcb501af57bd.js": { type: "static" }, "/_next/static/chunks/39989.e34ee838ea9c42ff.js": { type: "static" }, "/_next/static/chunks/40046.9d141955ecdce968.js": { type: "static" }, "/_next/static/chunks/40085.0d005790bbc4557a.js": { type: "static" }, "/_next/static/chunks/40152.844452de7e3d0625.js": { type: "static" }, "/_next/static/chunks/40284.1763d8099be1ca50.js": { type: "static" }, "/_next/static/chunks/40289.56a5de3f2d869e9d.js": { type: "static" }, "/_next/static/chunks/40292.d5365b32afd1c37e.js": { type: "static" }, "/_next/static/chunks/40302.fb4c3fabf9a1c246.js": { type: "static" }, "/_next/static/chunks/40340.6985cc9d5c36a456.js": { type: "static" }, "/_next/static/chunks/40370.6d7d8108ac329343.js": { type: "static" }, "/_next/static/chunks/40434.3350e2d1f7074415.js": { type: "static" }, "/_next/static/chunks/40444.cc871a2ba224aa3c.js": { type: "static" }, "/_next/static/chunks/40476.7c6a661115ce49b5.js": { type: "static" }, "/_next/static/chunks/40485.92319d12b320f912.js": { type: "static" }, "/_next/static/chunks/40519.c15fb977bc607680.js": { type: "static" }, "/_next/static/chunks/40729.a9ea93d52a1c9b99.js": { type: "static" }, "/_next/static/chunks/40795.dbd93ea37ab246b7.js": { type: "static" }, "/_next/static/chunks/40800.bbc2a08b14c191c4.js": { type: "static" }, "/_next/static/chunks/40867.b0182982d99c4724.js": { type: "static" }, "/_next/static/chunks/40875.c7646806b228a5d3.js": { type: "static" }, "/_next/static/chunks/40918.67c9fb8241b6f251.js": { type: "static" }, "/_next/static/chunks/41021.d5dad044af8d5214.js": { type: "static" }, "/_next/static/chunks/41147.2102205925e46edd.js": { type: "static" }, "/_next/static/chunks/41169.43365763ef2e6b8d.js": { type: "static" }, "/_next/static/chunks/41206.a5c398f04b866209.js": { type: "static" }, "/_next/static/chunks/41217.8475af69edd769f9.js": { type: "static" }, "/_next/static/chunks/41238.5a4a7c91537965ab.js": { type: "static" }, "/_next/static/chunks/41251.c47740e75b3652af.js": { type: "static" }, "/_next/static/chunks/41304.472bc523168fd189.js": { type: "static" }, "/_next/static/chunks/41319.f9d33ea071513a2e.js": { type: "static" }, "/_next/static/chunks/41414.561e479a87be4fb0.js": { type: "static" }, "/_next/static/chunks/41430.d2a84e1e2f4c1a82.js": { type: "static" }, "/_next/static/chunks/41466.bf267483f9b78f76.js": { type: "static" }, "/_next/static/chunks/41473.23f37b0a324287be.js": { type: "static" }, "/_next/static/chunks/41632.7de55fe0e5a5b4e6.js": { type: "static" }, "/_next/static/chunks/41639.30cd3ae818ba4e44.js": { type: "static" }, "/_next/static/chunks/41671.ab7dd2c7b239f24a.js": { type: "static" }, "/_next/static/chunks/41827.2f02ef064baa843a.js": { type: "static" }, "/_next/static/chunks/41905.5054c8d8054b3083.js": { type: "static" }, "/_next/static/chunks/41970.f7931ea28c89e65d.js": { type: "static" }, "/_next/static/chunks/4201.e99b4b0f031b84d0.js": { type: "static" }, "/_next/static/chunks/42010.752f02b711630fe7.js": { type: "static" }, "/_next/static/chunks/42042.026acc032fee6001.js": { type: "static" }, "/_next/static/chunks/42057.f5002a322f1ded43.js": { type: "static" }, "/_next/static/chunks/42107.8f0cdf0db66c4d04.js": { type: "static" }, "/_next/static/chunks/42133.bedfcd0d84664b86.js": { type: "static" }, "/_next/static/chunks/42208.b5e9f74ad4498ba2.js": { type: "static" }, "/_next/static/chunks/42211.fe717f314834e4dc.js": { type: "static" }, "/_next/static/chunks/42239.244c8458ef4aa2a6.js": { type: "static" }, "/_next/static/chunks/42244.4b6c9167f876bff0.js": { type: "static" }, "/_next/static/chunks/4226.7a28cfa4aef775ab.js": { type: "static" }, "/_next/static/chunks/42283.647470dd489ed166.js": { type: "static" }, "/_next/static/chunks/42351.2bc694ca8838cf17.js": { type: "static" }, "/_next/static/chunks/42449.d3ade134d6f165c6.js": { type: "static" }, "/_next/static/chunks/4246.a22be7f52280d484.js": { type: "static" }, "/_next/static/chunks/42488.d64f8dc2d66e51e7.js": { type: "static" }, "/_next/static/chunks/4249.8a334fec7ec3eb41.js": { type: "static" }, "/_next/static/chunks/42579.69f2506c2edddefb.js": { type: "static" }, "/_next/static/chunks/42585.644b65eccde40169.js": { type: "static" }, "/_next/static/chunks/42676.87a345c926d05416.js": { type: "static" }, "/_next/static/chunks/42708.1d84b2294949c460.js": { type: "static" }, "/_next/static/chunks/42784.468b6593f47a56f5.js": { type: "static" }, "/_next/static/chunks/42833.b6b605bc05621076.js": { type: "static" }, "/_next/static/chunks/42970.1578ee1104392bc6.js": { type: "static" }, "/_next/static/chunks/42979.bcda00959bd509fa.js": { type: "static" }, "/_next/static/chunks/43044.5cc9fb3c0b013cbf.js": { type: "static" }, "/_next/static/chunks/4315.569bd7a42360565e.js": { type: "static" }, "/_next/static/chunks/43157.b4b1797e518d4351.js": { type: "static" }, "/_next/static/chunks/43166.0d6668da18d1373b.js": { type: "static" }, "/_next/static/chunks/43191.db47e44fa204e00e.js": { type: "static" }, "/_next/static/chunks/43232.00587f82ed61a206.js": { type: "static" }, "/_next/static/chunks/43299.0614023570cc668f.js": { type: "static" }, "/_next/static/chunks/43391.defa560c398cbc5f.js": { type: "static" }, "/_next/static/chunks/43402.1ad85a13a53d6e65.js": { type: "static" }, "/_next/static/chunks/43440.c19e61399b2b1686.js": { type: "static" }, "/_next/static/chunks/43455.40716250e37e3eef.js": { type: "static" }, "/_next/static/chunks/43506.2d8524eb9fa4abda.js": { type: "static" }, "/_next/static/chunks/4353.672a67fbba7c3b8d.js": { type: "static" }, "/_next/static/chunks/43611.25b6b6155411adba.js": { type: "static" }, "/_next/static/chunks/43635.a1e2538d4f123b74.js": { type: "static" }, "/_next/static/chunks/43680.b89b022b6275f098.js": { type: "static" }, "/_next/static/chunks/43681.5651e731a9bd4589.js": { type: "static" }, "/_next/static/chunks/43700.6617329cbcf32737.js": { type: "static" }, "/_next/static/chunks/43720.b0bed84085514aaa.js": { type: "static" }, "/_next/static/chunks/43727.0a1f5a16f9f6b0fb.js": { type: "static" }, "/_next/static/chunks/43745.10d520170e2027a3.js": { type: "static" }, "/_next/static/chunks/43775.d17b69cb2a3c0467.js": { type: "static" }, "/_next/static/chunks/43830.2e33bac9b3adc33e.js": { type: "static" }, "/_next/static/chunks/43840.b2327bdbdac9e860.js": { type: "static" }, "/_next/static/chunks/43999.e7de51d477bf2f65.js": { type: "static" }, "/_next/static/chunks/44063.2e72adab5ef8c71d.js": { type: "static" }, "/_next/static/chunks/44159.2f3fc6a3494dd54f.js": { type: "static" }, "/_next/static/chunks/44233.57d61c01c8e72404.js": { type: "static" }, "/_next/static/chunks/44353.f62703300a272aa2.js": { type: "static" }, "/_next/static/chunks/44380.9a417059016fe05f.js": { type: "static" }, "/_next/static/chunks/44406.8eb6ab67a705a883.js": { type: "static" }, "/_next/static/chunks/44410.6748b36e87b944f9.js": { type: "static" }, "/_next/static/chunks/4443.d085c425fe32fd6c.js": { type: "static" }, "/_next/static/chunks/4451.9f6582fe11c9284f.js": { type: "static" }, "/_next/static/chunks/44550.987f57835e522248.js": { type: "static" }, "/_next/static/chunks/44564.736de633d8c80442.js": { type: "static" }, "/_next/static/chunks/4458.e5d40345177bc554.js": { type: "static" }, "/_next/static/chunks/44600.8d802ddcb47fcc03.js": { type: "static" }, "/_next/static/chunks/44630.1a0edd4726fdb556.js": { type: "static" }, "/_next/static/chunks/44666.5d9728587d8b5c05.js": { type: "static" }, "/_next/static/chunks/44719.17f286a33c8afe92.js": { type: "static" }, "/_next/static/chunks/44743.d681012fff700bb2.js": { type: "static" }, "/_next/static/chunks/44794.28bd9382122b1c5d.js": { type: "static" }, "/_next/static/chunks/44801.64279225857ea4d9.js": { type: "static" }, "/_next/static/chunks/44852.97d60b8d126cbf9e.js": { type: "static" }, "/_next/static/chunks/44925.414dcda2dec4438b.js": { type: "static" }, "/_next/static/chunks/44938.47618cf8a32041ae.js": { type: "static" }, "/_next/static/chunks/44940.05d64c83619821f0.js": { type: "static" }, "/_next/static/chunks/44983.a2730b08c49b4ac1.js": { type: "static" }, "/_next/static/chunks/45084.5c02410dbd21123f.js": { type: "static" }, "/_next/static/chunks/45175.c89897e73a883b9f.js": { type: "static" }, "/_next/static/chunks/45215.69110c059451ca7c.js": { type: "static" }, "/_next/static/chunks/45226.3ff3d39200840eeb.js": { type: "static" }, "/_next/static/chunks/45274.f9883e45e72b8c27.js": { type: "static" }, "/_next/static/chunks/45275.f66592bc382b80ad.js": { type: "static" }, "/_next/static/chunks/45361.897d8a3c76a0a143.js": { type: "static" }, "/_next/static/chunks/45376.ab90d51f8a23d421.js": { type: "static" }, "/_next/static/chunks/45440.db228338135e2c60.js": { type: "static" }, "/_next/static/chunks/45459.2892c567e5d74029.js": { type: "static" }, "/_next/static/chunks/4554.7b5d83b7fa84b205.js": { type: "static" }, "/_next/static/chunks/45554.fda842c042b544f9.js": { type: "static" }, "/_next/static/chunks/45557.75fdb15bc051a828.js": { type: "static" }, "/_next/static/chunks/45575.aa6dad699d504a14.js": { type: "static" }, "/_next/static/chunks/45589.08b27f10ce0609c9.js": { type: "static" }, "/_next/static/chunks/45654.a34a90b894094189.js": { type: "static" }, "/_next/static/chunks/45675.8c6f11a3194a6a7e.js": { type: "static" }, "/_next/static/chunks/45738.5b15f7515dab3eea.js": { type: "static" }, "/_next/static/chunks/45760.388d47275819e001.js": { type: "static" }, "/_next/static/chunks/45802.7646f79314d2d7b7.js": { type: "static" }, "/_next/static/chunks/45884.c18e5413bafa7fe0.js": { type: "static" }, "/_next/static/chunks/45886.88de0db3bc6b6b63.js": { type: "static" }, "/_next/static/chunks/46182.d88aa0d36a5bb9b8.js": { type: "static" }, "/_next/static/chunks/46183.c1bb2fc30b18804f.js": { type: "static" }, "/_next/static/chunks/46191.d7d095eb7e579e57.js": { type: "static" }, "/_next/static/chunks/46211.eddd7bfc73ab0f6b.js": { type: "static" }, "/_next/static/chunks/46249.33ec00277300d769.js": { type: "static" }, "/_next/static/chunks/46263.bce9506e5257cde4.js": { type: "static" }, "/_next/static/chunks/46381.e29e6947647a0dbd.js": { type: "static" }, "/_next/static/chunks/46398.dbed21b4bb49bcfa.js": { type: "static" }, "/_next/static/chunks/46506.ec4fd8729c772a3c.js": { type: "static" }, "/_next/static/chunks/46541.79be672ef8d193cc.js": { type: "static" }, "/_next/static/chunks/46646.b912061f8c2d99fc.js": { type: "static" }, "/_next/static/chunks/46748.1b21fe2bec842152.js": { type: "static" }, "/_next/static/chunks/46778.d1794d42e019e584.js": { type: "static" }, "/_next/static/chunks/46993.5924f56e96509a5c.js": { type: "static" }, "/_next/static/chunks/47002.a083b87c5746c1ae.js": { type: "static" }, "/_next/static/chunks/47015.57b560fca68cc020.js": { type: "static" }, "/_next/static/chunks/47028.32cd6d133f02d5ef.js": { type: "static" }, "/_next/static/chunks/47129.25334f7eea5c0d7d.js": { type: "static" }, "/_next/static/chunks/47171.1914666e52da457c.js": { type: "static" }, "/_next/static/chunks/47260.c6a8c0cf7dae6ec4.js": { type: "static" }, "/_next/static/chunks/47263.d328c96181358636.js": { type: "static" }, "/_next/static/chunks/47350.67f08c55e00bc130.js": { type: "static" }, "/_next/static/chunks/47416.2c10d9617a39cfcd.js": { type: "static" }, "/_next/static/chunks/47508.bbbc383c88116fa9.js": { type: "static" }, "/_next/static/chunks/47533.ab86b66626d648c3.js": { type: "static" }, "/_next/static/chunks/47567.d7486fa10fba18e1.js": { type: "static" }, "/_next/static/chunks/47619.8e9c974a6ef3ca39.js": { type: "static" }, "/_next/static/chunks/47658.848086d0230f7c74.js": { type: "static" }, "/_next/static/chunks/47692.fc180a9ada6c4a03.js": { type: "static" }, "/_next/static/chunks/47737.ab343d36e16c4f2a.js": { type: "static" }, "/_next/static/chunks/47755.067792cc13d53bdf.js": { type: "static" }, "/_next/static/chunks/47918.12281d1f5ec43b24.js": { type: "static" }, "/_next/static/chunks/4810.7d8a97ec2b103088.js": { type: "static" }, "/_next/static/chunks/48166.02dad03881c098f8.js": { type: "static" }, "/_next/static/chunks/48278.787ef4a9ae89e072.js": { type: "static" }, "/_next/static/chunks/48364.4881a66f9d656d1d.js": { type: "static" }, "/_next/static/chunks/48501.42aa45cbd67a0390.js": { type: "static" }, "/_next/static/chunks/48513.b758360a09ccf0f4.js": { type: "static" }, "/_next/static/chunks/48662.039c9f99da3d0436.js": { type: "static" }, "/_next/static/chunks/4869.b0fc517bb7f2b685.js": { type: "static" }, "/_next/static/chunks/48711.30abedabb306a6c4.js": { type: "static" }, "/_next/static/chunks/48713.d8beaa1912fb10d0.js": { type: "static" }, "/_next/static/chunks/48714.4302c3007336b5a6.js": { type: "static" }, "/_next/static/chunks/48736.63f0d7bc21cd8f5c.js": { type: "static" }, "/_next/static/chunks/48757.dc32e4db707ce163.js": { type: "static" }, "/_next/static/chunks/48837.6fc09fea18bdd152.js": { type: "static" }, "/_next/static/chunks/48872.6659922eb1e8af40.js": { type: "static" }, "/_next/static/chunks/48899.a9b2c4c5e15e09eb.js": { type: "static" }, "/_next/static/chunks/48959.00e1baa8b8bdd993.js": { type: "static" }, "/_next/static/chunks/49137.12935408f74a6dd3.js": { type: "static" }, "/_next/static/chunks/49143.e0856a0195a1a1e3.js": { type: "static" }, "/_next/static/chunks/4918.0d6888ca5d0f4697.js": { type: "static" }, "/_next/static/chunks/49190.f60ce774916b0d76.js": { type: "static" }, "/_next/static/chunks/49194.4dbc1bbb3d467103.js": { type: "static" }, "/_next/static/chunks/49232.cc6b59b063b17566.js": { type: "static" }, "/_next/static/chunks/49277.eb2684f2492cd321.js": { type: "static" }, "/_next/static/chunks/49322.5f81d4673fa94265.js": { type: "static" }, "/_next/static/chunks/49361.db52bbabcd9cd166.js": { type: "static" }, "/_next/static/chunks/49465.9d4c47e2438397a3.js": { type: "static" }, "/_next/static/chunks/49474.897cf3301d223093.js": { type: "static" }, "/_next/static/chunks/4948.000250a95d0243a7.js": { type: "static" }, "/_next/static/chunks/49589.bbdc1a24482c977f.js": { type: "static" }, "/_next/static/chunks/49663.cc7b9d3179e23dd3.js": { type: "static" }, "/_next/static/chunks/49724.cd2eb89ceaab9a07.js": { type: "static" }, "/_next/static/chunks/49753.36b82cd7d4953b32.js": { type: "static" }, "/_next/static/chunks/49794.c3275574d4870f14.js": { type: "static" }, "/_next/static/chunks/4987.0ad39dce5e451c3e.js": { type: "static" }, "/_next/static/chunks/4988.b6496d6db7db820d.js": { type: "static" }, "/_next/static/chunks/49910.53623888c66e33ac.js": { type: "static" }, "/_next/static/chunks/49940.22ec5672ac20626a.js": { type: "static" }, "/_next/static/chunks/49981.79c8dbacb4c1b2d6.js": { type: "static" }, "/_next/static/chunks/49998.77b5829d5eb2f0e0.js": { type: "static" }, "/_next/static/chunks/5005.0e83e5e0d10e86e7.js": { type: "static" }, "/_next/static/chunks/50060.d05e2dc3681bd9ad.js": { type: "static" }, "/_next/static/chunks/50091.71b00044b31583b5.js": { type: "static" }, "/_next/static/chunks/50130.c3edec85388c3a99.js": { type: "static" }, "/_next/static/chunks/50201.a9578e6029daafbd.js": { type: "static" }, "/_next/static/chunks/50236.e810b89191d26588.js": { type: "static" }, "/_next/static/chunks/50245.d37b49e8646675eb.js": { type: "static" }, "/_next/static/chunks/50364.e33fa7bea532d48d.js": { type: "static" }, "/_next/static/chunks/50417.c2bf4d73462f102e.js": { type: "static" }, "/_next/static/chunks/50534.5f45b082f08062e0.js": { type: "static" }, "/_next/static/chunks/50598.b9bccfbbf045fc57.js": { type: "static" }, "/_next/static/chunks/50609.61b872f310ac717c.js": { type: "static" }, "/_next/static/chunks/50615.011b3ea68ec84145.js": { type: "static" }, "/_next/static/chunks/50684.3840159c8ff789ee.js": { type: "static" }, "/_next/static/chunks/50733.719c84c32b39b5d2.js": { type: "static" }, "/_next/static/chunks/50768.c7df9ceb973853d4.js": { type: "static" }, "/_next/static/chunks/50886.d6408fade9c0a2fc.js": { type: "static" }, "/_next/static/chunks/50908.d71dc894b02e104c.js": { type: "static" }, "/_next/static/chunks/50918.f2fd793e3245d8da.js": { type: "static" }, "/_next/static/chunks/50927.c043ede7caaf4042.js": { type: "static" }, "/_next/static/chunks/50953.034b2db48ac5ffa8.js": { type: "static" }, "/_next/static/chunks/51032.6b28377441f3d498.js": { type: "static" }, "/_next/static/chunks/51076.266fbb80f1707417.js": { type: "static" }, "/_next/static/chunks/5136.cadfa3048b5f92a4.js": { type: "static" }, "/_next/static/chunks/51404.0397a8bfd8924b52.js": { type: "static" }, "/_next/static/chunks/51477.3354bd61fd12c4ab.js": { type: "static" }, "/_next/static/chunks/51488.b92fd0111bff2089.js": { type: "static" }, "/_next/static/chunks/51548.9f09fbdf19a52c73.js": { type: "static" }, "/_next/static/chunks/51584.6cb6ea958d9c0103.js": { type: "static" }, "/_next/static/chunks/51596.3380225be72cec6a.js": { type: "static" }, "/_next/static/chunks/51599.668d1f9db707168c.js": { type: "static" }, "/_next/static/chunks/51689.6dab37c0c72431b3.js": { type: "static" }, "/_next/static/chunks/51817.e25505487d933b1e.js": { type: "static" }, "/_next/static/chunks/5187.2e30162d11cb4336.js": { type: "static" }, "/_next/static/chunks/51884.f91e64d71770e27a.js": { type: "static" }, "/_next/static/chunks/51988.3ce82beaf02ee41d.js": { type: "static" }, "/_next/static/chunks/5199.d36a8ff34adb1162.js": { type: "static" }, "/_next/static/chunks/52048.a36285269432c402.js": { type: "static" }, "/_next/static/chunks/52060.71a9b805fa723111.js": { type: "static" }, "/_next/static/chunks/52117-9452f61707520acd.js": { type: "static" }, "/_next/static/chunks/52264.e4f49495d75afedf.js": { type: "static" }, "/_next/static/chunks/52294.01ab5b38831247ad.js": { type: "static" }, "/_next/static/chunks/52333.5364dcc7e14c25c9.js": { type: "static" }, "/_next/static/chunks/52405.c1a2b0d5774056f3.js": { type: "static" }, "/_next/static/chunks/52529.a67f66ee23c73ec9.js": { type: "static" }, "/_next/static/chunks/52605.92f09aa03b2b7b5d.js": { type: "static" }, "/_next/static/chunks/52636.cc381871c4000425.js": { type: "static" }, "/_next/static/chunks/52733.51661a5aaa9ad21c.js": { type: "static" }, "/_next/static/chunks/52784.11afd24e0786acff.js": { type: "static" }, "/_next/static/chunks/53009.456ab2828d7ecaa1.js": { type: "static" }, "/_next/static/chunks/53011.acad23cb57c9cbec.js": { type: "static" }, "/_next/static/chunks/53026.5c67f2c2e1a6a9c0.js": { type: "static" }, "/_next/static/chunks/53057.12eca6cba8b262aa.js": { type: "static" }, "/_next/static/chunks/53069.d46a154e42789407.js": { type: "static" }, "/_next/static/chunks/53113.a9969ab6518be9d2.js": { type: "static" }, "/_next/static/chunks/53121.3a1f7c0aecb353a3.js": { type: "static" }, "/_next/static/chunks/53136.141dee1556c861f8.js": { type: "static" }, "/_next/static/chunks/53152.f1f4156c2470616c.js": { type: "static" }, "/_next/static/chunks/53226.9df595a8049c4c2a.js": { type: "static" }, "/_next/static/chunks/53305.1f471ad74f424294.js": { type: "static" }, "/_next/static/chunks/53315.f9c005bac4e3b501.js": { type: "static" }, "/_next/static/chunks/53354.dc65e083ebb6a494.js": { type: "static" }, "/_next/static/chunks/53417.7ca48e03df48b09b.js": { type: "static" }, "/_next/static/chunks/53470.1ba85636215ce50c.js": { type: "static" }, "/_next/static/chunks/53482.6f2aad880b7a4534.js": { type: "static" }, "/_next/static/chunks/53517.d5033a4736ef7606.js": { type: "static" }, "/_next/static/chunks/53581.ec79262a6cc081f7.js": { type: "static" }, "/_next/static/chunks/53639.802536ca6169c50f.js": { type: "static" }, "/_next/static/chunks/53688.b4af58d303999d34.js": { type: "static" }, "/_next/static/chunks/53891.3b492bd1fdd9cd17.js": { type: "static" }, "/_next/static/chunks/53959.b8eacd3dee41cbbb.js": { type: "static" }, "/_next/static/chunks/54001.4fe59236068f78a7.js": { type: "static" }, "/_next/static/chunks/54052.e43cfdfd405fd4df.js": { type: "static" }, "/_next/static/chunks/54073.e6f0cbfe6c034704.js": { type: "static" }, "/_next/static/chunks/54077.96cdfb306fe06b17.js": { type: "static" }, "/_next/static/chunks/54080.e943413aa9d14911.js": { type: "static" }, "/_next/static/chunks/54102.ad4aea8aadc205ba.js": { type: "static" }, "/_next/static/chunks/54159.e4be0b6647d848b9.js": { type: "static" }, "/_next/static/chunks/54176.c6245ad8106e923b.js": { type: "static" }, "/_next/static/chunks/5429.7533974a400f30e6.js": { type: "static" }, "/_next/static/chunks/54374.54df4542cecbac65.js": { type: "static" }, "/_next/static/chunks/54406.a366a798f3937dec.js": { type: "static" }, "/_next/static/chunks/54445.27ac4caec609ce54.js": { type: "static" }, "/_next/static/chunks/54473.17378dba6aeac7cf.js": { type: "static" }, "/_next/static/chunks/54477.fa7b81950fa26e55.js": { type: "static" }, "/_next/static/chunks/54486.3cf6b12683f622c0.js": { type: "static" }, "/_next/static/chunks/54537.234e8d4c9b2a768f.js": { type: "static" }, "/_next/static/chunks/54569.c215ae8de29fa767.js": { type: "static" }, "/_next/static/chunks/54770.fd11c021a4c71a22.js": { type: "static" }, "/_next/static/chunks/54802.3f93465b55f6b190.js": { type: "static" }, "/_next/static/chunks/54882.2d2ca6edd2917ede.js": { type: "static" }, "/_next/static/chunks/55021.d3f01d4afcfe3b8e.js": { type: "static" }, "/_next/static/chunks/55062.a5e8854127841046.js": { type: "static" }, "/_next/static/chunks/55082.b18aa1ae62e67beb.js": { type: "static" }, "/_next/static/chunks/55093.a2279f14007922ab.js": { type: "static" }, "/_next/static/chunks/55217.29a46e941571964e.js": { type: "static" }, "/_next/static/chunks/55287.fd1c3348adeace39.js": { type: "static" }, "/_next/static/chunks/55322.9198e1ce9ad181e9.js": { type: "static" }, "/_next/static/chunks/55455.b5902a94e2f375b9.js": { type: "static" }, "/_next/static/chunks/55534-768f9fe3735b58cd.js": { type: "static" }, "/_next/static/chunks/55565.e8ad8dd8313cad8c.js": { type: "static" }, "/_next/static/chunks/55736.cfd44d83d6cde369.js": { type: "static" }, "/_next/static/chunks/55737.8fb0c848093020aa.js": { type: "static" }, "/_next/static/chunks/55870.5344a9c36565b148.js": { type: "static" }, "/_next/static/chunks/55900.004c5fec879a04e9.js": { type: "static" }, "/_next/static/chunks/55901.04df6d37084c91b9.js": { type: "static" }, "/_next/static/chunks/55905.eaa2137dbad8d8c5.js": { type: "static" }, "/_next/static/chunks/55909.1be4446d0a2216e7.js": { type: "static" }, "/_next/static/chunks/56005.20430aee83a1c092.js": { type: "static" }, "/_next/static/chunks/56065.dc330d133b9d7424.js": { type: "static" }, "/_next/static/chunks/56096.63cf99e5b8ffe790.js": { type: "static" }, "/_next/static/chunks/56119.a7dea4a6cf7d5705.js": { type: "static" }, "/_next/static/chunks/56272.6aaa845cdab7cc94.js": { type: "static" }, "/_next/static/chunks/56348.efac7da0a5dd939e.js": { type: "static" }, "/_next/static/chunks/56421.344c9594a9cbefa9.js": { type: "static" }, "/_next/static/chunks/56439.509ebedd676c0b61.js": { type: "static" }, "/_next/static/chunks/56445.41160f181f691ffc.js": { type: "static" }, "/_next/static/chunks/56454.df283713b151e997.js": { type: "static" }, "/_next/static/chunks/56475.82df6c4082a829c4.js": { type: "static" }, "/_next/static/chunks/56732.3ec2aa6d4ecc3ef5.js": { type: "static" }, "/_next/static/chunks/56783.5f1f56f57ca86aa3.js": { type: "static" }, "/_next/static/chunks/56794.7bb0852ac050c51a.js": { type: "static" }, "/_next/static/chunks/56831.b487f7e34a48e818.js": { type: "static" }, "/_next/static/chunks/56839.8de5bdb5f135ce3b.js": { type: "static" }, "/_next/static/chunks/56968.38048e13c8bf3228.js": { type: "static" }, "/_next/static/chunks/57072.d8a25a6ffd910fbe.js": { type: "static" }, "/_next/static/chunks/57081.4d67c160d35efab5.js": { type: "static" }, "/_next/static/chunks/57109.868e7aa5ec9ad6e2.js": { type: "static" }, "/_next/static/chunks/57208.c9756eeccc36037b.js": { type: "static" }, "/_next/static/chunks/57270.056a3f4f1f5604f6.js": { type: "static" }, "/_next/static/chunks/57308.0606462881909eb0.js": { type: "static" }, "/_next/static/chunks/57343.2317c01365b303be.js": { type: "static" }, "/_next/static/chunks/57356.d4a384e15606a223.js": { type: "static" }, "/_next/static/chunks/57358.9d7184b6d639bb3a.js": { type: "static" }, "/_next/static/chunks/5738.2f4bc241ec4096af.js": { type: "static" }, "/_next/static/chunks/57474.5279d5c03f785d2c.js": { type: "static" }, "/_next/static/chunks/57559.a10cf01d94e6266e.js": { type: "static" }, "/_next/static/chunks/57570.7bf11347fc312078.js": { type: "static" }, "/_next/static/chunks/57662.628d9fbf8214ed0e.js": { type: "static" }, "/_next/static/chunks/57704.c3e0d217928145b7.js": { type: "static" }, "/_next/static/chunks/57716.4b4df721814676df.js": { type: "static" }, "/_next/static/chunks/57778.b40df55ca9d90990.js": { type: "static" }, "/_next/static/chunks/57887.4e03c2dabf27ba87.js": { type: "static" }, "/_next/static/chunks/57904.b00a4d36158cf444.js": { type: "static" }, "/_next/static/chunks/57909.7d5e00b2205be33a.js": { type: "static" }, "/_next/static/chunks/57932.af323cc590c03566.js": { type: "static" }, "/_next/static/chunks/58062.7274d8b4f6cd8152.js": { type: "static" }, "/_next/static/chunks/58201.13fdb50fe39064e4.js": { type: "static" }, "/_next/static/chunks/58293.8c9b695be6da8cf2.js": { type: "static" }, "/_next/static/chunks/5831.1f8439cf29b271a7.js": { type: "static" }, "/_next/static/chunks/58310.592a9c283be4e427.js": { type: "static" }, "/_next/static/chunks/5865.b3d0cf6cb99858ef.js": { type: "static" }, "/_next/static/chunks/5871.241a22c0b8566650.js": { type: "static" }, "/_next/static/chunks/58847.c0f168f117164c82.js": { type: "static" }, "/_next/static/chunks/5887.790404f216aece0a.js": { type: "static" }, "/_next/static/chunks/58896.78ccd9660ace7f2a.js": { type: "static" }, "/_next/static/chunks/59054.8498ec8a62626373.js": { type: "static" }, "/_next/static/chunks/59106.b577b67a33eab195.js": { type: "static" }, "/_next/static/chunks/59142.0996c58a2a31d319.js": { type: "static" }, "/_next/static/chunks/59196.d6c5bb17c4c69fbe.js": { type: "static" }, "/_next/static/chunks/59294.871f566a85569dff.js": { type: "static" }, "/_next/static/chunks/59426.31d5feb97c10e0f1.js": { type: "static" }, "/_next/static/chunks/59498.6ec76e4ee0c13446.js": { type: "static" }, "/_next/static/chunks/59564.c47ec020189bf442.js": { type: "static" }, "/_next/static/chunks/59582.8673f8f04d1acd2b.js": { type: "static" }, "/_next/static/chunks/59583.65609365dd7cb93d.js": { type: "static" }, "/_next/static/chunks/59613.98647443b58f3c6a.js": { type: "static" }, "/_next/static/chunks/59749.cea0a41221b1cfd4.js": { type: "static" }, "/_next/static/chunks/59833.a11fe8f2bd348b57.js": { type: "static" }, "/_next/static/chunks/59933.de1aa28707806fee.js": { type: "static" }, "/_next/static/chunks/59934.b0fd7b3965fe9042.js": { type: "static" }, "/_next/static/chunks/5999.e07079eb2f8ac801.js": { type: "static" }, "/_next/static/chunks/60044.cb10ea2917973787.js": { type: "static" }, "/_next/static/chunks/60100.a9efaa4d739bbc11.js": { type: "static" }, "/_next/static/chunks/60332.a2b1fe600d287fdb.js": { type: "static" }, "/_next/static/chunks/60347.ab582d1caa03beff.js": { type: "static" }, "/_next/static/chunks/60522.9570f16b3c298b95.js": { type: "static" }, "/_next/static/chunks/60636.a9288d178d94a81a.js": { type: "static" }, "/_next/static/chunks/60640.619399dec4d24e93.js": { type: "static" }, "/_next/static/chunks/60713.adb59e160d919107.js": { type: "static" }, "/_next/static/chunks/60721.95d85bd272f3a6d2.js": { type: "static" }, "/_next/static/chunks/60730.f64765497946a67f.js": { type: "static" }, "/_next/static/chunks/6076.5b03a8bb9dfd7376.js": { type: "static" }, "/_next/static/chunks/60765.46e7fb0ef2c4d27e.js": { type: "static" }, "/_next/static/chunks/60926.4009dfd5f8821f62.js": { type: "static" }, "/_next/static/chunks/61094.fe56d0049fef51a0.js": { type: "static" }, "/_next/static/chunks/61101.774ac2aeddc60b07.js": { type: "static" }, "/_next/static/chunks/61102.ff5fc6d993031f07.js": { type: "static" }, "/_next/static/chunks/61156.5464a5104fcbe469.js": { type: "static" }, "/_next/static/chunks/61167.33b90ae9971a6cda.js": { type: "static" }, "/_next/static/chunks/61178.212745d76092ce08.js": { type: "static" }, "/_next/static/chunks/61281.c7f2f3e2c465a6ac.js": { type: "static" }, "/_next/static/chunks/61290.21ac45eb24d8fb9c.js": { type: "static" }, "/_next/static/chunks/61322.a494d306806a23fb.js": { type: "static" }, "/_next/static/chunks/61341.0ea2d2fc75f06ebd.js": { type: "static" }, "/_next/static/chunks/61391.2e7a0ef11b564a93.js": { type: "static" }, "/_next/static/chunks/61392.6a63bdce267bd032.js": { type: "static" }, "/_next/static/chunks/61476.5bb863ba2c1c46e3.js": { type: "static" }, "/_next/static/chunks/61488.001b9f51a95442fa.js": { type: "static" }, "/_next/static/chunks/6153.532e0d114b40511a.js": { type: "static" }, "/_next/static/chunks/61552.517cf7956cb31539.js": { type: "static" }, "/_next/static/chunks/61574.60315e694006a083.js": { type: "static" }, "/_next/static/chunks/61592.1efc938961caf273.js": { type: "static" }, "/_next/static/chunks/61634.b2c7b0ef9d99edf6.js": { type: "static" }, "/_next/static/chunks/61641.1b9f1d29f4ed7ee5.js": { type: "static" }, "/_next/static/chunks/61649.773b6d10944ce832.js": { type: "static" }, "/_next/static/chunks/61710.aba373b96db08a27.js": { type: "static" }, "/_next/static/chunks/61743.0a657b2d95b9259f.js": { type: "static" }, "/_next/static/chunks/61788.eec3bcc540625640.js": { type: "static" }, "/_next/static/chunks/61840.f50c1b343794c07e.js": { type: "static" }, "/_next/static/chunks/61856.f4464d27317fd8fe.js": { type: "static" }, "/_next/static/chunks/61875.bf007a0b039dd48f.js": { type: "static" }, "/_next/static/chunks/61928.d74833c0073bb00b.js": { type: "static" }, "/_next/static/chunks/61960.3a27f1e9fcce9f56.js": { type: "static" }, "/_next/static/chunks/62021.ea9e052218ba210f.js": { type: "static" }, "/_next/static/chunks/62031.069c9ece7401e192.js": { type: "static" }, "/_next/static/chunks/62101.96b61fff39476da2.js": { type: "static" }, "/_next/static/chunks/6213.fccef37da63d9609.js": { type: "static" }, "/_next/static/chunks/62215.4a3bb199fc541dfb.js": { type: "static" }, "/_next/static/chunks/62250.38658e30082db980.js": { type: "static" }, "/_next/static/chunks/62319.39cb8b5527fd70c0.js": { type: "static" }, "/_next/static/chunks/62390.94ebed281b7c404c.js": { type: "static" }, "/_next/static/chunks/62598.190078ca06e7d1fc.js": { type: "static" }, "/_next/static/chunks/62720.e45bca730a5cb98b.js": { type: "static" }, "/_next/static/chunks/62879.a0d99f40e1190e62.js": { type: "static" }, "/_next/static/chunks/62883.0f48799efe36b049.js": { type: "static" }, "/_next/static/chunks/62926.572d9f44b3ae43ea.js": { type: "static" }, "/_next/static/chunks/62945.33914dad10dde5d0.js": { type: "static" }, "/_next/static/chunks/62973.45d8711d8c453737.js": { type: "static" }, "/_next/static/chunks/6322.9ccea2dcea556996.js": { type: "static" }, "/_next/static/chunks/63307.48e32385bc57e6c7.js": { type: "static" }, "/_next/static/chunks/63490.2a416f587e421447.js": { type: "static" }, "/_next/static/chunks/63630.55ef83c99d695091.js": { type: "static" }, "/_next/static/chunks/63651.eb0a315fa21f5b25.js": { type: "static" }, "/_next/static/chunks/63674.60f8e8a9947fde7b.js": { type: "static" }, "/_next/static/chunks/63805.400c898058d801dd.js": { type: "static" }, "/_next/static/chunks/6387.f9f20ee3503a25ca.js": { type: "static" }, "/_next/static/chunks/63875.6f6c978b2f12b2ed.js": { type: "static" }, "/_next/static/chunks/63891.6fa96357adb28349.js": { type: "static" }, "/_next/static/chunks/64022.d2fb503f178bce7b.js": { type: "static" }, "/_next/static/chunks/64029.bae5d3a4c96781ec.js": { type: "static" }, "/_next/static/chunks/64031.bfbb7e960d4412b4.js": { type: "static" }, "/_next/static/chunks/64077.187c5b54f96bd27a.js": { type: "static" }, "/_next/static/chunks/64090.76b57f7d3ae48d5e.js": { type: "static" }, "/_next/static/chunks/64162.8298ed5db591e6cf.js": { type: "static" }, "/_next/static/chunks/64170.1010a726b39f6461.js": { type: "static" }, "/_next/static/chunks/642.0cc01136046ab72d.js": { type: "static" }, "/_next/static/chunks/64227.95f05b1fd2df6991.js": { type: "static" }, "/_next/static/chunks/64274.68175403027e21bd.js": { type: "static" }, "/_next/static/chunks/6430.937e08ecac5027f4.js": { type: "static" }, "/_next/static/chunks/64370.7c29221bb4e516ff.js": { type: "static" }, "/_next/static/chunks/64372.647ee64cdb7c9a88.js": { type: "static" }, "/_next/static/chunks/64402.e8fa6ecb6a32b8fc.js": { type: "static" }, "/_next/static/chunks/64413.e74df7d6185214c7.js": { type: "static" }, "/_next/static/chunks/64563.1af0c4d5dc5fbddb.js": { type: "static" }, "/_next/static/chunks/64591.64be83ec2c3cde2d.js": { type: "static" }, "/_next/static/chunks/64611.3c46f836e2440006.js": { type: "static" }, "/_next/static/chunks/64719.afc8cb11fefd4aa3.js": { type: "static" }, "/_next/static/chunks/64776.0f61c5b9f907cb64.js": { type: "static" }, "/_next/static/chunks/64825.262e6ba5eefeca0a.js": { type: "static" }, "/_next/static/chunks/64890.51bfe3b9cd6e33d5.js": { type: "static" }, "/_next/static/chunks/64908.1609d4db1fa2116a.js": { type: "static" }, "/_next/static/chunks/64933.24a6432873a97fff.js": { type: "static" }, "/_next/static/chunks/64935.802a945f1f677c7a.js": { type: "static" }, "/_next/static/chunks/64952.fc7aeacbd703ef50.js": { type: "static" }, "/_next/static/chunks/64962.d21c69808ee83de2.js": { type: "static" }, "/_next/static/chunks/64972.f02a88a65089a0d9.js": { type: "static" }, "/_next/static/chunks/65054.f69c349dd8e95456.js": { type: "static" }, "/_next/static/chunks/65083.4cf1f86ff68772b2.js": { type: "static" }, "/_next/static/chunks/65242.12cd3ca7531ebe97.js": { type: "static" }, "/_next/static/chunks/65262.fc1a61b9f9e62e4b.js": { type: "static" }, "/_next/static/chunks/65568.b5f984d61e9572f9.js": { type: "static" }, "/_next/static/chunks/65621.1a62fc6a0a3066be.js": { type: "static" }, "/_next/static/chunks/65628.51043012212169da.js": { type: "static" }, "/_next/static/chunks/65690.7fe86ab70e8993fa.js": { type: "static" }, "/_next/static/chunks/65698.391b030fb473fcfd.js": { type: "static" }, "/_next/static/chunks/65777.712ae6e09187f131.js": { type: "static" }, "/_next/static/chunks/65781.f181b3ff2be0bd51.js": { type: "static" }, "/_next/static/chunks/65878-3fc91829e3d54e77.js": { type: "static" }, "/_next/static/chunks/66002.c05e9feaeae1b921.js": { type: "static" }, "/_next/static/chunks/66140.2be144e1bc5dc67d.js": { type: "static" }, "/_next/static/chunks/66142.25d2fb706270dc64.js": { type: "static" }, "/_next/static/chunks/6615.20ef6cc99cf68666.js": { type: "static" }, "/_next/static/chunks/66174.adb8fa3f873e1e3a.js": { type: "static" }, "/_next/static/chunks/66181.2dee33930b0f34ee.js": { type: "static" }, "/_next/static/chunks/66337.3f425d399cfbe7a9.js": { type: "static" }, "/_next/static/chunks/66344.86c37514eec59acf.js": { type: "static" }, "/_next/static/chunks/66357.b2819a9f49184c09.js": { type: "static" }, "/_next/static/chunks/66378.c9508db06792b173.js": { type: "static" }, "/_next/static/chunks/66412.58ba0913705f1eda.js": { type: "static" }, "/_next/static/chunks/66424.80386541e6212b31.js": { type: "static" }, "/_next/static/chunks/66443.6345f3c192031194.js": { type: "static" }, "/_next/static/chunks/66558.7b83ec002e059ff0.js": { type: "static" }, "/_next/static/chunks/66640.022291a3f0551392.js": { type: "static" }, "/_next/static/chunks/66673.fdbf531fa7031b7b.js": { type: "static" }, "/_next/static/chunks/66734.b79981ce239dc2ef.js": { type: "static" }, "/_next/static/chunks/66761.9f6a81cc44395489.js": { type: "static" }, "/_next/static/chunks/66889.03a2e3ce182dfb85.js": { type: "static" }, "/_next/static/chunks/66927.49f787c7f2ab7d5a.js": { type: "static" }, "/_next/static/chunks/66949.2d60d0a61397eeba.js": { type: "static" }, "/_next/static/chunks/66989.91c7ee21fbe54e6d.js": { type: "static" }, "/_next/static/chunks/6704.424f527defe5cbd6.js": { type: "static" }, "/_next/static/chunks/67193.a5abd9d9d31d3d9f.js": { type: "static" }, "/_next/static/chunks/67198.506fda3f3d8698fb.js": { type: "static" }, "/_next/static/chunks/67207.a4663f3b3da8585f.js": { type: "static" }, "/_next/static/chunks/67213.735508a5bb887512.js": { type: "static" }, "/_next/static/chunks/67215.d62a3614edcc7632.js": { type: "static" }, "/_next/static/chunks/67264.cf5207b58572a013.js": { type: "static" }, "/_next/static/chunks/67404.640e0060dea212d4.js": { type: "static" }, "/_next/static/chunks/67410.defb4d6fe7cea8a2.js": { type: "static" }, "/_next/static/chunks/67467.da35a6d63025f6a0.js": { type: "static" }, "/_next/static/chunks/67524.2599e3b863d31a0e.js": { type: "static" }, "/_next/static/chunks/67560.9b12fc163d597a70.js": { type: "static" }, "/_next/static/chunks/67561.0e31083ff35a8a4d.js": { type: "static" }, "/_next/static/chunks/6766.88580495d667450f.js": { type: "static" }, "/_next/static/chunks/67760.f863641c41d16efe.js": { type: "static" }, "/_next/static/chunks/67782.2d10285327037a34.js": { type: "static" }, "/_next/static/chunks/67794.de32c4f7d9bee594.js": { type: "static" }, "/_next/static/chunks/67815.306c4adbab0d9883.js": { type: "static" }, "/_next/static/chunks/67921.771ca25223d0ec26.js": { type: "static" }, "/_next/static/chunks/68079.b1f5753855ca86d7.js": { type: "static" }, "/_next/static/chunks/68113.fd126a67893a631a.js": { type: "static" }, "/_next/static/chunks/68160.e4554c03ba7869d2.js": { type: "static" }, "/_next/static/chunks/68173.12440c27350a5fcd.js": { type: "static" }, "/_next/static/chunks/6818.1cc3042dd66e33f0.js": { type: "static" }, "/_next/static/chunks/68222.2ba4cf746f8da2f5.js": { type: "static" }, "/_next/static/chunks/6829.96eabf14460e10da.js": { type: "static" }, "/_next/static/chunks/68292.cef0f6db14e0e9cc.js": { type: "static" }, "/_next/static/chunks/683.351b3662b57f0a90.js": { type: "static" }, "/_next/static/chunks/6842.58352d4079f639f2.js": { type: "static" }, "/_next/static/chunks/68428.296c49ef17860e43.js": { type: "static" }, "/_next/static/chunks/68520.db7d6ab71b461c3e.js": { type: "static" }, "/_next/static/chunks/68563.3a30dddb35af45ed.js": { type: "static" }, "/_next/static/chunks/68591.688a05c7cd4e0ed9.js": { type: "static" }, "/_next/static/chunks/68667.58c12fd29e36ba9c.js": { type: "static" }, "/_next/static/chunks/68680.89c79fc6fd9bb862.js": { type: "static" }, "/_next/static/chunks/68737.7c1074e7d14fbdef.js": { type: "static" }, "/_next/static/chunks/68794-c38c128b671f40db.js": { type: "static" }, "/_next/static/chunks/68872.badeb4c792de7095.js": { type: "static" }, "/_next/static/chunks/68909.ad5fe663703542ca.js": { type: "static" }, "/_next/static/chunks/68919.752f881bb353435a.js": { type: "static" }, "/_next/static/chunks/68920.ce7ae3d7d600915c.js": { type: "static" }, "/_next/static/chunks/69076.de2547a59399c363.js": { type: "static" }, "/_next/static/chunks/69217.0b7777665c7ac422.js": { type: "static" }, "/_next/static/chunks/6922.97108098fc4c595c.js": { type: "static" }, "/_next/static/chunks/69228.bb99dc28ccc7b7a4.js": { type: "static" }, "/_next/static/chunks/69246.4bf3e5e851a8e545.js": { type: "static" }, "/_next/static/chunks/69262.2a36f23cfb5bfe76.js": { type: "static" }, "/_next/static/chunks/69277.8e901525b5435911.js": { type: "static" }, "/_next/static/chunks/69317.b839ffac98174858.js": { type: "static" }, "/_next/static/chunks/69430.a011baa19129a01b.js": { type: "static" }, "/_next/static/chunks/69432.4a4ecd7a6a27e306.js": { type: "static" }, "/_next/static/chunks/69466.cf6ca7fe30747b22.js": { type: "static" }, "/_next/static/chunks/69493.897cb6527c1c8788.js": { type: "static" }, "/_next/static/chunks/69545.c6fde6c281375def.js": { type: "static" }, "/_next/static/chunks/69575.89f82e7055c99683.js": { type: "static" }, "/_next/static/chunks/69648.4b1b9f89e2617ce9.js": { type: "static" }, "/_next/static/chunks/69658.88828d484b5915f7.js": { type: "static" }, "/_next/static/chunks/69717.c5c9e8058d1d348f.js": { type: "static" }, "/_next/static/chunks/69751.64e9de7e2abb70f7.js": { type: "static" }, "/_next/static/chunks/69836.5bdd64b52d27115d.js": { type: "static" }, "/_next/static/chunks/69864.72f89542a4b582de.js": { type: "static" }, "/_next/static/chunks/69879.ee94f2479f0e1970.js": { type: "static" }, "/_next/static/chunks/69897.3417951ed67497dd.js": { type: "static" }, "/_next/static/chunks/70042.67135f793f779225.js": { type: "static" }, "/_next/static/chunks/70056.85665b7452fe7cd6.js": { type: "static" }, "/_next/static/chunks/70094.19b95c0983bad184.js": { type: "static" }, "/_next/static/chunks/70197.03d4354e0416e687.js": { type: "static" }, "/_next/static/chunks/70432.902fb5da6e65e1d4.js": { type: "static" }, "/_next/static/chunks/70525.4b189142806a8af8.js": { type: "static" }, "/_next/static/chunks/70567.d8ea3a2f5efd6528.js": { type: "static" }, "/_next/static/chunks/70765.e32ac522e1a3f8e8.js": { type: "static" }, "/_next/static/chunks/70832.8133ebfdd5fb8186.js": { type: "static" }, "/_next/static/chunks/70873.06e9ca2d085b17ef.js": { type: "static" }, "/_next/static/chunks/70881.116f194342fc5400.js": { type: "static" }, "/_next/static/chunks/70894.1987f20c4747b8d5.js": { type: "static" }, "/_next/static/chunks/70933.faa8a2e84b2bc7b1.js": { type: "static" }, "/_next/static/chunks/71040.51f1cd0f68c7c210.js": { type: "static" }, "/_next/static/chunks/71058.4c4320fc879f3a42.js": { type: "static" }, "/_next/static/chunks/71150.71c57ae994035389.js": { type: "static" }, "/_next/static/chunks/71303.d6be01f4a4b11422.js": { type: "static" }, "/_next/static/chunks/71304.a70a60f04a1c985b.js": { type: "static" }, "/_next/static/chunks/71385.96fefb6c2ce34fd9.js": { type: "static" }, "/_next/static/chunks/71422.41fa7cbdcbfbbe90.js": { type: "static" }, "/_next/static/chunks/71426.02ad7e597928bd79.js": { type: "static" }, "/_next/static/chunks/71533.b935d3efd7681b49.js": { type: "static" }, "/_next/static/chunks/71600.1ad46ccd15968663.js": { type: "static" }, "/_next/static/chunks/71613.b05893553e44f92a.js": { type: "static" }, "/_next/static/chunks/71621.532029217a50171a.js": { type: "static" }, "/_next/static/chunks/71637.04346fb909004be8.js": { type: "static" }, "/_next/static/chunks/71715.debc6c2e0075dfa3.js": { type: "static" }, "/_next/static/chunks/71720.65d30f6e0da9c921.js": { type: "static" }, "/_next/static/chunks/71761.e0aedb8a02b5972a.js": { type: "static" }, "/_next/static/chunks/71769.6c5cd7fc4fa8f3cb.js": { type: "static" }, "/_next/static/chunks/71855.779ed263765fd626.js": { type: "static" }, "/_next/static/chunks/71866.e3d52de1acc18be9.js": { type: "static" }, "/_next/static/chunks/71947.268faf964e6c9d74.js": { type: "static" }, "/_next/static/chunks/72009.f097b4f540bacdf1.js": { type: "static" }, "/_next/static/chunks/72032.031891c9d4686cb0.js": { type: "static" }, "/_next/static/chunks/72048.fe4509e3a2129f28.js": { type: "static" }, "/_next/static/chunks/72051.1b21a25615681f48.js": { type: "static" }, "/_next/static/chunks/72160.8f4ee3635c3f1d12.js": { type: "static" }, "/_next/static/chunks/72227.8806589b8a928dd5.js": { type: "static" }, "/_next/static/chunks/72458.47e93323de5d082c.js": { type: "static" }, "/_next/static/chunks/72470.0b53d3761b7326a4.js": { type: "static" }, "/_next/static/chunks/72548.4dc3f4eff180acdb.js": { type: "static" }, "/_next/static/chunks/72580.84130305b9992611.js": { type: "static" }, "/_next/static/chunks/72583.135169e73f985376.js": { type: "static" }, "/_next/static/chunks/72613.60fffe7af901d739.js": { type: "static" }, "/_next/static/chunks/72665.67d496a1a4b0abe3.js": { type: "static" }, "/_next/static/chunks/72699.64477d6c4c97775c.js": { type: "static" }, "/_next/static/chunks/72943.f29695477cd6884a.js": { type: "static" }, "/_next/static/chunks/72972-bd63b10f629476a8.js": { type: "static" }, "/_next/static/chunks/73041.f90514767ce98d0b.js": { type: "static" }, "/_next/static/chunks/73043.c67f30e93fe21e44.js": { type: "static" }, "/_next/static/chunks/73100.9c40789e08994c44.js": { type: "static" }, "/_next/static/chunks/73198.094836e31467d354.js": { type: "static" }, "/_next/static/chunks/73216.9d0b2850eee82220.js": { type: "static" }, "/_next/static/chunks/73247.af7577ec5afb905d.js": { type: "static" }, "/_next/static/chunks/7325.dc060b56798b1163.js": { type: "static" }, "/_next/static/chunks/73362.5d8f1ccdc11e603c.js": { type: "static" }, "/_next/static/chunks/73434.a9ee962afa04b407.js": { type: "static" }, "/_next/static/chunks/73520.d3f41b084486581d.js": { type: "static" }, "/_next/static/chunks/73559.487059eefb9a7a81.js": { type: "static" }, "/_next/static/chunks/73618.1c9958515fa67d4f.js": { type: "static" }, "/_next/static/chunks/73644.307fc4a1fe5568d0.js": { type: "static" }, "/_next/static/chunks/73718.194e95ff75965b6e.js": { type: "static" }, "/_next/static/chunks/73828.ced72a0a94ce8b79.js": { type: "static" }, "/_next/static/chunks/73888.c0647c3a32b42d4a.js": { type: "static" }, "/_next/static/chunks/73940.2dea1ebfd39891ad.js": { type: "static" }, "/_next/static/chunks/74002.784dac362af776ac.js": { type: "static" }, "/_next/static/chunks/74166.aa341d3d7adcd953.js": { type: "static" }, "/_next/static/chunks/74168.25e8ef49b763c754.js": { type: "static" }, "/_next/static/chunks/7438.6a5483500d900d96.js": { type: "static" }, "/_next/static/chunks/74394.576236a4987883e6.js": { type: "static" }, "/_next/static/chunks/74440.f41367ef3f756341.js": { type: "static" }, "/_next/static/chunks/74448.d5bbad40be55cd7a.js": { type: "static" }, "/_next/static/chunks/7449.b9f7a2219b53c3e0.js": { type: "static" }, "/_next/static/chunks/74509.8c7ce0d0a43496a9.js": { type: "static" }, "/_next/static/chunks/74514.9aaacf7937c4b4f6.js": { type: "static" }, "/_next/static/chunks/74550.2b5aec4ba4ad4b81.js": { type: "static" }, "/_next/static/chunks/74568.69704e7a5714900f.js": { type: "static" }, "/_next/static/chunks/74656.4929ecd7e89f75cb.js": { type: "static" }, "/_next/static/chunks/74697.d70d54e2f4d8d414.js": { type: "static" }, "/_next/static/chunks/74747.b1adf50c3f92bf45.js": { type: "static" }, "/_next/static/chunks/74767.cd708d3efc38ae63.js": { type: "static" }, "/_next/static/chunks/74851.5d9b9657410bd2f6.js": { type: "static" }, "/_next/static/chunks/74863.e03e23dd4395fd5b.js": { type: "static" }, "/_next/static/chunks/74935.f4accc468beedb52.js": { type: "static" }, "/_next/static/chunks/74940.13201500ff1c75f5.js": { type: "static" }, "/_next/static/chunks/74994.b1da5ede1b12588d.js": { type: "static" }, "/_next/static/chunks/75001.895f598a30dfb895.js": { type: "static" }, "/_next/static/chunks/75135.74496de3656b9280.js": { type: "static" }, "/_next/static/chunks/75177.bdb917e58aff10e3.js": { type: "static" }, "/_next/static/chunks/75237.6471f3423d5f7e83.js": { type: "static" }, "/_next/static/chunks/75251.4ca2eeeb1b046c63.js": { type: "static" }, "/_next/static/chunks/75255.65b2669c9f9bcd02.js": { type: "static" }, "/_next/static/chunks/75277.ed7573735dc702cf.js": { type: "static" }, "/_next/static/chunks/75368.52afe2f877e7c7d0.js": { type: "static" }, "/_next/static/chunks/75376.9b3fa31685c6edbe.js": { type: "static" }, "/_next/static/chunks/75395.97e4531a42b3384c.js": { type: "static" }, "/_next/static/chunks/75719.6aec285b4916c1be.js": { type: "static" }, "/_next/static/chunks/75745.74d66dbea559198b.js": { type: "static" }, "/_next/static/chunks/75759.56140f7f99e460dc.js": { type: "static" }, "/_next/static/chunks/75808.251510aa5c120b53.js": { type: "static" }, "/_next/static/chunks/75821.9ccbfe3e5519a49e.js": { type: "static" }, "/_next/static/chunks/75832.a706026305b40a7d.js": { type: "static" }, "/_next/static/chunks/7586.721e9afa8d99c2a2.js": { type: "static" }, "/_next/static/chunks/75965.887c212713277337.js": { type: "static" }, "/_next/static/chunks/76087.2ea1714abe03e0a6.js": { type: "static" }, "/_next/static/chunks/76194.d9dff34e2f970849.js": { type: "static" }, "/_next/static/chunks/7626.d9b1540fb0b651f1.js": { type: "static" }, "/_next/static/chunks/76284.52bee1b3eb34c43b.js": { type: "static" }, "/_next/static/chunks/76357.944588e7be662a1b.js": { type: "static" }, "/_next/static/chunks/7636.08b64ee2cf070e3d.js": { type: "static" }, "/_next/static/chunks/76372.4f166b3ffa20a7b5.js": { type: "static" }, "/_next/static/chunks/76379.fde3e296333eb4b6.js": { type: "static" }, "/_next/static/chunks/76399.d08d28136bcbaeac.js": { type: "static" }, "/_next/static/chunks/76406.6efaaa8cde156c17.js": { type: "static" }, "/_next/static/chunks/76441.5b927afa5201d697.js": { type: "static" }, "/_next/static/chunks/76534.3dd5fd2641379a05.js": { type: "static" }, "/_next/static/chunks/76548.f44e7bd02a8bc8df.js": { type: "static" }, "/_next/static/chunks/7656.44934a5b37627b71.js": { type: "static" }, "/_next/static/chunks/76627.de5335ce35dfc8c1.js": { type: "static" }, "/_next/static/chunks/76672.a76447dcec092c82.js": { type: "static" }, "/_next/static/chunks/76679.c00c66d48c04ebeb.js": { type: "static" }, "/_next/static/chunks/76765.2b563aeac0abd454.js": { type: "static" }, "/_next/static/chunks/7679.fc4aff38828cce4d.js": { type: "static" }, "/_next/static/chunks/76858.e8a77d628f123dfd.js": { type: "static" }, "/_next/static/chunks/76865.22f0a212ef08e8c0.js": { type: "static" }, "/_next/static/chunks/76980.355fd65cceae6234.js": { type: "static" }, "/_next/static/chunks/77139.47f827232972f878.js": { type: "static" }, "/_next/static/chunks/77226.f78e99159ab1d77c.js": { type: "static" }, "/_next/static/chunks/77227.64cd0754e784f011.js": { type: "static" }, "/_next/static/chunks/77259.540eac5b6818f973.js": { type: "static" }, "/_next/static/chunks/77265.448b1df054dd4c6c.js": { type: "static" }, "/_next/static/chunks/77307.d9bf844a98cf95ae.js": { type: "static" }, "/_next/static/chunks/77389.9596e76c56bc2144.js": { type: "static" }, "/_next/static/chunks/77439.1c43b3b36d465ba9.js": { type: "static" }, "/_next/static/chunks/77440.e22cd373134b14df.js": { type: "static" }, "/_next/static/chunks/77566.8ea761fef47d7371.js": { type: "static" }, "/_next/static/chunks/77576.6e56d49707b07af4.js": { type: "static" }, "/_next/static/chunks/77733.ff49bf3bbc76d2c6.js": { type: "static" }, "/_next/static/chunks/7775.ab63c683e40baf56.js": { type: "static" }, "/_next/static/chunks/77757.55c0f035f597ce1b.js": { type: "static" }, "/_next/static/chunks/77773.27233ab1dd34da41.js": { type: "static" }, "/_next/static/chunks/77780.7e6969e4303f7fe3.js": { type: "static" }, "/_next/static/chunks/77838.11b7d55a2a39ef39.js": { type: "static" }, "/_next/static/chunks/77877.4fc17f1e3ab0f968.js": { type: "static" }, "/_next/static/chunks/77945.5ff0977629cc8e7c.js": { type: "static" }, "/_next/static/chunks/78018.5527bcf2426c72a6.js": { type: "static" }, "/_next/static/chunks/78067.99d2ace103a5a298.js": { type: "static" }, "/_next/static/chunks/7814.3aad7220592bf0c7.js": { type: "static" }, "/_next/static/chunks/78146.270c2943fafa1216.js": { type: "static" }, "/_next/static/chunks/78406.e229787de0c25e0c.js": { type: "static" }, "/_next/static/chunks/78494.86acaf89d8c7c5d7.js": { type: "static" }, "/_next/static/chunks/78509.5503c2c88308322b.js": { type: "static" }, "/_next/static/chunks/78521.52c76d5bd84e3582.js": { type: "static" }, "/_next/static/chunks/78604.f6fc7d9363d3225b.js": { type: "static" }, "/_next/static/chunks/78628.29ba49007ddb1837.js": { type: "static" }, "/_next/static/chunks/78867.e0ba6168a494409e.js": { type: "static" }, "/_next/static/chunks/79001.5cfa2f33fd705eee.js": { type: "static" }, "/_next/static/chunks/79022.c0cf537a1ddb9577.js": { type: "static" }, "/_next/static/chunks/79141.a9936e3803fa696c.js": { type: "static" }, "/_next/static/chunks/792.426ae57e50554314.js": { type: "static" }, "/_next/static/chunks/79219.c215e49150c31074.js": { type: "static" }, "/_next/static/chunks/79242.ce6b1adfafad9826.js": { type: "static" }, "/_next/static/chunks/7928.1aea6e77fa18b53b.js": { type: "static" }, "/_next/static/chunks/79313.b5bc0feaabdf2acb.js": { type: "static" }, "/_next/static/chunks/79333.5ea615112c17af19.js": { type: "static" }, "/_next/static/chunks/79380.e32639e187dc9318.js": { type: "static" }, "/_next/static/chunks/794.3a317335dda093bb.js": { type: "static" }, "/_next/static/chunks/79472.627301253efa5149.js": { type: "static" }, "/_next/static/chunks/79528.440176eaf6574412.js": { type: "static" }, "/_next/static/chunks/79548.9bb4c5b16ebbc34c.js": { type: "static" }, "/_next/static/chunks/79574.d9c57957ce8159c2.js": { type: "static" }, "/_next/static/chunks/79862.affc7275154ecbbc.js": { type: "static" }, "/_next/static/chunks/79863.a2b396740f406c60.js": { type: "static" }, "/_next/static/chunks/79982.cb871cadf8293adb.js": { type: "static" }, "/_next/static/chunks/80201.cdc478a862acf338.js": { type: "static" }, "/_next/static/chunks/80221.a8464ea851417631.js": { type: "static" }, "/_next/static/chunks/80486.a1753455d0e57e2b.js": { type: "static" }, "/_next/static/chunks/80512.8597eff227e27a55.js": { type: "static" }, "/_next/static/chunks/80638.68d44a466625b784.js": { type: "static" }, "/_next/static/chunks/80695.17e30a2f88b4caf4.js": { type: "static" }, "/_next/static/chunks/807.8511540d9d5aa19e.js": { type: "static" }, "/_next/static/chunks/80732.6d28e23b3b0107e9.js": { type: "static" }, "/_next/static/chunks/80754.2e738eed0c67c833.js": { type: "static" }, "/_next/static/chunks/8076.e16ea6be39024bcc.js": { type: "static" }, "/_next/static/chunks/80804.a50dbef7f783df04.js": { type: "static" }, "/_next/static/chunks/80859.951f1f44d7bff022.js": { type: "static" }, "/_next/static/chunks/8088.26013b579cc17970.js": { type: "static" }, "/_next/static/chunks/80974.0ec08c4e4368576a.js": { type: "static" }, "/_next/static/chunks/81014.e33b2e240a9bc37b.js": { type: "static" }, "/_next/static/chunks/81083.d2169b726296c67e.js": { type: "static" }, "/_next/static/chunks/81197.ba0ef99f7d972ae0.js": { type: "static" }, "/_next/static/chunks/81244.33c4ae642840108f.js": { type: "static" }, "/_next/static/chunks/81328.ea3492369403f397.js": { type: "static" }, "/_next/static/chunks/81395.9be731b730cf84ed.js": { type: "static" }, "/_next/static/chunks/81426.348e324afe4c3189.js": { type: "static" }, "/_next/static/chunks/81540.2e4e5c96d4f19498.js": { type: "static" }, "/_next/static/chunks/81555.99fdf2ebac908d7f.js": { type: "static" }, "/_next/static/chunks/81596.9200b82ea87d60ad.js": { type: "static" }, "/_next/static/chunks/81625.b5bf5cdb4e7fe795.js": { type: "static" }, "/_next/static/chunks/81684.28f4474d7c4e2c99.js": { type: "static" }, "/_next/static/chunks/81706.4220ba0af4b651f5.js": { type: "static" }, "/_next/static/chunks/81895.06def45ad502f1ce.js": { type: "static" }, "/_next/static/chunks/81918.82f0f72b65d76087.js": { type: "static" }, "/_next/static/chunks/8198.7a999a1a9a60ed93.js": { type: "static" }, "/_next/static/chunks/82023.d181c1b7a0f2a4aa.js": { type: "static" }, "/_next/static/chunks/82026.a8fce7fbb0b85fe8.js": { type: "static" }, "/_next/static/chunks/82029.952d8560425c5de6.js": { type: "static" }, "/_next/static/chunks/82058.551ff8b7ef38dd56.js": { type: "static" }, "/_next/static/chunks/82068.0920df709ca2022f.js": { type: "static" }, "/_next/static/chunks/82091.3189ed1fda613101.js": { type: "static" }, "/_next/static/chunks/82128.fde42c7f14088801.js": { type: "static" }, "/_next/static/chunks/82222.0fde4ad445136585.js": { type: "static" }, "/_next/static/chunks/82242.e3381cebd0198c7a.js": { type: "static" }, "/_next/static/chunks/82280.9b9bfdf6e2954594.js": { type: "static" }, "/_next/static/chunks/82284.ac9eb36413ba82aa.js": { type: "static" }, "/_next/static/chunks/82431.1be26ef9566535ad.js": { type: "static" }, "/_next/static/chunks/82537.09a08429603e38e3.js": { type: "static" }, "/_next/static/chunks/82716.494c495613538457.js": { type: "static" }, "/_next/static/chunks/82718.804adf86cca1eace.js": { type: "static" }, "/_next/static/chunks/82755.aa865a308cb63596.js": { type: "static" }, "/_next/static/chunks/82800.c6a6d002a2f8a67a.js": { type: "static" }, "/_next/static/chunks/83028.fd72d325b4631012.js": { type: "static" }, "/_next/static/chunks/83084.708dea023a3369e3.js": { type: "static" }, "/_next/static/chunks/83171.5ccc0be9589a8918.js": { type: "static" }, "/_next/static/chunks/83189.f6f63f38ea815b9d.js": { type: "static" }, "/_next/static/chunks/83190.89e14fad26c9b9f5.js": { type: "static" }, "/_next/static/chunks/83229.6a64b7359dcdc366.js": { type: "static" }, "/_next/static/chunks/83392.2365f9b499a5eb9c.js": { type: "static" }, "/_next/static/chunks/83454.fa65039e1561b5ed.js": { type: "static" }, "/_next/static/chunks/83575.fd8142e1495d50ec.js": { type: "static" }, "/_next/static/chunks/83578.a17dbb3808284ff8.js": { type: "static" }, "/_next/static/chunks/83774.e849e87007943403.js": { type: "static" }, "/_next/static/chunks/83787.c6d76f3058bd0059.js": { type: "static" }, "/_next/static/chunks/83814.9486f01bf769bea5.js": { type: "static" }, "/_next/static/chunks/83922.0216d5928bfbc2e1.js": { type: "static" }, "/_next/static/chunks/83926.e53cf8a8bf6715da.js": { type: "static" }, "/_next/static/chunks/83959.7e1cbd52f3d84aa6.js": { type: "static" }, "/_next/static/chunks/83994.c8072341e464bef1.js": { type: "static" }, "/_next/static/chunks/84046.630447666c64b940.js": { type: "static" }, "/_next/static/chunks/84203.a3ac93e46f1e6c65.js": { type: "static" }, "/_next/static/chunks/84241.0731102d6447b73e.js": { type: "static" }, "/_next/static/chunks/84286.a8a5500f1706f4b3.js": { type: "static" }, "/_next/static/chunks/84329.44ff0e09d8a1d75b.js": { type: "static" }, "/_next/static/chunks/84428.78b5c7f9c45134a4.js": { type: "static" }, "/_next/static/chunks/84436.2d7ec6e182d471a7.js": { type: "static" }, "/_next/static/chunks/84502.b32280c0b3754be7.js": { type: "static" }, "/_next/static/chunks/84519.a087569d7da4a516.js": { type: "static" }, "/_next/static/chunks/84528.5ded1e9fe76211ab.js": { type: "static" }, "/_next/static/chunks/84532.32106544bffbe300.js": { type: "static" }, "/_next/static/chunks/84661.cf6e647a665e7c33.js": { type: "static" }, "/_next/static/chunks/8477.1db2c73c19fc6386.js": { type: "static" }, "/_next/static/chunks/84790.bc0f346999218564.js": { type: "static" }, "/_next/static/chunks/84799.2c8ab08176e9f2df.js": { type: "static" }, "/_next/static/chunks/84900.f4d329295538f43a.js": { type: "static" }, "/_next/static/chunks/84957.99cb34c28d8b9df6.js": { type: "static" }, "/_next/static/chunks/85004.e9e920e834da77f3.js": { type: "static" }, "/_next/static/chunks/85131.2f0df05fb1674726.js": { type: "static" }, "/_next/static/chunks/8522.de2e963ce7577b4c.js": { type: "static" }, "/_next/static/chunks/85317.f1c5b19f9e50fdea.js": { type: "static" }, "/_next/static/chunks/85465.15149b8a564c495f.js": { type: "static" }, "/_next/static/chunks/85516.93b5dc88513f95b8.js": { type: "static" }, "/_next/static/chunks/85573.03444be439b54239.js": { type: "static" }, "/_next/static/chunks/85673.99913618bdcdcb99.js": { type: "static" }, "/_next/static/chunks/8569.3a8ca32d7d2a0746.js": { type: "static" }, "/_next/static/chunks/85698.7693d21d56ffcd92.js": { type: "static" }, "/_next/static/chunks/85808.ed79cb44944b3ebe.js": { type: "static" }, "/_next/static/chunks/85842.c6246a009f874a42.js": { type: "static" }, "/_next/static/chunks/85870.5cceafead7908a25.js": { type: "static" }, "/_next/static/chunks/85929.70d647fce41fdf51.js": { type: "static" }, "/_next/static/chunks/85954.642824aea89a90c8.js": { type: "static" }, "/_next/static/chunks/85979.a41b772745986dc0.js": { type: "static" }, "/_next/static/chunks/85981.3130726b4f91f837.js": { type: "static" }, "/_next/static/chunks/8606.e36d38ba71d6c31f.js": { type: "static" }, "/_next/static/chunks/86084.da72efc98a2f0ecb.js": { type: "static" }, "/_next/static/chunks/86171.7730722b3de8fe9b.js": { type: "static" }, "/_next/static/chunks/86215.5dd3bc2849cc2200.js": { type: "static" }, "/_next/static/chunks/86219.9374a6c4d175f279.js": { type: "static" }, "/_next/static/chunks/86325.162f6919cd8d829b.js": { type: "static" }, "/_next/static/chunks/86345.9de98249cbd84238.js": { type: "static" }, "/_next/static/chunks/86404.7ea57a27fb5291d5.js": { type: "static" }, "/_next/static/chunks/86479.9406a72dbe6e960a.js": { type: "static" }, "/_next/static/chunks/86547.64d0fefb59b7dfcb.js": { type: "static" }, "/_next/static/chunks/86563.fa8a1870417f15e9.js": { type: "static" }, "/_next/static/chunks/86595.189bc8c5fe7c60ae.js": { type: "static" }, "/_next/static/chunks/86658.2886fdcf0f47bc0d.js": { type: "static" }, "/_next/static/chunks/86877.6ee768e21e4923e0.js": { type: "static" }, "/_next/static/chunks/86900.e569a11ad757cf5e.js": { type: "static" }, "/_next/static/chunks/86914.37192ac9046d33ec.js": { type: "static" }, "/_next/static/chunks/86966.1e3d685f3d83674c.js": { type: "static" }, "/_next/static/chunks/87117.74d2201b6ff51f2b.js": { type: "static" }, "/_next/static/chunks/87133.c68f4e9a7bab31c2.js": { type: "static" }, "/_next/static/chunks/87408.38c989d9a4398ec4.js": { type: "static" }, "/_next/static/chunks/87414.4f6d7ef24247179e.js": { type: "static" }, "/_next/static/chunks/87478.344977357b261ff5.js": { type: "static" }, "/_next/static/chunks/87511.7f496d545e694f15.js": { type: "static" }, "/_next/static/chunks/87537.bd5c046fad386b25.js": { type: "static" }, "/_next/static/chunks/87604.dd543c9fc94dda83.js": { type: "static" }, "/_next/static/chunks/87633.75b9302a2bab20ca.js": { type: "static" }, "/_next/static/chunks/87712.fb67432e2d195bd3.js": { type: "static" }, "/_next/static/chunks/87769.fd302290f1d897fd.js": { type: "static" }, "/_next/static/chunks/8786.df5337bc4dd9c1c7.js": { type: "static" }, "/_next/static/chunks/87887.7ca6fde9538710fc.js": { type: "static" }, "/_next/static/chunks/87990.7dce7a9abcb972fc.js": { type: "static" }, "/_next/static/chunks/88033.c2ad02dba85042f6.js": { type: "static" }, "/_next/static/chunks/88156.e523ec96684a5384.js": { type: "static" }, "/_next/static/chunks/88178.18253fd36880590c.js": { type: "static" }, "/_next/static/chunks/88226.82f59ed55c0de6eb.js": { type: "static" }, "/_next/static/chunks/88318.9975ecee64e82bc6.js": { type: "static" }, "/_next/static/chunks/88336.a7eff2d956c11294.js": { type: "static" }, "/_next/static/chunks/88484.87c918bf28a1b7d3.js": { type: "static" }, "/_next/static/chunks/88501.fbe9f33c9d52082f.js": { type: "static" }, "/_next/static/chunks/88522.c1aee4af28bc9fb5.js": { type: "static" }, "/_next/static/chunks/88549.f5487408d95c37ca.js": { type: "static" }, "/_next/static/chunks/88623.1385a4e92f4a5a3e.js": { type: "static" }, "/_next/static/chunks/88693.d50b3f2486c2d729.js": { type: "static" }, "/_next/static/chunks/88776.7fdc814d47b06483.js": { type: "static" }, "/_next/static/chunks/88814.db8deb9258629913.js": { type: "static" }, "/_next/static/chunks/88893.c7bf86c5a5be7478.js": { type: "static" }, "/_next/static/chunks/88906.d551b2a36e524fbd.js": { type: "static" }, "/_next/static/chunks/88944.fc6ed26ed939638b.js": { type: "static" }, "/_next/static/chunks/88964.cff2b4fd79be4739.js": { type: "static" }, "/_next/static/chunks/88978.154cbf5054771b9a.js": { type: "static" }, "/_next/static/chunks/88997.5d533daf8e9fb596.js": { type: "static" }, "/_next/static/chunks/89102.935d621338b060f5.js": { type: "static" }, "/_next/static/chunks/89227.309fef99b3aa498f.js": { type: "static" }, "/_next/static/chunks/89291.b8b4594bb6481d40.js": { type: "static" }, "/_next/static/chunks/89337.d2390f4fb417bc5c.js": { type: "static" }, "/_next/static/chunks/89345.bd4884c0aa74461a.js": { type: "static" }, "/_next/static/chunks/89391.be7cfd54dfeb9b35.js": { type: "static" }, "/_next/static/chunks/89547.75bcfbc5d2cea77b.js": { type: "static" }, "/_next/static/chunks/89552.5585a5f5f7d8f4bb.js": { type: "static" }, "/_next/static/chunks/89573.98f6281f564e5b02.js": { type: "static" }, "/_next/static/chunks/89602.f1330a7fbdaf703a.js": { type: "static" }, "/_next/static/chunks/89688.adab468552ce40ad.js": { type: "static" }, "/_next/static/chunks/89713.7cbfd52551a4de08.js": { type: "static" }, "/_next/static/chunks/89726.7b2753328329eeea.js": { type: "static" }, "/_next/static/chunks/89806.626ecb9fa9b549e3.js": { type: "static" }, "/_next/static/chunks/89865.d7539ae435dc0f86.js": { type: "static" }, "/_next/static/chunks/89883.0848f9988aeb3e4f.js": { type: "static" }, "/_next/static/chunks/89925.ffd454db7964bbbc.js": { type: "static" }, "/_next/static/chunks/90072.db7dbdb957061029.js": { type: "static" }, "/_next/static/chunks/90100.5da2c93f25f1fc6a.js": { type: "static" }, "/_next/static/chunks/9011.2fe60a4a6bee322b.js": { type: "static" }, "/_next/static/chunks/90132.9d9714eae41cefb9.js": { type: "static" }, "/_next/static/chunks/9015.bb8513bec9895a80.js": { type: "static" }, "/_next/static/chunks/90245.8b6d2e7c32aebf59.js": { type: "static" }, "/_next/static/chunks/9037.3e0592d363374d1b.js": { type: "static" }, "/_next/static/chunks/90510.aab9a67cc8cc24b2.js": { type: "static" }, "/_next/static/chunks/90637.967b0f7bd7f53f8e.js": { type: "static" }, "/_next/static/chunks/90640.f2619683f5857863.js": { type: "static" }, "/_next/static/chunks/90687.89f510a8f9280c5b.js": { type: "static" }, "/_next/static/chunks/90740.ae220c6640241454.js": { type: "static" }, "/_next/static/chunks/90830.b334726fb6a7e11c.js": { type: "static" }, "/_next/static/chunks/90858.59c5daa4d32ec6bb.js": { type: "static" }, "/_next/static/chunks/90862.29f72b56ca0e1ff7.js": { type: "static" }, "/_next/static/chunks/9089.37bf1d8943a2364c.js": { type: "static" }, "/_next/static/chunks/90927.7c1ff6c33964222f.js": { type: "static" }, "/_next/static/chunks/90931.b4cc3c886573ed9a.js": { type: "static" }, "/_next/static/chunks/90945.3e4467e32112c23b.js": { type: "static" }, "/_next/static/chunks/90997.f07aa7dcb77599d2.js": { type: "static" }, "/_next/static/chunks/91110.6f9483350639e335.js": { type: "static" }, "/_next/static/chunks/91122.d5882e34a9370b91.js": { type: "static" }, "/_next/static/chunks/91128.12d4647d9fc187bc.js": { type: "static" }, "/_next/static/chunks/91219.38614ab8b8f75305.js": { type: "static" }, "/_next/static/chunks/91239.f48f4f3cc67d61e7.js": { type: "static" }, "/_next/static/chunks/91283.3b00ef19a173272e.js": { type: "static" }, "/_next/static/chunks/91289.ff14269993f6a3a5.js": { type: "static" }, "/_next/static/chunks/91317.bd685e695e8d1b88.js": { type: "static" }, "/_next/static/chunks/91331.21dc870f49761cce.js": { type: "static" }, "/_next/static/chunks/91484.b9165c43950096bc.js": { type: "static" }, "/_next/static/chunks/91663.86c6b63f0e082cc0.js": { type: "static" }, "/_next/static/chunks/91680.e53d2363667bdda9.js": { type: "static" }, "/_next/static/chunks/91723.5e8696212fc3369b.js": { type: "static" }, "/_next/static/chunks/91790.e24180b71001378f.js": { type: "static" }, "/_next/static/chunks/91804.53fc8edc6092a141.js": { type: "static" }, "/_next/static/chunks/91818.cb0ba7cbf3dcbee8.js": { type: "static" }, "/_next/static/chunks/91849.c4d76fad705149d7.js": { type: "static" }, "/_next/static/chunks/91879.c12398815c638e27.js": { type: "static" }, "/_next/static/chunks/91903.829b9d8a4be2214f.js": { type: "static" }, "/_next/static/chunks/91927.950f5c7034854a5d.js": { type: "static" }, "/_next/static/chunks/92071.172ef03771e817ab.js": { type: "static" }, "/_next/static/chunks/9217.239fae3d866a6ada.js": { type: "static" }, "/_next/static/chunks/92261.a43d2f1b57817e8f.js": { type: "static" }, "/_next/static/chunks/92369.94e4fa3a4621f672.js": { type: "static" }, "/_next/static/chunks/92438.e877f45182a7322c.js": { type: "static" }, "/_next/static/chunks/92451.7d90e14cc8ef8625.js": { type: "static" }, "/_next/static/chunks/92559.1ea03e5453969739.js": { type: "static" }, "/_next/static/chunks/92705.fa696a5ff3b2f259.js": { type: "static" }, "/_next/static/chunks/92735.c9b56dd824fa14b6.js": { type: "static" }, "/_next/static/chunks/92761.bffdcc4cea300d53.js": { type: "static" }, "/_next/static/chunks/92934.4756fc35828c186e.js": { type: "static" }, "/_next/static/chunks/92987.ad0b977ebd5bec96.js": { type: "static" }, "/_next/static/chunks/93022.0cd658fc8263d373.js": { type: "static" }, "/_next/static/chunks/93065.c754e92cfafca60a.js": { type: "static" }, "/_next/static/chunks/93320.04c4065a2ed6fb44.js": { type: "static" }, "/_next/static/chunks/9334.991faab86a4dc5f8.js": { type: "static" }, "/_next/static/chunks/9343.64e14dd6e196f688.js": { type: "static" }, "/_next/static/chunks/93609.33ffe5e37ba39930.js": { type: "static" }, "/_next/static/chunks/93618.24bbba3fc58928aa.js": { type: "static" }, "/_next/static/chunks/93634.dd6925cbd1cbec8b.js": { type: "static" }, "/_next/static/chunks/93654.eecb7a2d82e943b5.js": { type: "static" }, "/_next/static/chunks/93659.0176cf761e0f46d5.js": { type: "static" }, "/_next/static/chunks/93728.010b85e387155736.js": { type: "static" }, "/_next/static/chunks/93807.6f923e26aa6baeac.js": { type: "static" }, "/_next/static/chunks/93861.42cb58633fa6df45.js": { type: "static" }, "/_next/static/chunks/93947.c927480f00bf4a2b.js": { type: "static" }, "/_next/static/chunks/94033.bc2ed0c54675d984.js": { type: "static" }, "/_next/static/chunks/94191.f102096ce0a0429e.js": { type: "static" }, "/_next/static/chunks/94283.6a063e7ca5f0d8f4.js": { type: "static" }, "/_next/static/chunks/94394.34334de9c42221ba.js": { type: "static" }, "/_next/static/chunks/94433.c871cd3173a63141.js": { type: "static" }, "/_next/static/chunks/94607.aa5f7d856b2672be.js": { type: "static" }, "/_next/static/chunks/94677.f7ddc263cf2bee82.js": { type: "static" }, "/_next/static/chunks/94766.42bee7c0fa45e448.js": { type: "static" }, "/_next/static/chunks/9477.475950619889e8a0.js": { type: "static" }, "/_next/static/chunks/94942.62825741ee4a51ce.js": { type: "static" }, "/_next/static/chunks/94996.cad64398622e1faa.js": { type: "static" }, "/_next/static/chunks/95063.2288f8aea8e5db15.js": { type: "static" }, "/_next/static/chunks/95080.a71e0b98f4a987d2.js": { type: "static" }, "/_next/static/chunks/95115.c0352b80d15d19f8.js": { type: "static" }, "/_next/static/chunks/95149.98eef004991f88cc.js": { type: "static" }, "/_next/static/chunks/95252.6d747b98cbcae1fa.js": { type: "static" }, "/_next/static/chunks/95290.ab07eae2cd8da56f.js": { type: "static" }, "/_next/static/chunks/95337.4a9c608f0292a698.js": { type: "static" }, "/_next/static/chunks/95349.36fbab6b4724afe2.js": { type: "static" }, "/_next/static/chunks/95383.c62f491c86efd734.js": { type: "static" }, "/_next/static/chunks/95452.45f9728ce2bd5b9e.js": { type: "static" }, "/_next/static/chunks/95468.9df27aea0511c9b2.js": { type: "static" }, "/_next/static/chunks/95482.ca9dda2e8e67705c.js": { type: "static" }, "/_next/static/chunks/95525.92ea7c5d1cd76239.js": { type: "static" }, "/_next/static/chunks/95559.acea08291d2ee698.js": { type: "static" }, "/_next/static/chunks/95590.faa4627ccae45472.js": { type: "static" }, "/_next/static/chunks/95747.2053f57a27629311.js": { type: "static" }, "/_next/static/chunks/95796.1dfd115f08f3d44f.js": { type: "static" }, "/_next/static/chunks/95805.d30dc038218e43be.js": { type: "static" }, "/_next/static/chunks/95993.8aad76275a051b6f.js": { type: "static" }, "/_next/static/chunks/96003.cbed523ba7117741.js": { type: "static" }, "/_next/static/chunks/96137.2bcaddf23c94e05c.js": { type: "static" }, "/_next/static/chunks/96177.2940ea55de9596fa.js": { type: "static" }, "/_next/static/chunks/96215.ed797a501251a709.js": { type: "static" }, "/_next/static/chunks/96224.20a1197c18daf75f.js": { type: "static" }, "/_next/static/chunks/96362.3bb66323d5ec737c.js": { type: "static" }, "/_next/static/chunks/9646.cfc9e9ffc085bdb4.js": { type: "static" }, "/_next/static/chunks/96492.6428f407b6b16ce4.js": { type: "static" }, "/_next/static/chunks/96528.34d33f608e3ff2f9.js": { type: "static" }, "/_next/static/chunks/96650.3d574eb71297c2eb.js": { type: "static" }, "/_next/static/chunks/96706.dc6efe6e0c5c1698.js": { type: "static" }, "/_next/static/chunks/96797.35732806b06c6ad7.js": { type: "static" }, "/_next/static/chunks/96841.c06a83dbe31ff3d4.js": { type: "static" }, "/_next/static/chunks/96897.2a3740c401764ecb.js": { type: "static" }, "/_next/static/chunks/96900.5b7e98d37bf45cf7.js": { type: "static" }, "/_next/static/chunks/97089.5edf2dfa659275ac.js": { type: "static" }, "/_next/static/chunks/97097.f89a0298f1d14481.js": { type: "static" }, "/_next/static/chunks/97143.dff008a7a72c157d.js": { type: "static" }, "/_next/static/chunks/97203.7fb8286b3b361a17.js": { type: "static" }, "/_next/static/chunks/97226.9ec57669bd05e2c6.js": { type: "static" }, "/_next/static/chunks/97373.c07ba371ce77a409.js": { type: "static" }, "/_next/static/chunks/97411.908d96921953064f.js": { type: "static" }, "/_next/static/chunks/97609.246102acd1f43bae.js": { type: "static" }, "/_next/static/chunks/97649.e089dde87cc48453.js": { type: "static" }, "/_next/static/chunks/97685.a990a8be4da64f4d.js": { type: "static" }, "/_next/static/chunks/97758.89b870cbfe78dd2a.js": { type: "static" }, "/_next/static/chunks/97778.2944788d4438a3e6.js": { type: "static" }, "/_next/static/chunks/97869.12afe8ae88b67633.js": { type: "static" }, "/_next/static/chunks/97910.f8b2e0ab3dc75065.js": { type: "static" }, "/_next/static/chunks/97920.230c5c5da557442b.js": { type: "static" }, "/_next/static/chunks/98015.86b444379ddab36f.js": { type: "static" }, "/_next/static/chunks/98033.26daf562c899faef.js": { type: "static" }, "/_next/static/chunks/98085.882d004f727434ed.js": { type: "static" }, "/_next/static/chunks/98245.ee0b05b708493b99.js": { type: "static" }, "/_next/static/chunks/98302.74d76d29aa4a2ef8.js": { type: "static" }, "/_next/static/chunks/98335.f2c1d52af496b2fe.js": { type: "static" }, "/_next/static/chunks/98373.d45ffd0f5f95a3aa.js": { type: "static" }, "/_next/static/chunks/98420.164956b2c4969cae.js": { type: "static" }, "/_next/static/chunks/98516.558574f7c1cbd23e.js": { type: "static" }, "/_next/static/chunks/9857.e4adab1a22bc30e2.js": { type: "static" }, "/_next/static/chunks/98617.f0bf905388e93a7b.js": { type: "static" }, "/_next/static/chunks/98628.3e00d337e98e4e0e.js": { type: "static" }, "/_next/static/chunks/98662.d7e11ce2453314e1.js": { type: "static" }, "/_next/static/chunks/98728.b8737b073c8feff0.js": { type: "static" }, "/_next/static/chunks/98751.7cf02e2e8d080db8.js": { type: "static" }, "/_next/static/chunks/98759.445caa5a3f6337f3.js": { type: "static" }, "/_next/static/chunks/98764.ca7f540d818fcbe8.js": { type: "static" }, "/_next/static/chunks/98889.1db0a5d97f44999f.js": { type: "static" }, "/_next/static/chunks/98933.626d0ec655634fe2.js": { type: "static" }, "/_next/static/chunks/98942.4d8e3b67412fd07f.js": { type: "static" }, "/_next/static/chunks/99102.3a1dbf96bb343d23.js": { type: "static" }, "/_next/static/chunks/9919.c99f5352e20ed9be.js": { type: "static" }, "/_next/static/chunks/99239.df467b0ec1a0868f.js": { type: "static" }, "/_next/static/chunks/99388.624536d7a9c7231c.js": { type: "static" }, "/_next/static/chunks/99397.357eb16ca9a7f0c9.js": { type: "static" }, "/_next/static/chunks/995.628ca8dd2f782acd.js": { type: "static" }, "/_next/static/chunks/9954.bc43ef0eef3485cb.js": { type: "static" }, "/_next/static/chunks/99584.d2fcac677dc61d5d.js": { type: "static" }, "/_next/static/chunks/99646.bbea91888f009b95.js": { type: "static" }, "/_next/static/chunks/99663.07f3db8ed1289f1e.js": { type: "static" }, "/_next/static/chunks/99666.7576e8e60a549dae.js": { type: "static" }, "/_next/static/chunks/99686.dea96b556b62fea5.js": { type: "static" }, "/_next/static/chunks/99801.3353b73a244ecce4.js": { type: "static" }, "/_next/static/chunks/99837.ef9f12c419a98007.js": { type: "static" }, "/_next/static/chunks/99893.6249f4b83cc572b0.js": { type: "static" }, "/_next/static/chunks/99897.1caaaf0d323e7bb5.js": { type: "static" }, "/_next/static/chunks/99986.690d98c4b5c567a7.js": { type: "static" }, "/_next/static/chunks/99998.a8f7a9a2b9bc7681.js": { type: "static" }, "/_next/static/chunks/app/[slug]/layout-ff326a98887db892.js": { type: "static" }, "/_next/static/chunks/app/[slug]/page-7d723e92f95c30d4.js": { type: "static" }, "/_next/static/chunks/app/_not-found/page-73b2555e08623f23.js": { type: "static" }, "/_next/static/chunks/app/error-17ed6ee10a49617e.js": { type: "static" }, "/_next/static/chunks/app/layout-39f6f367f528907e.js": { type: "static" }, "/_next/static/chunks/app/not-found-a95c94b85152d086.js": { type: "static" }, "/_next/static/chunks/app/page-5815d5c1f78ca198.js": { type: "static" }, "/_next/static/chunks/app/writing/[tag]/page-fc0df1f581e420c8.js": { type: "static" }, "/_next/static/chunks/app/writing/page-c8b01c92f1ca449b.js": { type: "static" }, "/_next/static/chunks/fd9d1056-703fc81082488f24.js": { type: "static" }, "/_next/static/chunks/framework-5a4b07f9612b21e2.js": { type: "static" }, "/_next/static/chunks/main-app-bc95d5016dc093be.js": { type: "static" }, "/_next/static/chunks/main-ec8ee225141b6692.js": { type: "static" }, "/_next/static/chunks/pages/_app-ed0901e5ef9a48a4.js": { type: "static" }, "/_next/static/chunks/pages/_error-1561c0a93568a28e.js": { type: "static" }, "/_next/static/chunks/polyfills-42372ed130431b0a.js": { type: "static" }, "/_next/static/chunks/webpack-69ddc74cf9aa72ff.js": { type: "static" }, "/_next/static/css/e8f5fdbf30653f55.css": { type: "static" }, "/_next/static/media/10dadb2e82d03733-s.woff2": { type: "static" }, "/_next/static/media/162bae04ee86dd69-s.woff2": { type: "static" }, "/_next/static/media/200388358b398524-s.woff2": { type: "static" }, "/_next/static/media/34900c74a84112b6-s.woff2": { type: "static" }, "/_next/static/media/5f2068c3133468f5-s.woff2": { type: "static" }, "/_next/static/media/67d172d8d0152ee1-s.woff2": { type: "static" }, "/_next/static/media/9bf67a161a796382-s.p.woff2": { type: "static" }, "/_next/static/media/c7d2c42e2b6a799c-s.woff2": { type: "static" }, "/_next/static/media/ceda3626c847d638-s.woff2": { type: "static" }, "/_next/static/media/dad5af6a451969b9-s.woff2": { type: "static" }, "/_next/static/media/f19123270e2664f2-s.p.woff2": { type: "static" }, "/_next/static/media/icon.444542af.png": { type: "static" }, "/_next/static/media/opengraph-image.8a3f57c7.jpg": { type: "static" }, "/_next/static/yray-7w1aokbjRtlaYbY9/_buildManifest.js": { type: "static" }, "/_next/static/yray-7w1aokbjRtlaYbY9/_ssgManifest.js": { type: "static" }, "/images/aug-2019-book-snippets/2f023b057dedaaf00299323144df2b1d_MD5.jpg": { type: "static" }, "/images/aug-2019-book-snippets/3194ee91736c76dfb012e4ee5703d71c_MD5.jpg": { type: "static" }, "/images/aug-2019-book-snippets/5519da5a39a8e0d8852ebc2076d91b0b_MD5.jpg": { type: "static" }, "/images/aug-2019-book-snippets/7fa155e9c63463cef34362f5ff13f933_MD5.jpg": { type: "static" }, "/images/aug-2019-book-snippets/90c3fc08c84058dfe945b70073ee55ef_MD5.jpg": { type: "static" }, "/images/aug-2019-book-snippets/ab989b977663c67515e4130be4e2641a_MD5.jpg": { type: "static" }, "/images/aug-2019-book-snippets/d02d0746d605b116fdca824907ad8c55_MD5.jpg": { type: "static" }, "/images/future-is-dao/242606c938ead618ac9ca5b4ceb200f6_MD5.png": { type: "static" }, "/images/future-is-dao/3f0658d64ef7ed174c3792dd4a97262d_MD5.png": { type: "static" }, "/images/future-is-dao/5996745e3035216c2e5c0fd9621a702a_MD5.png": { type: "static" }, "/images/future-is-dao/68b262c60fd15d8eb12017b05b5798b9_MD5.png": { type: "static" }, "/images/future-is-dao/cf4df0178fd57c9ed7454b9f41c4ba10_MD5.png": { type: "static" }, "/images/future-is-dao/d905a4d16c09e3e636154d0f51054568_MD5.gif": { type: "static" }, "/images/history-rhymes/2e9fbc9ac1220177b4f439b7ece360dd_MD5.png": { type: "static" }, "/images/history-rhymes/c00637c2efbfc64e5b26c49ac2561b4c_MD5.png": { type: "static" }, "/images/history-rhymes/db94a88ff70644808c10a333d5c10cd2_MD5.png": { type: "static" }, "/images/history-rhymes/netscape.png": { type: "static" }, "/images/hybrid-compute/5892946c39a93481aa4f50877d6e2b1f_MD5.png": { type: "static" }, "/images/hybrid-compute/6fe4889a99550141780451e928cb85b4_MD5.png": { type: "static" }, "/images/iov-crypto-bridges/005ded7529d3137b384d339d5794b5e9_MD5.png": { type: "static" }, "/images/iov-crypto-bridges/106228bed2ee5884284a72e73d6e161d_MD5.png": { type: "static" }, "/images/iov-crypto-bridges/637666136b29578222e8f27fdf7122c6_MD5.jpg": { type: "static" }, "/images/iov-crypto-bridges/Pasted image 20241006213122.png": { type: "static" }, "/images/iov-crypto-bridges/bb533e5e2d9e48d9d25987fb668fe13e_MD5.jpg": { type: "static" }, "/images/iov-crypto-bridges/d989e3efeac840cfe2636cc310a1d406_MD5.jpg": { type: "static" }, "/images/iov-crypto-bridges/dai-in-existence.png": { type: "static" }, "/images/iov-crypto-bridges/e3f33f5bfd0fb9ebc48fb9bb3f88b0c5_MD5.png": { type: "static" }, "/images/iov-liquid-super-communities/1d260a2472d306fe16da9d44a58caa87_MD5.jpg": { type: "static" }, "/images/iov-optimistic-resolution/6c989e033004cf2e49e7949e0c2c4a8f_MD5.png": { type: "static" }, "/images/iov-optimistic-resolution/c2b3b8d389ad128711b1c2424dbe34b3_MD5.jpg": { type: "static" }, "/images/million-markets/03d86356704f7698bf35ac4756076ada_MD5.jpg": { type: "static" }, "/images/million-markets/1417ca6d9db3bb746c9899ba8090240d_MD5.png": { type: "static" }, "/images/million-markets/2038bfde0fd9cc83701720c1d63846d0_MD5.png": { type: "static" }, "/images/million-markets/3d47b8572db834b56bc23dda40cbfd52_MD5.png": { type: "static" }, "/images/million-markets/471dcc6e3febc23b136f07584f835946_MD5.png": { type: "static" }, "/images/million-markets/5290195ad4b40c97eee48fa0fcd6c424_MD5.png": { type: "static" }, "/images/million-markets/9d5b59ce8421933e19156ce0986732f5_MD5.png": { type: "static" }, "/images/million-markets/a5386e11b39f44ae2d7ea8ca6d337370_MD5.png": { type: "static" }, "/images/million-markets/a620cdce7f4cca082c3320533ca15590_MD5.png": { type: "static" }, "/images/million-markets/b131ac25c52b0891b95f4c280f7a7546_MD5.png": { type: "static" }, "/images/million-markets/c6bf3e437c7a028d8af2c0e08522277a_MD5.png": { type: "static" }, "/images/million-markets/c78e856507f296fb9f80f404a30ef7bd_MD5.png": { type: "static" }, "/images/million-markets/ce25a174a7df8049ddf41aef877044d8_MD5.png": { type: "static" }, "/images/million-markets/d323c95e936cf19ebba260b311422a8a_MD5.png": { type: "static" }, "/images/million-markets/e69908c1a03593974448c8072c139183_MD5.png": { type: "static" }, "/images/our-van/1a60853677a256a58e3e5a4b07f81d82_MD5.jpg": { type: "static" }, "/images/our-van/1c73883446aae92025484c7033ceb98c_MD5.jpg": { type: "static" }, "/images/our-van/3532d4e61b131399172d83d3485b6c7b_MD5.jpg": { type: "static" }, "/images/our-van/365fc147aacc7e5473a517a8ce25c37f_MD5.jpg": { type: "static" }, "/images/our-van/37046d054a66a213fdb0e2955f39e346_MD5.jpg": { type: "static" }, "/images/our-van/597a8bfe1939429de724dd60650f7078_MD5.jpg": { type: "static" }, "/images/our-van/84d589fc79d6f34d7eb5d896e3d89d82_MD5.jpg": { type: "static" }, "/images/our-van/9516c97826f513a34e989503d4257386_MD5.jpg": { type: "static" }, "/images/our-van/bcac48fac882e84d37ce8a87cf120de8_MD5.jpg": { type: "static" }, "/images/our-van/d6cd7df818b65bca5a1539086bd362fb_MD5.jpg": { type: "static" }, "/images/rig/rig.jpg": { type: "static" }, "/images/self-help/ai-oil-painting.png": { type: "static" }, "/images/settlement-layers/2e14e45b3f37aa48e7dd48fc5c32250c_MD5.png": { type: "static" }, "/images/settlement-layers/9876ebf59351842a5123405bd6f822f5_MD5.png": { type: "static" }, "/images/smooth-reverie/salutatorian.png": { type: "static" }, "/images/zk/1543bf4c683c8deefff7eaa9980c06b4_MD5.png": { type: "static" }, "/images/zk/896c65db7fd4dc26d288e4ea0c5357dd_MD5.png": { type: "static" }, "/images/zk/f653e92b5d0f4fee68b4884bcca05c0e_MD5.png": { type: "static" }, "/404": {
  type: "override",
  path: "/404.html",
  headers: { "content-type": "text/html; charset=utf-8" }
}, "/500": {
  type: "override",
  path: "/500.html",
  headers: { "content-type": "text/html; charset=utf-8" }
}, "/_app.rsc": {
  type: "override",
  path: "/_app.rsc.json",
  headers: { "content-type": "application/json" }
}, "/_error.rsc": {
  type: "override",
  path: "/_error.rsc.json",
  headers: { "content-type": "application/json" }
}, "/_document.rsc": {
  type: "override",
  path: "/_document.rsc.json",
  headers: { "content-type": "application/json" }
}, "/404.rsc": {
  type: "override",
  path: "/404.rsc.json",
  headers: { "content-type": "application/json" }
}, "/atom.xml": {
  type: "override",
  path: "/atom.xml",
  headers: { "content-type": "application/atom+xml; charset=utf-8", "x-next-cache-tags": "_N_T_/layout,_N_T_/(feeds)/layout,_N_T_/(feeds)/atom.xml/layout,_N_T_/(feeds)/atom.xml/route,_N_T_/atom.xml", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/aug-2019-book-snippets.html": {
  type: "override",
  path: "/aug-2019-book-snippets.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/aug-2019-book-snippets", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/aug-2019-book-snippets": {
  type: "override",
  path: "/aug-2019-book-snippets.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/aug-2019-book-snippets", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/aug-2019-book-snippets.rsc": {
  type: "override",
  path: "/aug-2019-book-snippets.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/aug-2019-book-snippets", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/bribe-tokens.html": {
  type: "override",
  path: "/bribe-tokens.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/bribe-tokens", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/bribe-tokens": {
  type: "override",
  path: "/bribe-tokens.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/bribe-tokens", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/bribe-tokens.rsc": {
  type: "override",
  path: "/bribe-tokens.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/bribe-tokens", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/favicon.ico": {
  type: "override",
  path: "/favicon.ico",
  headers: { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/feed.json": {
  type: "override",
  path: "/feed.json",
  headers: { "content-type": "application/json; charset=utf-8", "x-next-cache-tags": "_N_T_/layout,_N_T_/(feeds)/layout,_N_T_/(feeds)/feed.json/layout,_N_T_/(feeds)/feed.json/route,_N_T_/feed.json", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/feed.xml": {
  type: "override",
  path: "/feed.xml",
  headers: { "content-type": "application/rss+xml; charset=utf-8", "x-next-cache-tags": "_N_T_/layout,_N_T_/(feeds)/layout,_N_T_/(feeds)/feed.xml/layout,_N_T_/(feeds)/feed.xml/route,_N_T_/feed.xml", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/future-is-dao.html": {
  type: "override",
  path: "/future-is-dao.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/future-is-dao", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/future-is-dao": {
  type: "override",
  path: "/future-is-dao.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/future-is-dao", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/future-is-dao.rsc": {
  type: "override",
  path: "/future-is-dao.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/future-is-dao", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/history-rhymes.html": {
  type: "override",
  path: "/history-rhymes.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/history-rhymes", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/history-rhymes": {
  type: "override",
  path: "/history-rhymes.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/history-rhymes", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/history-rhymes.rsc": {
  type: "override",
  path: "/history-rhymes.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/history-rhymes", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/hybrid-compute.html": {
  type: "override",
  path: "/hybrid-compute.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/hybrid-compute", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/hybrid-compute": {
  type: "override",
  path: "/hybrid-compute.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/hybrid-compute", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/hybrid-compute.rsc": {
  type: "override",
  path: "/hybrid-compute.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/hybrid-compute", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/icon.png": {
  type: "override",
  path: "/icon.png",
  headers: { "cache-control": "public, immutable, no-transform, max-age=31536000", "content-type": "image/png", "x-next-cache-tags": "_N_T_/layout,_N_T_/icon.png/layout,_N_T_/icon.png/route,_N_T_/icon.png", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/index.html": {
  type: "override",
  path: "/index.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/index": {
  type: "override",
  path: "/index.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/": {
  type: "override",
  path: "/index.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/index.rsc": {
  type: "override",
  path: "/index.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/iov-crypto-bridges.html": {
  type: "override",
  path: "/iov-crypto-bridges.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/iov-crypto-bridges", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/iov-crypto-bridges": {
  type: "override",
  path: "/iov-crypto-bridges.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/iov-crypto-bridges", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/iov-crypto-bridges.rsc": {
  type: "override",
  path: "/iov-crypto-bridges.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/iov-crypto-bridges", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/iov-liquid-super-communities.html": {
  type: "override",
  path: "/iov-liquid-super-communities.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/iov-liquid-super-communities", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/iov-liquid-super-communities": {
  type: "override",
  path: "/iov-liquid-super-communities.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/iov-liquid-super-communities", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/iov-liquid-super-communities.rsc": {
  type: "override",
  path: "/iov-liquid-super-communities.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/iov-liquid-super-communities", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/iov-optimistic-resolution.html": {
  type: "override",
  path: "/iov-optimistic-resolution.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/iov-optimistic-resolution", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/iov-optimistic-resolution": {
  type: "override",
  path: "/iov-optimistic-resolution.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/iov-optimistic-resolution", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/iov-optimistic-resolution.rsc": {
  type: "override",
  path: "/iov-optimistic-resolution.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/iov-optimistic-resolution", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/million-markets.html": {
  type: "override",
  path: "/million-markets.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/million-markets", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/million-markets": {
  type: "override",
  path: "/million-markets.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/million-markets", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/million-markets.rsc": {
  type: "override",
  path: "/million-markets.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/million-markets", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/opengraph-image.jpg": {
  type: "override",
  path: "/opengraph-image.jpg",
  headers: { "cache-control": "public, immutable, no-transform, max-age=31536000", "content-type": "image/jpeg", "x-next-cache-tags": "_N_T_/layout,_N_T_/opengraph-image.jpg/layout,_N_T_/opengraph-image.jpg/route,_N_T_/opengraph-image.jpg", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/our-van.html": {
  type: "override",
  path: "/our-van.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/our-van", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/our-van": {
  type: "override",
  path: "/our-van.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/our-van", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/our-van.rsc": {
  type: "override",
  path: "/our-van.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/our-van", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/rig.html": {
  type: "override",
  path: "/rig.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/rig", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/rig": {
  type: "override",
  path: "/rig.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/rig", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/rig.rsc": {
  type: "override",
  path: "/rig.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/rig", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/robots.txt": {
  type: "override",
  path: "/robots.txt",
  headers: { "cache-control": "public, max-age=0, must-revalidate", "content-type": "text/plain", "x-next-cache-tags": "_N_T_/layout,_N_T_/robots.txt/layout,_N_T_/robots.txt/route,_N_T_/robots.txt", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/self-help.html": {
  type: "override",
  path: "/self-help.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/self-help", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/self-help": {
  type: "override",
  path: "/self-help.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/self-help", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/self-help.rsc": {
  type: "override",
  path: "/self-help.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/self-help", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/settlement-layers.html": {
  type: "override",
  path: "/settlement-layers.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/settlement-layers", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/settlement-layers": {
  type: "override",
  path: "/settlement-layers.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/settlement-layers", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/settlement-layers.rsc": {
  type: "override",
  path: "/settlement-layers.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/settlement-layers", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/sitemap.xml": {
  type: "override",
  path: "/sitemap.xml",
  headers: { "cache-control": "public, max-age=0, must-revalidate", "content-type": "application/xml", "x-next-cache-tags": "_N_T_/layout,_N_T_/sitemap.xml/layout,_N_T_/sitemap.xml/route,_N_T_/sitemap.xml", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/smooth-reverie.html": {
  type: "override",
  path: "/smooth-reverie.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/smooth-reverie", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/smooth-reverie": {
  type: "override",
  path: "/smooth-reverie.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/smooth-reverie", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/smooth-reverie.rsc": {
  type: "override",
  path: "/smooth-reverie.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/smooth-reverie", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/DAOs.html": {
  type: "override",
  path: "/writing/DAOs.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/DAOs", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/DAOs": {
  type: "override",
  path: "/writing/DAOs.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/DAOs", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/DAOs.rsc": {
  type: "override",
  path: "/writing/DAOs.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/DAOs", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/books.html": {
  type: "override",
  path: "/writing/books.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/books", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/books": {
  type: "override",
  path: "/writing/books.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/books", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/books.rsc": {
  type: "override",
  path: "/writing/books.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/books", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/crypto.html": {
  type: "override",
  path: "/writing/crypto.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/crypto", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/crypto": {
  type: "override",
  path: "/writing/crypto.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/crypto", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/crypto.rsc": {
  type: "override",
  path: "/writing/crypto.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/crypto", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/daily-life.html": {
  type: "override",
  path: "/writing/daily-life.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/daily-life", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/daily-life": {
  type: "override",
  path: "/writing/daily-life.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/daily-life", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/daily-life.rsc": {
  type: "override",
  path: "/writing/daily-life.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/daily-life", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/hacking.html": {
  type: "override",
  path: "/writing/hacking.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/hacking", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/hacking": {
  type: "override",
  path: "/writing/hacking.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/hacking", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/hacking.rsc": {
  type: "override",
  path: "/writing/hacking.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/hacking", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/hardware.html": {
  type: "override",
  path: "/writing/hardware.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/hardware", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/hardware": {
  type: "override",
  path: "/writing/hardware.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/hardware", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/hardware.rsc": {
  type: "override",
  path: "/writing/hardware.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/hardware", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/history.html": {
  type: "override",
  path: "/writing/history.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/history", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/history": {
  type: "override",
  path: "/writing/history.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/history", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/history.rsc": {
  type: "override",
  path: "/writing/history.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/history", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/life.html": {
  type: "override",
  path: "/writing/life.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/life", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/life": {
  type: "override",
  path: "/writing/life.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/life", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/life.rsc": {
  type: "override",
  path: "/writing/life.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/life", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/markets.html": {
  type: "override",
  path: "/writing/markets.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/markets", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/markets": {
  type: "override",
  path: "/writing/markets.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/markets", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/markets.rsc": {
  type: "override",
  path: "/writing/markets.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/markets", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/mechanisms.html": {
  type: "override",
  path: "/writing/mechanisms.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/mechanisms", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/mechanisms": {
  type: "override",
  path: "/writing/mechanisms.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/mechanisms", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/mechanisms.rsc": {
  type: "override",
  path: "/writing/mechanisms.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/mechanisms", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/off-grid.html": {
  type: "override",
  path: "/writing/off-grid.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/off-grid", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/off-grid": {
  type: "override",
  path: "/writing/off-grid.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/off-grid", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/off-grid.rsc": {
  type: "override",
  path: "/writing/off-grid.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/off-grid", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/opinion.html": {
  type: "override",
  path: "/writing/opinion.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/opinion", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/opinion": {
  type: "override",
  path: "/writing/opinion.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/opinion", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/opinion.rsc": {
  type: "override",
  path: "/writing/opinion.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/opinion", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/pc.html": {
  type: "override",
  path: "/writing/pc.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/pc", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/pc": {
  type: "override",
  path: "/writing/pc.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/pc", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/pc.rsc": {
  type: "override",
  path: "/writing/pc.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/pc", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/philosophy.html": {
  type: "override",
  path: "/writing/philosophy.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/philosophy", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/philosophy": {
  type: "override",
  path: "/writing/philosophy.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/philosophy", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/philosophy.rsc": {
  type: "override",
  path: "/writing/philosophy.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/philosophy", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/programming.html": {
  type: "override",
  path: "/writing/programming.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/programming", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/programming": {
  type: "override",
  path: "/writing/programming.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/programming", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/programming.rsc": {
  type: "override",
  path: "/writing/programming.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/programming", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/reading.html": {
  type: "override",
  path: "/writing/reading.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/reading", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/reading": {
  type: "override",
  path: "/writing/reading.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/reading", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/reading.rsc": {
  type: "override",
  path: "/writing/reading.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/reading", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/society.html": {
  type: "override",
  path: "/writing/society.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/society", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/society": {
  type: "override",
  path: "/writing/society.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/society", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/society.rsc": {
  type: "override",
  path: "/writing/society.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/society", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/speech.html": {
  type: "override",
  path: "/writing/speech.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/speech", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/speech": {
  type: "override",
  path: "/writing/speech.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/speech", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/speech.rsc": {
  type: "override",
  path: "/writing/speech.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/speech", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/tech.html": {
  type: "override",
  path: "/writing/tech.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/tech", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/tech": {
  type: "override",
  path: "/writing/tech.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/tech", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/tech.rsc": {
  type: "override",
  path: "/writing/tech.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/tech", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing/van.html": {
  type: "override",
  path: "/writing/van.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/van", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/van": {
  type: "override",
  path: "/writing/van.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/van", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing/van.rsc": {
  type: "override",
  path: "/writing/van.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/[tag]/layout,_N_T_/writing/[tag]/page,_N_T_/writing/van", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing-rich.html": {
  type: "override",
  path: "/writing-rich.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/writing-rich", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing-rich": {
  type: "override",
  path: "/writing-rich.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/writing-rich", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing-rich.rsc": {
  type: "override",
  path: "/writing-rich.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/[slug]/layout,_N_T_/[slug]/page,_N_T_/writing-rich", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
}, "/writing.html": {
  type: "override",
  path: "/writing.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/page,_N_T_/writing", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing": {
  type: "override",
  path: "/writing.html",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/page,_N_T_/writing", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }
}, "/writing.rsc": {
  type: "override",
  path: "/writing.rsc",
  headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/writing/layout,_N_T_/writing/page,_N_T_/writing", "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" }
} };
function createPCRE(pattern, namedCaptures = []) {
  pattern = String(pattern || "").trim();
  const originalPattern = pattern;
  let delim;
  let flags = "";
  const hasDelim = /^[^a-zA-Z\\\s]/.test(pattern);
  if (hasDelim) {
    delim = pattern[0];
    const lastDelimIndex = pattern.lastIndexOf(delim);
    flags += pattern.substring(lastDelimIndex + 1);
    pattern = pattern.substring(1, lastDelimIndex);
  }
  let numGroups = 0;
  pattern = replaceCaptureGroups(pattern, (group) => {
    if (/^\(\?[P<']/.test(group)) {
      const match = /^\(\?P?[<']([^>']+)[>']/.exec(group);
      if (!match) {
        throw new Error(
          `Failed to extract named captures from ${JSON.stringify(group)}`
        );
      }
      const capture = group.substring(match[0].length, group.length - 1);
      if (namedCaptures) {
        namedCaptures[numGroups] = match[1];
      }
      numGroups++;
      return `(${capture})`;
    }
    if (group.substring(0, 3) === "(?:") {
      return group;
    }
    numGroups++;
    return group;
  });
  pattern = pattern.replace(
    /\[:([^:]+):\]/g,
    (characterClass, name) => {
      return characterClasses[name] || characterClass;
    }
  );
  return new PCRE(pattern, flags, namedCaptures, originalPattern, flags, delim);
}
function replaceCaptureGroups(pattern, fn) {
  let start = 0;
  let depth = 0;
  let escaped = false;
  for (let i = 0; i < pattern.length; i++) {
    const cur = pattern[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    switch (cur) {
      case "(":
        if (depth === 0) {
          start = i;
        }
        depth++;
        break;
      case ")":
        if (depth > 0) {
          depth--;
          if (depth === 0) {
            const end = i + 1;
            const l = start === 0 ? "" : pattern.substring(0, start);
            const r = pattern.substring(end);
            const v = String(fn(pattern.substring(start, end)));
            pattern = l + v + r;
            i = start;
          }
        }
        break;
      case "\\":
        escaped = true;
        break;
      default:
        break;
    }
  }
  return pattern;
}
var PCRE = class extends RegExp {
  namedCaptures;
  pcrePattern;
  pcreFlags;
  delimiter;
  constructor(pattern, flags, namedCaptures, pcrePattern, pcreFlags, delimiter) {
    super(pattern, flags);
    this.namedCaptures = namedCaptures;
    this.pcrePattern = pcrePattern;
    this.pcreFlags = pcreFlags;
    this.delimiter = delimiter;
  }
};
var characterClasses = {
  alnum: "[A-Za-z0-9]",
  word: "[A-Za-z0-9_]",
  alpha: "[A-Za-z]",
  blank: "[ \\t]",
  cntrl: "[\\x00-\\x1F\\x7F]",
  digit: "\\d",
  graph: "[\\x21-\\x7E]",
  lower: "[a-z]",
  print: "[\\x20-\\x7E]",
  punct: "[\\]\\[!\"#$%&'()*+,./:;<=>?@\\\\^_`{|}~-]",
  space: "\\s",
  upper: "[A-Z]",
  xdigit: "[A-Fa-f0-9]"
};
function matchPCRE(expr, val, caseSensitive) {
  if (val === null || val === void 0) {
    return { match: null, captureGroupKeys: [] };
  }
  const flag = caseSensitive ? "" : "i";
  const captureGroupKeys = [];
  const matcher = createPCRE(`%${expr}%${flag}`, captureGroupKeys);
  const match = matcher.exec(val);
  return { match, captureGroupKeys };
}
function applyPCREMatches(rawStr, match, captureGroupKeys, { namedOnly } = {}) {
  return rawStr.replace(/\$([a-zA-Z0-9_]+)/g, (originalValue, key) => {
    const index = captureGroupKeys.indexOf(key);
    if (namedOnly && index === -1) {
      return originalValue;
    }
    return (index === -1 ? match[parseInt(key, 10)] : match[index + 1]) || "";
  });
}
function checkhasField(has, { url, cookies, headers, routeDest }) {
  switch (has.type) {
    case "host": {
      return { valid: url.hostname === has.value };
    }
    case "header": {
      if (has.value !== void 0) {
        return getHasFieldPCREMatchResult(
          has.value,
          headers.get(has.key),
          routeDest
        );
      }
      return { valid: headers.has(has.key) };
    }
    case "cookie": {
      const cookie = cookies[has.key];
      if (cookie && has.value !== void 0) {
        return getHasFieldPCREMatchResult(has.value, cookie, routeDest);
      }
      return { valid: cookie !== void 0 };
    }
    case "query": {
      if (has.value !== void 0) {
        return getHasFieldPCREMatchResult(
          has.value,
          url.searchParams.get(has.key),
          routeDest
        );
      }
      return { valid: url.searchParams.has(has.key) };
    }
  }
}
function getHasFieldPCREMatchResult(hasValue, foundValue, routeDest) {
  const { match, captureGroupKeys } = matchPCRE(hasValue, foundValue);
  if (routeDest && match && captureGroupKeys.length) {
    return {
      valid: !!match,
      newRouteDest: applyPCREMatches(routeDest, match, captureGroupKeys, {
        namedOnly: true
      })
    };
  }
  return { valid: !!match };
}
function adjustRequestForVercel(request) {
  const adjustedHeaders = new Headers(request.headers);
  if (request.cf) {
    adjustedHeaders.set(
      "x-vercel-ip-city",
      encodeURIComponent(request.cf.city)
    );
    adjustedHeaders.set("x-vercel-ip-country", request.cf.country);
    adjustedHeaders.set(
      "x-vercel-ip-country-region",
      request.cf.regionCode
    );
    adjustedHeaders.set("x-vercel-ip-latitude", request.cf.latitude);
    adjustedHeaders.set(
      "x-vercel-ip-longitude",
      request.cf.longitude
    );
  }
  return new Request(request, { headers: adjustedHeaders });
}
function applyHeaders(target, source, pcreMatch) {
  const entries = source instanceof Headers ? source.entries() : Object.entries(source);
  for (const [key, value] of entries) {
    const lowerKey = key.toLowerCase();
    const newValue = pcreMatch?.match ? applyPCREMatches(value, pcreMatch.match, pcreMatch.captureGroupKeys) : value;
    if (lowerKey === "set-cookie") {
      target.append(lowerKey, newValue);
    } else {
      target.set(lowerKey, newValue);
    }
  }
}
function isUrl(url) {
  return /^https?:\/\//.test(url);
}
function applySearchParams(target, source) {
  for (const [key, value] of source.entries()) {
    const nxtParamMatch = /^nxtP(.+)$/.exec(key);
    const nxtInterceptMatch = /^nxtI(.+)$/.exec(key);
    if (nxtParamMatch?.[1]) {
      target.set(key, value);
      target.set(nxtParamMatch[1], value);
    } else if (nxtInterceptMatch?.[1]) {
      target.set(nxtInterceptMatch[1], value.replace(/(\(\.+\))+/, ""));
    } else if (!target.has(key) || !!value && !target.getAll(key).includes(value)) {
      target.append(key, value);
    }
  }
}
function createRouteRequest(req, path) {
  const newUrl = new URL(path, req.url);
  applySearchParams(newUrl.searchParams, new URL(req.url).searchParams);
  newUrl.pathname = newUrl.pathname.replace(/\/index.html$/, "/").replace(/\.html$/, "");
  return new Request(newUrl, req);
}
function createMutableResponse(resp) {
  return new Response(resp.body, resp);
}
function parseAcceptLanguage(headerValue) {
  return headerValue.split(",").map((val) => {
    const [lang, qual] = val.split(";");
    const quality = parseFloat((qual ?? "q=1").replace(/q *= */gi, ""));
    return [lang.trim(), isNaN(quality) ? 1 : quality];
  }).sort((a, b) => b[1] - a[1]).map(([locale]) => locale === "*" || locale === "" ? [] : locale).flat();
}
function getNextPhase(phase) {
  switch (phase) {
    case "none": {
      return "filesystem";
    }
    case "filesystem": {
      return "rewrite";
    }
    case "rewrite": {
      return "resource";
    }
    case "resource": {
      return "miss";
    }
    default: {
      return "miss";
    }
  }
}
async function runOrFetchBuildOutputItem(item, { request, assetsFetcher, ctx }, { path, searchParams }) {
  let resp = void 0;
  const url = new URL(request.url);
  applySearchParams(url.searchParams, searchParams);
  const req = new Request(url, request);
  try {
    switch (item?.type) {
      case "function":
      case "middleware": {
        const edgeFunction = item.handler;
        try {
          resp = await edgeFunction.default(req, ctx);
        } catch (e) {
          const err = e;
          if (err.name === "TypeError" && err.message.endsWith("default is not a function")) {
            throw new Error(
              `An error occurred while evaluating the target edge function (${item.entrypoint})`
            );
          }
          throw e;
        }
        break;
      }
      case "override": {
        resp = createMutableResponse(
          await assetsFetcher.fetch(createRouteRequest(req, item.path ?? path))
        );
        if (item.headers) {
          applyHeaders(resp.headers, item.headers);
        }
        break;
      }
      case "static": {
        resp = await assetsFetcher.fetch(createRouteRequest(req, path));
        break;
      }
      default: {
        resp = new Response("Not Found", { status: 404 });
      }
    }
  } catch (e) {
    console.error(e);
    return new Response("Internal Server Error", { status: 500 });
  }
  return createMutableResponse(resp);
}
function isLocaleTrailingSlashRegex(src, locales) {
  const prefix = "^//?(?:";
  const suffix = ")/(.*)$";
  if (!src.startsWith(prefix) || !src.endsWith(suffix)) {
    return false;
  }
  const foundLocales = src.slice(prefix.length, -suffix.length).split("|");
  return foundLocales.every((locale) => locales.has(locale));
}
function isRemotePatternMatch(url, { protocol, hostname, port, pathname }) {
  if (protocol && url.protocol.replace(/:$/, "") !== protocol)
    return false;
  if (!new RegExp(hostname).test(url.hostname))
    return false;
  if (port && !new RegExp(port).test(url.port))
    return false;
  if (pathname && !new RegExp(pathname).test(url.pathname))
    return false;
  return true;
}
function getResizingProperties(request, config) {
  if (request.method !== "GET")
    return void 0;
  const { origin, searchParams } = new URL(request.url);
  const rawUrl = searchParams.get("url");
  const width = Number.parseInt(searchParams.get("w") ?? "", 10);
  const quality = Number.parseInt(searchParams.get("q") ?? "75", 10);
  if (!rawUrl || Number.isNaN(width) || Number.isNaN(quality))
    return void 0;
  if (!config?.sizes?.includes(width))
    return void 0;
  if (quality < 0 || quality > 100)
    return void 0;
  const url = new URL(rawUrl, origin);
  if (url.pathname.endsWith(".svg") && !config?.dangerouslyAllowSVG) {
    return void 0;
  }
  const isProtocolRelative = rawUrl.startsWith("//");
  const isRelative = rawUrl.startsWith("/") && !isProtocolRelative;
  if (!isRelative && !config?.domains?.includes(url.hostname) && !config?.remotePatterns?.find((pattern) => isRemotePatternMatch(url, pattern))) {
    return void 0;
  }
  const acceptHeader = request.headers.get("Accept") ?? "";
  const format = config?.formats?.find((format2) => acceptHeader.includes(format2))?.replace("image/", "");
  return {
    isRelative,
    imageUrl: url,
    options: { width, quality, format }
  };
}
function formatResp(resp, imageUrl, config) {
  const newHeaders = new Headers();
  if (config?.contentSecurityPolicy) {
    newHeaders.set("Content-Security-Policy", config.contentSecurityPolicy);
  }
  if (config?.contentDispositionType) {
    const fileName = imageUrl.pathname.split("/").pop();
    const contentDisposition = fileName ? `${config.contentDispositionType}; filename="${fileName}"` : config.contentDispositionType;
    newHeaders.set("Content-Disposition", contentDisposition);
  }
  if (!resp.headers.has("Cache-Control")) {
    newHeaders.set(
      "Cache-Control",
      `public, max-age=${config?.minimumCacheTTL ?? 60}`
    );
  }
  const mutableResponse = createMutableResponse(resp);
  applyHeaders(mutableResponse.headers, newHeaders);
  return mutableResponse;
}
async function handleImageResizingRequest(request, { buildOutput, assetsFetcher, imagesConfig }) {
  const opts = getResizingProperties(request, imagesConfig);
  if (!opts) {
    return new Response("Invalid image resizing request", { status: 400 });
  }
  const { isRelative, imageUrl } = opts;
  const imgFetch = isRelative && imageUrl.pathname in buildOutput ? assetsFetcher.fetch.bind(assetsFetcher) : fetch;
  const imageResp = await imgFetch(imageUrl);
  return formatResp(imageResp, imageUrl, imagesConfig);
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e) {
    return str;
  }
}
function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
var RoutesMatcher = class {
  constructor(routes, output, reqCtx, buildMetadata, wildcardConfig) {
    this.routes = routes;
    this.output = output;
    this.reqCtx = reqCtx;
    this.url = new URL(reqCtx.request.url);
    this.cookies = parse(reqCtx.request.headers.get("cookie") || "");
    this.path = this.url.pathname || "/";
    this.headers = { normal: new Headers(), important: new Headers() };
    this.searchParams = new URLSearchParams();
    applySearchParams(this.searchParams, this.url.searchParams);
    this.checkPhaseCounter = 0;
    this.middlewareInvoked = [];
    this.wildcardMatch = wildcardConfig?.find(
      (w) => w.domain === this.url.hostname
    );
    this.locales = new Set(buildMetadata.collectedLocales);
  }
  url;
  cookies;
  wildcardMatch;
  path;
  status;
  headers;
  searchParams;
  body;
  checkPhaseCounter;
  middlewareInvoked;
  locales;
  checkRouteMatch(route, {
    checkStatus,
    checkIntercept
  }) {
    const srcMatch = matchPCRE(route.src, this.path, route.caseSensitive);
    if (!srcMatch.match)
      return;
    if (route.methods && !route.methods.map((m) => m.toUpperCase()).includes(this.reqCtx.request.method.toUpperCase())) {
      return;
    }
    const hasFieldProps = {
      url: this.url,
      cookies: this.cookies,
      headers: this.reqCtx.request.headers,
      routeDest: route.dest
    };
    if (route.has?.find((has) => {
      const result = checkhasField(has, hasFieldProps);
      if (result.newRouteDest) {
        hasFieldProps.routeDest = result.newRouteDest;
      }
      return !result.valid;
    })) {
      return;
    }
    if (route.missing?.find((has) => checkhasField(has, hasFieldProps).valid)) {
      return;
    }
    if (checkStatus && route.status !== this.status) {
      return;
    }
    if (checkIntercept && route.dest) {
      const interceptRouteRegex = /\/(\(\.+\))+/;
      const destIsIntercept = interceptRouteRegex.test(route.dest);
      const pathIsIntercept = interceptRouteRegex.test(this.path);
      if (destIsIntercept && !pathIsIntercept) {
        return;
      }
    }
    return { routeMatch: srcMatch, routeDest: hasFieldProps.routeDest };
  }
  processMiddlewareResp(resp) {
    const overrideKey = "x-middleware-override-headers";
    const overrideHeader = resp.headers.get(overrideKey);
    if (overrideHeader) {
      const overridenHeaderKeys = new Set(
        overrideHeader.split(",").map((h) => h.trim())
      );
      for (const key of overridenHeaderKeys.keys()) {
        const valueKey = `x-middleware-request-${key}`;
        const value = resp.headers.get(valueKey);
        if (this.reqCtx.request.headers.get(key) !== value) {
          if (value) {
            this.reqCtx.request.headers.set(key, value);
          } else {
            this.reqCtx.request.headers.delete(key);
          }
        }
        resp.headers.delete(valueKey);
      }
      resp.headers.delete(overrideKey);
    }
    const rewriteKey = "x-middleware-rewrite";
    const rewriteHeader = resp.headers.get(rewriteKey);
    if (rewriteHeader) {
      const newUrl = new URL(rewriteHeader, this.url);
      const rewriteIsExternal = this.url.hostname !== newUrl.hostname;
      this.path = rewriteIsExternal ? `${newUrl}` : newUrl.pathname;
      applySearchParams(this.searchParams, newUrl.searchParams);
      resp.headers.delete(rewriteKey);
    }
    const middlewareNextKey = "x-middleware-next";
    const middlewareNextHeader = resp.headers.get(middlewareNextKey);
    if (middlewareNextHeader) {
      resp.headers.delete(middlewareNextKey);
    } else if (!rewriteHeader && !resp.headers.has("location")) {
      this.body = resp.body;
      this.status = resp.status;
    } else if (resp.headers.has("location") && resp.status >= 300 && resp.status < 400) {
      this.status = resp.status;
    }
    applyHeaders(this.reqCtx.request.headers, resp.headers);
    applyHeaders(this.headers.normal, resp.headers);
    this.headers.middlewareLocation = resp.headers.get("location");
  }
  async runRouteMiddleware(path) {
    if (!path)
      return true;
    const item = path && this.output[path];
    if (!item || item.type !== "middleware") {
      this.status = 500;
      return false;
    }
    const resp = await runOrFetchBuildOutputItem(item, this.reqCtx, {
      path: this.path,
      searchParams: this.searchParams,
      headers: this.headers,
      status: this.status
    });
    this.middlewareInvoked.push(path);
    if (resp.status === 500) {
      this.status = resp.status;
      return false;
    }
    this.processMiddlewareResp(resp);
    return true;
  }
  applyRouteOverrides(route) {
    if (!route.override)
      return;
    this.status = void 0;
    this.headers.normal = new Headers();
    this.headers.important = new Headers();
  }
  applyRouteHeaders(route, srcMatch, captureGroupKeys) {
    if (!route.headers)
      return;
    applyHeaders(this.headers.normal, route.headers, {
      match: srcMatch,
      captureGroupKeys
    });
    if (route.important) {
      applyHeaders(this.headers.important, route.headers, {
        match: srcMatch,
        captureGroupKeys
      });
    }
  }
  applyRouteStatus(route) {
    if (!route.status)
      return;
    this.status = route.status;
  }
  applyRouteDest(route, srcMatch, captureGroupKeys) {
    if (!route.dest)
      return this.path;
    const prevPath = this.path;
    let processedDest = route.dest;
    if (this.wildcardMatch && /\$wildcard/.test(processedDest)) {
      processedDest = processedDest.replace(
        /\$wildcard/g,
        this.wildcardMatch.value
      );
    }
    this.path = applyPCREMatches(processedDest, srcMatch, captureGroupKeys);
    const isRscIndex = /\/index\.rsc$/i.test(this.path);
    const isPrevAbsoluteIndex = /^\/(?:index)?$/i.test(prevPath);
    const isPrevPrefetchRscIndex = /^\/__index\.prefetch\.rsc$/i.test(prevPath);
    if (isRscIndex && !isPrevAbsoluteIndex && !isPrevPrefetchRscIndex) {
      this.path = prevPath;
    }
    const isRsc = /\.rsc$/i.test(this.path);
    const isPrefetchRsc = /\.prefetch\.rsc$/i.test(this.path);
    const pathExistsInOutput = this.path in this.output;
    if (isRsc && !isPrefetchRsc && !pathExistsInOutput) {
      this.path = this.path.replace(/\.rsc/i, "");
    }
    const destUrl = new URL(this.path, this.url);
    applySearchParams(this.searchParams, destUrl.searchParams);
    if (!isUrl(this.path))
      this.path = destUrl.pathname;
    return prevPath;
  }
  applyLocaleRedirects(route) {
    if (!route.locale?.redirect)
      return;
    const srcIsRegex = /^\^(.)*$/.test(route.src);
    if (!srcIsRegex && route.src !== this.path)
      return;
    if (this.headers.normal.has("location"))
      return;
    const {
      locale: { redirect: redirects, cookie: cookieName }
    } = route;
    const cookieValue = cookieName && this.cookies[cookieName];
    const cookieLocales = parseAcceptLanguage(cookieValue ?? "");
    const headerLocales = parseAcceptLanguage(
      this.reqCtx.request.headers.get("accept-language") ?? ""
    );
    const locales = [...cookieLocales, ...headerLocales];
    const redirectLocales = locales.map((locale) => redirects[locale]).filter(Boolean);
    const redirectValue = redirectLocales[0];
    if (redirectValue) {
      const needsRedirecting = !this.path.startsWith(redirectValue);
      if (needsRedirecting) {
        this.headers.normal.set("location", redirectValue);
        this.status = 307;
      }
      return;
    }
  }
  getLocaleFriendlyRoute(route, phase) {
    if (!this.locales || phase !== "miss") {
      return route;
    }
    if (isLocaleTrailingSlashRegex(route.src, this.locales)) {
      return {
        ...route,
        src: route.src.replace(/\/\(\.\*\)\$$/, "(?:/(.*))?$")
      };
    }
    return route;
  }
  async checkRoute(phase, rawRoute) {
    const localeFriendlyRoute = this.getLocaleFriendlyRoute(rawRoute, phase);
    const { routeMatch, routeDest } = this.checkRouteMatch(localeFriendlyRoute, {
      checkStatus: phase === "error",
      checkIntercept: phase === "rewrite"
    }) ?? {};
    const route = { ...localeFriendlyRoute, dest: routeDest };
    if (!routeMatch?.match)
      return "skip";
    if (route.middlewarePath && this.middlewareInvoked.includes(route.middlewarePath)) {
      return "skip";
    }
    const { match: srcMatch, captureGroupKeys } = routeMatch;
    this.applyRouteOverrides(route);
    this.applyLocaleRedirects(route);
    const success = await this.runRouteMiddleware(route.middlewarePath);
    if (!success)
      return "error";
    if (this.body !== void 0 || this.headers.middlewareLocation) {
      return "done";
    }
    this.applyRouteHeaders(route, srcMatch, captureGroupKeys);
    this.applyRouteStatus(route);
    const prevPath = this.applyRouteDest(route, srcMatch, captureGroupKeys);
    if (route.check && !isUrl(this.path)) {
      if (prevPath === this.path) {
        if (phase !== "miss") {
          return this.checkPhase(getNextPhase(phase));
        }
        this.status = 404;
      } else if (phase === "miss") {
        if (!(this.path in this.output) && !(this.path.replace(/\/$/, "") in this.output)) {
          return this.checkPhase("filesystem");
        }
        if (this.status === 404) {
          this.status = void 0;
        }
      } else {
        return this.checkPhase("none");
      }
    }
    if (!route.continue) {
      return "done";
    }
    const isRedirect = route.status && route.status >= 300 && route.status <= 399;
    if (isRedirect) {
      return "done";
    }
    return "next";
  }
  async checkPhase(phase) {
    if (this.checkPhaseCounter++ >= 50) {
      console.error(
        `Routing encountered an infinite loop while checking ${this.url.pathname}`
      );
      this.status = 500;
      return "error";
    }
    this.middlewareInvoked = [];
    let shouldContinue = true;
    for (const route of this.routes[phase]) {
      const result = await this.checkRoute(phase, route);
      if (result === "error") {
        return "error";
      }
      if (result === "done") {
        shouldContinue = false;
        break;
      }
    }
    if (phase === "hit" || isUrl(this.path) || this.headers.normal.has("location") || !!this.body) {
      return "done";
    }
    if (phase === "none") {
      for (const locale of this.locales) {
        const localeRegExp = new RegExp(`/${locale}(/.*)`);
        const match = this.path.match(localeRegExp);
        const pathWithoutLocale = match?.[1];
        if (pathWithoutLocale && pathWithoutLocale in this.output) {
          this.path = pathWithoutLocale;
          break;
        }
      }
    }
    let pathExistsInOutput = this.path in this.output;
    if (!pathExistsInOutput && this.path.endsWith("/")) {
      const newPath = this.path.replace(/\/$/, "");
      pathExistsInOutput = newPath in this.output;
      if (pathExistsInOutput) {
        this.path = newPath;
      }
    }
    if (phase === "miss" && !pathExistsInOutput) {
      const should404 = !this.status || this.status < 400;
      this.status = should404 ? 404 : this.status;
    }
    let nextPhase = "miss";
    if (pathExistsInOutput || phase === "miss" || phase === "error") {
      nextPhase = "hit";
    } else if (shouldContinue) {
      nextPhase = getNextPhase(phase);
    }
    return this.checkPhase(nextPhase);
  }
  async run(phase = "none") {
    this.checkPhaseCounter = 0;
    const result = await this.checkPhase(phase);
    if (this.headers.normal.has("location") && (!this.status || this.status < 300 || this.status >= 400)) {
      this.status = 307;
    }
    return result;
  }
};
async function handleRequest(reqCtx, config, output, buildMetadata) {
  const matcher = new RoutesMatcher(
    config.routes,
    output,
    reqCtx,
    buildMetadata,
    config.wildcard
  );
  const match = await findMatch(matcher);
  return generateResponse(reqCtx, match, output);
}
async function findMatch(matcher, phase = "none", skipErrorMatch = false) {
  const result = await matcher.run(phase);
  if (result === "error" || !skipErrorMatch && matcher.status && matcher.status >= 400) {
    return findMatch(matcher, "error", true);
  }
  return {
    path: matcher.path,
    status: matcher.status,
    headers: matcher.headers,
    searchParams: matcher.searchParams,
    body: matcher.body
  };
}
async function generateResponse(reqCtx, { path = "/404", status, headers, searchParams, body }, output) {
  const locationHeader = headers.normal.get("location");
  if (locationHeader) {
    if (locationHeader !== headers.middlewareLocation) {
      const paramsStr = [...searchParams.keys()].length ? `?${searchParams.toString()}` : "";
      headers.normal.set("location", `${locationHeader ?? "/"}${paramsStr}`);
    }
    return new Response(null, { status, headers: headers.normal });
  }
  let resp;
  if (body !== void 0) {
    resp = new Response(body, { status });
  } else if (isUrl(path)) {
    const url = new URL(path);
    applySearchParams(url.searchParams, searchParams);
    resp = await fetch(url, reqCtx.request);
  } else {
    resp = await runOrFetchBuildOutputItem(output[path], reqCtx, {
      path,
      status,
      headers,
      searchParams
    });
  }
  const newHeaders = headers.normal;
  applyHeaders(newHeaders, resp.headers);
  applyHeaders(newHeaders, headers.important);
  resp = new Response(resp.body, {
    ...resp,
    status: status || resp.status,
    headers: newHeaders
  });
  return resp;
}
async function main(fleekRequest) {
  globalThis.AsyncLocalStorage = AsyncLocalStorage;
  const envAsyncLocalStorage = new AsyncLocalStorage();
  const requestContextAsyncLocalStorage = new AsyncLocalStorage();
  globalThis.process = {
    env: new Proxy(
      {},
      {
        ownKeys: () => Reflect.ownKeys(envAsyncLocalStorage.getStore()),
        getOwnPropertyDescriptor: (_, ...args) => Reflect.getOwnPropertyDescriptor(
          envAsyncLocalStorage.getStore(),
          ...args
        ),
        get: (_, property) => Reflect.get(envAsyncLocalStorage.getStore(), property),
        set: (_, property, value) => Reflect.set(
          envAsyncLocalStorage.getStore(),
          property,
          value
        )
      }
    )
  };
  globalThis[Symbol.for("__fleek-request-context__")] = new Proxy(
    {},
    {
      ownKeys: () => Reflect.ownKeys(requestContextAsyncLocalStorage.getStore()),
      getOwnPropertyDescriptor: (_, ...args) => Reflect.getOwnPropertyDescriptor(
        requestContextAsyncLocalStorage.getStore(),
        ...args
      ),
      get: (_, property) => Reflect.get(
        requestContextAsyncLocalStorage.getStore(),
        property
      ),
      set: (_, property, value) => Reflect.set(
        requestContextAsyncLocalStorage.getStore(),
        property,
        value
      )
    }
  );
  const request = await adaptFleekRequestToFetch(fleekRequest);
  return envAsyncLocalStorage.run({}, async () => {
    return requestContextAsyncLocalStorage.run({ request }, async () => {
      const url = new URL(request.url);
      if (url.pathname.startsWith("/_next/image")) {
        const res2 = await handleImageResizingRequest(request, {
          buildOutput: __BUILD_OUTPUT__,
          assetsFetcher: globalThis.ASSETS,
          imagesConfig: define_CONFIG_default.images
        });
        return adaptFetchResponseToFleekResponse(res2);
      }
      const adjustedRequest = adjustRequestForVercel(request);
      const res = await handleRequest(
        {
          request: adjustedRequest,
          ctx: globalThis.CONTEXT,
          assetsFetcher: globalThis.ASSETS
        },
        define_CONFIG_default,
        __BUILD_OUTPUT__,
        define_BUILD_METADATA_default
      );
      const response = await adaptFetchResponseToFleekResponse(res);
      return response;
    });
  });
}
async function adaptFleekRequestToFetch(fleekRequest) {
  let url;
  if (fleekRequest.headers?.["origin"]) {
    url = new URL(`${fleekRequest.headers["origin"]}${fleekRequest.path}`);
  } else {
    url = new URL(`http://0.0.0.0${fleekRequest.path}`);
  }
  for (const [key, value] of Object.entries(fleekRequest.query ?? {})) {
    url.searchParams.append(key, value);
  }
  return new Request(url, {
    method: fleekRequest.method,
    headers: fleekRequest.headers,
    body: !fleekRequest.body ? null : typeof fleekRequest.body === "object" ? JSON.stringify(fleekRequest.body) : fleekRequest.body
  });
}
async function adaptFetchResponseToFleekResponse(response) {
  const headers = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return {
    status: response.status,
    headers,
    body: await response.bytes()
  };
}
export {
  main
};
