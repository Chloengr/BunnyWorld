importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');
//import {messaging} from "./config/firebaseConfig";

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

var firebaseConfig = {
    apiKey: "AIzaSyB8AS5DygKVAgOoD2bfsKBg3YxeAJFBOl8",
    authDomain: "bunnyworld-b439a.firebaseapp.com",
    projectId: "bunnyworld-b439a",
    storageBucket: "bunnyworld-b439a.appspot.com",
    messagingSenderId: "544559857649",
    appId: "1:544559857649:web:fceea184c7bd9e5f398e50",
    measurementId: "G-PYP8MNSL0P",
  };
  
  /*self.addEventListener('push', (event) => {
    const message = event.data.json();
    self.registration.showNotification(message.woof, { body : "The app has barked at you!", icon : "/assets/icon_maskable.png", badge : "/assets/logo.svg", actions : [ {"action" : "action1", "title" : "Action 1"},  {"action" : "action2", "title" : "Action 2"}]});
});

self.addEventListener("notificationclick", (event) => {
    event.preventDefault();
    event.notification.close();
    if(event.action){
        event.waitUntil(self.clients.openWindow(`/?origin=${event.action}`));
    }
    else{
        event.waitUntil(self.clients.openWindow("/?origin=noaction"));
    }
    
});*/
  
/*  firebase.initializeApp(firebaseConfig);
  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });

  messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...
  });*/