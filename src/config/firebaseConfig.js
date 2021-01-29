import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import '@firebase/messaging';

//<script src="https://www.gstatic.com/firebasejs/4.2.0/firebase-messaging.js"/>
//import serviceWorker from "../registerServiceWorker";

var firebaseConfig = {
  apiKey: "AIzaSyB8AS5DygKVAgOoD2bfsKBg3YxeAJFBOl8",
  authDomain: "bunnyworld-b439a.firebaseapp.com",
  projectId: "bunnyworld-b439a",
  storageBucket: "bunnyworld-b439a.appspot.com",
  messagingSenderId: "544559857649",
  appId: "1:544559857649:web:fceea184c7bd9e5f398e50",
  measurementId: "G-PYP8MNSL0P",
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const messaging = firebase.messaging();
/*
//Custom function made to run firebase service
getStartToken();
//This code recieve message from server /your app and print message to console if same tab is opened as of project in browser
messaging.onMessage(function(payload) {
  console.log("on Message", payload);
});
function getStartToken() {
  messaging
    .getToken(serviceWorker.register(), "BG8ptillr_PxWR8FT_KG8tgTbH7HS8Otc2Ilxov5uyNQB7PzGc0883kGV8HuD0PR4QylKQmuCzoR5UN2fg12l0A")
    .then((currentToken) => {
      if (currentToken) {
        sendTokenToServer(currentToken);
      } else {
        // Show permission request.
        RequestPermission();
        setTokenSentToServer(false);
      }
    })
    .catch((err) => {
      setTokenSentToServer(false);
      console.log(err);
    });
}

function RequestPermission() {
  messaging.requestPermission().then(function(permission) {
    if (permission === "granted") {
      console.log("have Permission");
      //calls method again and to sent token to server
      getStartToken();
    } else {
      console.log("Permission Denied");
    }
  });
}

function sendTokenToServer(token) {
  if (!isTokensendTokenToServer()) {
    $.ajax({
      url: URL,
      type: "POST",
      data: {
        //whatever you wanna send
        push_token: token
      },
      success: function(response) {
        setTokenSentToServer(true);
        console.log(response);
      },
      error: function(err) {
        setTokenSentToServer(false);
        console.log(err);
      },
    });
  }
}
function isTokensendTokenToServer() {
  return window.localStorage.getItem("sendTokenToServer") === "1";
}
function setTokenSentToServer(sent) {
  window.localStorage.setItem("sendTokenToServer", sent ? "1" : "0");
}*/

export { db, auth, messaging };
