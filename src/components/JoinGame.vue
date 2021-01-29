<template>
  <div class="card">
    <div class="card-content">
      <div
        class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center mb-4"
      >
        <div class="p-3">
          <p class="has-text-primary mb-5">
            Entrez le lien de la partie pour y accéder
          </p>
        </div>
        <form
          id="app"
          @submit="joinGame"
          action="/"
          method="post"
          class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center mb-5"
        >
          <b-field>
            <b-input
              v-model="link"
              placeholder="Lien de la partie"
              maxlength="30"
            ></b-input>
          </b-field>
        </form>
        <button
          class="button is-primary is-rounded mb-4 mr-4"
          @click="joinGame()"
        >
          C'est parti !
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

import { db, auth } from "../config/firebaseConfig";
import { firebase } from "@firebase/app";
import router from "../router";

export default {
  name: "JoinGame",
  data() {
    return {
      link: null,
      players: [],
      currentUser: auth.currentUser,
      user: null,
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    // avoid same x and y for new player
    randNum(limit, absc) {
      let rand = Math.floor(Math.random() * limit) + 1;
      if (rand == absc) this.randNum(limit);
      else return rand;
    },
    // join existing game, checking if already in it, if game not full
    // and then add player in that game with random x, y
    joinGame() {
      db.collection("game")
        .doc(this.link)
        .get()
        .then((res) => {
          res.data().players.map((p) => {
            if (this.currentUser.uid === p.user) {
              alert("Vous êtes déjà dans cette partie");
            } else if (res.data().players.length >= res.data().nbPlayer) {
              alert("La partie est full");
            } else {
              //alert("La partie est accessible");
              console.log("true");
              db.collection("player")
                .add({
                  id: "_" + Math.random().toString(36).substr(2, 9),
                  life: 5,
                  score: 0,
                  weapon_id: null,
                  x: this.randNum(13, p.x),
                  y: this.randNum(13, p.y),
                  your_turn: false,
                  user: this.user.uid,
                  color: this.user.photoURL,
                  name: this.user.displayName,
                })
                .then((player) => {
                  this.getPlayer(player);
                })
                .catch((error) => {
                  console.error("Error getPlayers : ", error);
                });
            }
          });
        });
    },
    async getPlayer(player) {
      const snapshot = await db.collection("player").doc(player.id).get();
      this.players.push(snapshot.data());
      console.log("AFTER", this.players);

      const gameRef = await db.collection("game").doc(this.link);
      gameRef
        .update({
          players: firebase.firestore.FieldValue.arrayUnion(...this.players),
        })
        .then(() => {
          console.log("SUCCESS");
          router.push({ path: `/game/${this.link}` });
        })
        .catch((err) => console.log("ERROR => ", err));
    },
  },
};
</script>
