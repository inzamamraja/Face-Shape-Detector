self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("pwa-cache").then((cache) => {
      return cache.addAll([
        "Ani.html",
        "manifest.json",
        "icon.png"
      ]);
    })
  );
});
const CACHE_NAME = "face-shape-pwa-v1";
const urlsToCache = [
  "Adv.html",
  "manifest.json",
  "icon-192.png",
  "icon-512.png",
  "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js",
  "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/face_mesh.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
  self.addEventListener("sync", event => {
  if (event.tag === "sync-data") {
    event.waitUntil(
      fetch("/sync-endpoint")
        .then(response => response.json())
        .then(data => {
          console.log("Data synchronized:", data);
        })
        .catch(err => console.error("Sync failed:", err))
    );
  }
});});
