#!/usr/bin/env node
/**
 * patch-worker.mjs
 * 
 * Patches the OpenNext worker.js to serve static assets via env.ASSETS
 * and fall back to env.R2 when deployed on Cloudflare Pages.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const workerPath = join('.open-next', 'assets', '_worker.js');
const original = readFileSync(workerPath, 'utf-8');

// Add ASSETS-based and R2-based static file serving before the Next.js handler.
// Cloudflare Pages injects env.ASSETS and env.R2 automatically.
const patch = `
// Serve static assets via Cloudflare Pages ASSETS and R2 bindings
const url = new URL(request.url);
const pathname = url.pathname;
const hasExtension = /\\.[a-zA-Z0-9]+$/.test(pathname);
const isStaticPrefix = 
  pathname.startsWith('/_next/') ||
  pathname.startsWith('/building/') ||
  pathname.startsWith('/icons/') ||
  pathname.startsWith('/identity/') ||
  pathname.startsWith('/videos/') ||
  pathname.startsWith('/plants/') ||
  pathname.startsWith('/gallery/');
const isStaticFile = 
  pathname === '/favicon.ico' ||
  pathname === '/favicon.png' ||
  pathname === '/intro.jpg' ||
  pathname === '/portada_venecia.png' ||
  pathname === '/BUILD_ID';

const isStaticAsset = hasExtension || isStaticPrefix || isStaticFile;

if (isStaticAsset) {
  // 1. Try to serve from Pages assets (public folder / next static assets)
  if (env.ASSETS) {
    try {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        if (!assetResponse.headers.has('cache-control')) {
          const headers = new Headers(assetResponse.headers);
          headers.set('cache-control', 'public, max-age=31536000, immutable');
          return new Response(assetResponse.body, { status: assetResponse.status, headers });
        }
        return assetResponse;
      }
    } catch (_) {
      // ignore and try next
    }
  }

  // 2. Try to serve from R2 bucket if not found in assets, via the edge cache
  if (env.R2) {
    try {
      let key = pathname.startsWith('/') ? pathname.slice(1) : pathname;
      if (key.startsWith('api/r2/')) {
        key = key.slice('api/r2/'.length);
      }

      const cache = caches.default;
      const cacheKey = new Request(url.toString(), request);
      const rangeHeader = request.headers.get('range');

      if (!rangeHeader) {
        const cached = await cache.match(cacheKey);
        if (cached) return cached;
      }

      const r2Options = rangeHeader ? { range: request.headers, onlyIf: undefined } : {};
      const object = await env.R2.get(key, r2Options);
      if (object !== null) {
        const headers = new Headers();
        if (object.httpMetadata) {
          if (object.httpMetadata.contentType) headers.set("content-type", object.httpMetadata.contentType);
          if (object.httpMetadata.contentLanguage) headers.set("content-language", object.httpMetadata.contentLanguage);
          if (object.httpMetadata.contentDisposition) headers.set("content-disposition", object.httpMetadata.contentDisposition);
          if (object.httpMetadata.contentEncoding) headers.set("content-encoding", object.httpMetadata.contentEncoding);
        }
        headers.set("cache-control", "public, max-age=31536000, immutable");
        if (object.httpEtag) {
          headers.set("etag", object.httpEtag);
        }
        headers.set("accept-ranges", "bytes");

        const isRanged = 'range' in object && object.range;
        if (isRanged) {
          const { offset, length } = object.range;
          const totalSize = object.size;
          headers.set("content-range", \`bytes \${offset}-\${offset + length - 1}/\${totalSize}\`);
          headers.set("content-length", length.toString());
          return new Response(object.body, { status: 206, headers });
        }

        headers.set("content-length", object.size.toString());
        const response = new Response(object.body, { status: 200, headers });
        ctx.waitUntil(cache.put(cacheKey, response.clone()));
        return response;
      }
    } catch (e) {
      console.error("R2 fallback worker error:", e);
    }
  }
}
`;

// Insert the patch right before the existing URL parsing
const insertBefore = 'const url = new URL(request.url);';

if (original.includes('// Patched by patch-worker.mjs')) {
  console.log('Worker already patched, skipping.');
  process.exit(0);
}

if (!original.includes(insertBefore)) {
  console.error('Could not find insertion point in worker.js');
  process.exit(1);
}

const patched = original.replace(
  insertBefore,
  `// Patched by patch-worker.mjs\n${patch}`
);

writeFileSync(workerPath, patched);
console.log('✅ Worker patched: static assets will be served via env.ASSETS and env.R2 fallback');
