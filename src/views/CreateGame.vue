<template>
  <div
    class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center mb-4"
  >
    <figure class="image big-icon">
      <img src="/img/play.png" alt="Image" />
    </figure>
    <form
      id="app"
      @submit="initGame"
      action="/"
      method="post"
      class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center mb-5"
    >
      <b-field>
        <b-input
          v-model="name"
          placeholder="Nom de la partie"
          maxlength="30"
        ></b-input>
      </b-field>
      <b-field>
        <b-input v-model="nbPlayer" placeholder="Nombre de joueurs"></b-input>
      </b-field>
      <b-field class="mt-2">
        <b-select placeholder="Quel plateau ?" v-model="board_number">
          <option value="1">Plateau 1</option>
          <option value="2">Plateau 2</option>
        </b-select>
      </b-field>
    </form>
    <div v-if="errors.length" class="mb-5">
      <small class="has-text-error">Attention ! </small>
      <small class="has-text-error" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </small>
    </div>
    <button
      class="button is-primary is-rounded mb-4"
      @click="initGame(name, board_number, nbPlayer)"
    >
      C'est parti !
    </button>
    <b-notification v-model="isActive" aria-close-label="Close notification">
      Donne à tes amis le code pour te rejoindre dans la partie :
      {{ this.gameCreatedId }}
    </b-notification>
    <button
      v-if="this.gameCreatedId"
      class="button is-primary is-rounded mb-4"
      @click="$router.push('/')"
    >
      Retourner à mes parties
    </button>
  </div>
</template>

<script>
import { db, auth } from "../config/firebaseConfig";

export default {
  name: "CreateGame",
  data() {
    return {
      msg: "Créer une partie",
      labelPosition: "on-border",
      errors: [],
      name: null,
      nbPlayer: null,
      board_number: 1,
      players: [],
      user: auth.currentUser,
      isActive: false,
      gameCreatedId: null,
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
    initGame(name, board_number, nbPlayer) {
      db.collection("player")
        .add({
          id: "_" + Math.random().toString(36).substr(2, 9),
          life: 5,
          score: 0,
          weapon_id: null,
          x: Math.floor(Math.random() * 13),
          y: Math.floor(Math.random() * 13),
          your_turn: true,
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
                .add({
                  board_number: parseInt(board_number),
                  name: name,
                  nbPlayer: parseInt(nbPlayer),
                  players: this.players,
                })
                .then((res) => {
                  this.gameCreatedId = res.id;

                  console.log("Game successfully written!");
                  this.isActive = true;
                })
                .catch((error) => {
                  console.error("Error writing game document: ", error);
                });
              console.log("Player successfully written!");
            });
        })
        .catch((error) => {
          console.error("Error writing player document: ", error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
