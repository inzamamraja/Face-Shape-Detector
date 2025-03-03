navigator.serviceWorker.ready.then(swRegistration => {
  return swRegistration.sync.register("sync-data");
  if ("serviceWorker" in navigator && "SyncManager" in window) {
    navigator.serviceWorker.ready.then(registration => {
        return registration.sync.register("sync-data");
    }).catch(err => console.error("Background sync failed:", err));
}
});
