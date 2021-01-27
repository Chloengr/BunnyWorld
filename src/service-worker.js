importScripts("https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js"
);
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener("push", event => {
  console.log(event);
  const message = event.data.json();
  self.registration
    .showNotification(message.title, {
      body: "Le joueur précédent a terminé, c'est à vous",
      icon: "../public/img/logo.png"
    })
    .then(res => console.log(res));
});

self.addEventListener("notificationclick", event => {
  event.preventDefault();
  event.notification.close();
  clients.openWindow("/");
});
