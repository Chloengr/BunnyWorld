<template>
  <div
    class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-background-background mb-4"
  >
    <figure class="big-icon mt-6 mb-2">
      <img src="/img/carrot.png" />
    </figure>
    <p class="is-family-secondary is-size-1 has-text-black mb-5">
      BUNNY<br />
      WOLRD
    </p>

    <div
      class="form is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-background-white p-5"
    >
      <div class="mb-5 cards">
        <div v-if="this.onLine === false" class="has-text-centered">
          Vous êtes hors ligne.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import json from "../data/data.json";
import { auth, db } from "../config/firebaseConfig";
import JoinGameVue from "../components/JoinGame.vue";

export default {
  name: "Home",
  data() {
    return {
      colors: json.colors,
      user: null,
      currentUser: auth.currentUser,
      games: [],
      onLine: null,
    };
  },
  created() {
    this.onLine = navigator.onLine;
    console.log(this.onLine);
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user connected", user);
        this.user = user;
      } else {
        this.user = null;
      }
    });
    this.getGamesForAPlayer();
  },

  methods: {
    checkForm() {
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: this.name,
              photoURL: this.colorAvatar,
            })
            .then(() => {
              console.log(auth.currentUser);
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    async getGamesForAPlayer() {
      const playerToFind = await db
        .collection("player")
        .where("user", "==", this.currentUser.uid)
        .get()
        .then((res) => res.docs.map((doc) => doc.data()));

      db.collection("game")
        .where("players", "array-contains", playerToFind[0])
        .get()
        .then((res) => res.docs.forEach((doc) => this.games.push(doc.data())));
    },
    displayJoinGame() {
      this.$buefy.modal.open({
        parent: this,
        component: JoinGameVue,
        hasModalCard: true,
        trapFocus: true,
      });
    },
  },
};
</script>

<style>
.form {
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  width: 100%;
}
.cards {
  width: 90%;
}
</style>
