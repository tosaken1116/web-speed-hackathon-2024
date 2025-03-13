/// <reference types="@types/serviceworker" />

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

  return res;
}
