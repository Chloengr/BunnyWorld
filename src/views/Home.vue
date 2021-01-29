<template>
  <div
    class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-background-background mb-4"
  >
    {{ this.subscribeNotifs() }}
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
        <div v-if="this.games.length === 0" class="has-text-centered">
          Pas de parties en cours.
        </div>
        <div v-for="game in this.games" v-bind:key="game.id">
          <div v-for="player in game.game.players" v-bind:key="player.user">
            <div v-if="player.user === currentUser.uid">
              <div class="buttonGame" @click="$router.push(`/game/${game.id}`)">
                <card-score
                  :player="player"
                  :gameName="game.game.name"
                  class="mt-2"
                ></card-score>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentUser">
        <button
          class="button has-text-secondary is-outlined is-rounded mb-5"
          @click="$router.push(`/profile`)"
        >
          Modifier mon profil
        </button>
      </div>

      <div>
        <button
          class="button is-primary is-rounded mb-4 mr-4"
          @click="$router.push('/create')"
        >
          Créer une partie
        </button>
        <button
          class="button is-white is-rounded mb-4 ml-4"
          @click="displayJoinGame()"
        >
          Rejoindre une partie
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CardScore from "../components/CardScore";
import json from "../data/data.json";
import { auth, db } from "../config/firebaseConfig";
import JoinGameVue from "../components/JoinGame.vue";

export default {
  name: "Home",
  components: { CardScore },
  data() {
    return {
      colors: json.colors,
      user: null,
      currentUser: auth.currentUser,
      games: [],
    };
  },
  created() {
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
        .get()
        .then((res) => {
          res.docs.forEach((doc) => {
            const document = doc.data();

            document.players.forEach((player) => {
              playerToFind.forEach((pToFind) => {
                if (player.id === pToFind.id) {
                  +this.games.push({ game: doc.data(), id: doc.id });
                }
              });
            });
          });
        });
    },
    displayJoinGame() {
      this.$buefy.modal.open({
        parent: this,
        component: JoinGameVue,
        hasModalCard: true,
        trapFocus: true,
      });
    },
    subscribeNotifs() {
      if ("Notification" in window) {
        //si l'api est supportée par le navigateur
        Notification.requestPermission().then(async function () {
          //on lance la subscription pour le joueur actuel
          const publicVKey =
            "BFvj5SDZN52AHRmvW1qIYCUcVeuTfSHdR6j0TzgUk0zcW5X04CR5QvRQYcprgWudZ1N9pm2zmlFLluuNYtpPV5Q";
          const registration = await navigator.serviceWorker.ready;
          try {
            const urlBase64ToUint8Array = (base64String) => {
              const padding = "=".repeat((4 - (base64String.lenght % 4)) % 4);
              const base64 = (base64String + padding)
                //eslint-disable-next-line
                .replace(/\-/g, "+")
                .replace(/_/g, "/");
              const rawData = window.atob(base64);
              const outputArray = new Uint8Array(rawData.length);
              for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
              }
              return outputArray;
            };
            const subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(publicVKey),
            });
            fetch("http://localhost:8000/subscription", {
              method: "POST",
              body: JSON.stringify({
                subscription: subscription,
                user: auth.currentUser.uid,
              }),
              headers: { "content-type": "application/json" },
            });
          } catch (e) {
            console.log(e);
            console.log("la souscription a été refusée");
          }
        });
      }
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
.buttonGame {
  cursor: pointer;
}
</style>
