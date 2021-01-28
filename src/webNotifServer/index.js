const express = require("express");
const bodyParser = require("body-parser");
const webpush = require("web-push");
var cors = require("cors");
const firebase = require("firebase/app");
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyB8AS5DygKVAgOoD2bfsKBg3YxeAJFBOl8",
  authDomain: "bunnyworld-b439a.firebaseapp.com",
  projectId: "bunnyworld-b439a",
  storageBucket: "bunnyworld-b439a.appspot.com",
  messagingSenderId: "544559857649",
  appId: "1:544559857649:web:fceea184c7bd9e5f398e50",
  measurementId: "G-PYP8MNSL0P"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const publicVKey =
  "BFvj5SDZN52AHRmvW1qIYCUcVeuTfSHdR6j0TzgUk0zcW5X04CR5QvRQYcprgWudZ1N9pm2zmlFLluuNYtpPV5Q";
const privateVKey = "0t3mdE4X0L3H3lLe6kkD0GNg1cRXYzM8s_alvfLxt9c";
webpush.setVapidDetails("mailto:thomas.mary@ynov.com", publicVKey, privateVKey);

const app = express();
const port = 8000; // default port to listen
const corsOptions = {
  origin: "https://bunnyworld-b439a.web.app",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
// Serve all files in client
app.use(express.static("../front"));
app.use(bodyParser.json());
app.post("/subscription", async (req, res) => {
  console.log("req.body", req.body);
  res.header("Access-Control-Allow-Origin", "*");
  db.collection("notification").add({
    subscription: req.body.subscription,
    user_id: req.body.user
  });
  res.status(200).json({ status: "OK" });
});

app.get("/send-notification/:id", async (req, res) => {
  console.log(`Sending notification to client ${req.params.id}`);
  const subscriptionsForUser = await db
    .collection("notification")
    .where("user_id", "==", req.params.id)
    .get()
    .then(res => res.docs.map(doc => doc.data()));
  webpush
    .sendNotification(
      subscriptionsForUser[0].subscription,
      JSON.stringify({ title: "C'est à vous de jouer !" })
    )
    .catch(res => console.log(res));
  res.status(200).json({ status: "OK" });
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
