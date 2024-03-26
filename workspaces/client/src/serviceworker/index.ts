/// <reference types="@types/serviceworker" />
self.addEventListener('install', (ev: ExtendableEvent) => {
  ev.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (ev: ExtendableEvent) => {
  ev.waitUntil(self.clients.claim());
});

// self.addEventListener('fetch', (ev: FetchEvent) => {
//   ev.respondWith(
//     queue.add(() => onFetch(ev.request), {
//       throwOnTimeout: true,
//     }),
//   );
// });

// async function onFetch(request: Request): Promise<Response> {
//   // サーバーの負荷を分散するために Jitter 処理をいれる

//   const res = await fetch(request);

//   if (res.headers.get('Content-Type') === 'image/jxl') {
//     return await transformJpegXLToBmp(res);
//   } else {
//     return res;
//   }
// }
