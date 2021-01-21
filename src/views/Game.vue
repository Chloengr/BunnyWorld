<template>
  <div>
    <score v-if="!finDePartie" :nextPlayer="nextPlayer"></score>
    <rank v-if="finDePartie" :partieName="partieName"></rank>
    <board v-if="$route.params.id == 1" :boardId="1"></board>
    <board v-if="$route.params.id == 2" :boardId="2"></board>
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

export default {
  components: { Score, Rank, Board },
  name: "Game",
  data() {
    return {
      nextPlayer: json.nextPlayer,
      partieName: this.getCurrentGame().partieName,
      finDePartie: json.finDePartie, // false to see ranking - true to see score
      msg: "Partie en cours avec le plateau/parcours choisi",
    };
  },
  methods: {
    getCurrentGame() {
      let currentGame = json.games.filter((g) => g.currentGame);
      return currentGame[0];
    },
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
        props: { player: json.currentPlayer, weapon: json.weapon },
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
