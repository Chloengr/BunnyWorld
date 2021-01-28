<template>
  <div>
    <score v-if="!finDePartie" :nextPlayer="nextPlayer"></score>
    <rank v-if="finDePartie" :partieName="currentGame[0].name"></rank>
    <board
      :currentGame="currentGame[0]"
      :players="currentGame[0].players"
    ></board>
    <button class="button is-rounded is-primary" @click="alert">
      Regardez, une arme !
    </button>
    <button class="button is-rounded is-primary" @click="displayPlayer">
      Regardez, un lapin !
    </button>
  </div>
</template>

<script>
import Score from "../components/Score.vue";
import Rank from "../components/Rank.vue";
import json from "../data/data.json";
import Board from "../components/Board.vue";
import WeaponDetailsVue from "../components/WeaponDetails.vue";
import PlayerDetailsVue from "../components/PlayerDetails.vue";
import { auth, db } from "../config/firebaseConfig";

export default {
  components: { Score, Rank, Board },
  name: "Game",
  data() {
    return {
      nextPlayer: json.nextPlayer,
      finDePartie: json.finDePartie, // false to see ranking - true to see score
      msg: "Partie en cours avec le plateau/parcours choisi",
      currentGame: [],
    };
  },
  created() {
    db.collection("game")
      .doc(this.$route.params.id)
      .get()
      .then((res) => this.currentGame.push(res.data()));
  },
  methods: {
    alert() {
      this.$buefy.modal.open({
        parent: this,
        props: { weapon: json.weapon },
        component: WeaponDetailsVue,
        hasModalCard: true,
        trapFocus: true,
      });
    },
    displayPlayer() {
      this.$buefy.modal.open({
        parent: this,
        props: { player: auth.currentUser, weapon: json.weapon },
        component: PlayerDetailsVue,
        hasModalCard: true,
        trapFocus: true,
      });
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
