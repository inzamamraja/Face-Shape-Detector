navigator.serviceWorker.ready.then(swRegistration => {
  return swRegistration.sync.register("sync-data");
});
