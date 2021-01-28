<template>
  <div class="card">
    <div class="card-content">
      <div
        class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center mb-4"
      >
        <div class="text-block">
          <h1>{{ msg }}</h1>
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
import { db, auth } from "../config/firebaseConfig";
import { firebase } from "@firebase/app";

export default {
  name: "JoinGame",
  data() {
    return {
      msg: "Rejoindre une partie",
      link: null,
      players: [],
      currentUser: auth.currentUser,
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        console.log(this.user);
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    joinGame() {
      db.collection("game")
        .doc(this.link)
        .get()
        .then((game) => {
          const res = game.data();
          res.players.map((id) => {
            if (this.currentUser.uid == id.user) {
              alert("Vous êtes déjà dans cette partie");
            } else if (Object.keys(res.players).length >= res.nbPlayer) {
              alert("La partie est FULL");
            } else {
              db.collection("player")
                .add({
                  life: 0,
                  score: 0,
                  weapon_id: null,
                  x: 6,
                  y: 3,
                  your_turn: false,
                  user: this.user.uid,
                  color: this.user.photoURL,
                  name: this.user.displayName,
                })
                .then((player) => {
                  db.collection("player")
                    .doc(player.id)
                    .get()
                    .then((data) => {
                      this.players.push(data.data());
                      db.collection("game")
                        .doc(this.link)
                        .update({
                          players: firebase.firestore.FieldValue.arrayUnion(
                            ...this.players
                          ),
                        })
                        .then(() => {
                          console.log("game updated!", game.data());
                          console.log("player ajouté", this.players);
                        })
                        .catch((error) => {
                          console.error("Error writing game document: ", error);
                        });
                    })
                    .catch((error) => {
                      console.error("Error writing player document: ", error);
                    });
                });
            }
          });
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: bold;
  font-size: 40px;
  margin-bottom: 20px;
}
.text-block {
  width: 300px;
  padding: 20px;
}
</style>
