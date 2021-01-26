/* eslint-disable no-console */
import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
    },
    offline() { 
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
    
    /*messaging.useServiceWorker(self);
messaging.getToken(self, "BG8ptillr_PxWR8FT_KG8tgTbH7HS8Otc2Ilxov5uyNQB7PzGc0883kGV8HuD0PR4QylKQmuCzoR5UN2fg12l0A").then((currentToken) => {
  if (currentToken) {
    console.log("token : ", currentToken);
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});  */

  })

  /*messaging.usePublicVapidKey("BG8ptillr_PxWR8FT_KG8tgTbH7HS8Otc2Ilxov5uyNQB7PzGc0883kGV8HuD0PR4QylKQmuCzoR5UN2fg12l0A");
  messaging.onBackgroundMessage(function(payload) {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
    body: payload.data.message,
    data: { url:payload.data.onClick }, //the url which we gonna use later
    };
    return self.registration.showNotification(notificationTitle,notificationOptions);
  });*/
}
