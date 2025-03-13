/// <reference types="@types/serviceworker" />

import { transformJpegXLToBmp } from './transformJpegXLToBmp';

self.addEventListener('install', (ev: ExtendableEvent) => {
  ev.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (ev: ExtendableEvent) => {
  ev.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (ev: FetchEvent) => {
  ev.respondWith(
    onFetch(ev.request).catch((err) => {
      console.error(err);
      return new Response(null, { status: 500 });
    }),
  );
});

async function onFetch(request: Request): Promise<Response> {
  const res = await fetch(request);

  if (res.headers.get('Content-Type') === 'image/jxl') {
    return transformJpegXLToBmp(res);
  } else {
    return res;
  }
}
