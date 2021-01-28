const express = require('express');
const bodyParser = require('body-parser');
const webpush = require('web-push');

const publicVKey = "BIX8fYKHsaQVuedKeOkra9Fn4j_nKKGzm6IgLVf2j1xoazaqTTL8Wq6D7PREfKqwgWKyTgSMzMWa359YryBmG0k";
const privateVKey = "zMYOV-ZE34HyoH_JvOHxNNKXZEEMpz5r93Gz7h5rudw";

webpush.setVapidDetails('mailto:thomas.mary@ynov.com', publicVKey, privateVKey);

const app = express();
const port = 8000; // default port to listen

const subDB = [];

const getRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

// Serve all files in client
app.use(express.static('../front'));
app.use(bodyParser.json());

app.post('/subscription', async(req, res) => {
    console.log(req.body);
    subDB.push(req.body);
    res.status(200).json({ status: "OK" });
});
app.get('/send-notification/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    console.log(`Sending notification to client ${id}`);
    if (id === NaN || id < 0 || id >= subDB.length) {
        res.status(400).json({ status: "BAD_REQUEST", message: "Id was invalid" });
        return;
    }
    await webpush.sendNotification(subDB[id], JSON.stringify({ woof: getRandom(["Woof!", "Woof woof!", "Bark bark bark!", "Awooooo"]) }));
    res.status(200).json({ status: "OK" });
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});