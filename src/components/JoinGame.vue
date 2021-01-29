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
import router from "../router";

export default {
  name: "JoinGame",
  data() {
    return {
      link: null,
      players: [],
      currentUser: auth.currentUser
    };
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        console.log(this.user);
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    // avoid same x and y for new player
    randNum(limit, absc) {
      let rand = Math.floor(Math.random() * limit) + 1;
      console.log(absc, rand);
      if (rand == absc) rand(limit);
      else return rand;
    },
    // join existing game, checking if already in it, if game not full
    // and then add player in that game with random x, y
    joinGame() {
      db.collection("game")
        .doc(this.link)
        .get()
        .then(game => {
          const res = game.data();
          res.players.map(p => {
            if (this.currentUser.uid == p.user) {
              alert("Vous êtes déjà dans cette partie");
            } else if (Object.keys(res.players).length >= res.nbPlayer) {
              alert("La partie est FULL");
            } else {
              db.collection("player")
                .add({
                  id:
                    "_" +
                    Math.random()
                      .toString(36)
                      .substr(2, 9),
                  life: 5,
                  score: 0,
                  weapon_id: null,
                  x: this.randNum(13, p.x),
                  y: this.randNum(13, p.y),
                  your_turn: false,
                  user: this.user.uid,
                  color: this.user.photoURL,
                  name: this.user.displayName
                })
                .then(player => {
                  db.collection("player")
                    .doc(player.id)
                    .get()
                    .then(data => {
                      this.players.push(data.data());
                      db.collection("game")
                        .doc(this.link)
                        .update({
                          players: firebase.firestore.FieldValue.arrayUnion(
                            ...this.players
                          )
                        })
                        .then(() => {
                          console.log(
                            "player added and game updated",
                            this.players,
                            game.id
                          );
                          router.push({ path: `/game/${game.id}` });
                        })
                        .catch(error => {
                          console.error("Error writing game document: ", error);
                        });
                    })
                    .catch(error => {
                      console.error("Error writing player document: ", error);
                    });
                });
            }
          });
        });
    }
  }
};
</script>

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
