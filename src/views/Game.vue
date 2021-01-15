<template>
  <div>
    <score v-if="!finDePartie" :nextPlayer="nextPlayer"></score>
    <rank v-if="finDePartie" :partieName="partieName"></rank>
    <boardOne v-if="$route.params.id == 1" :boardId="1"></boardOne>
    <boardOne v-if="$route.params.id == 2" :boardId="2"></boardOne>
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
import BoardOne from "../components/BoardOne.vue";
import WeaponDetailsVue from "../components/WeaponDetails.vue";
import PlayerDetailsVue from "../components/PlayerDetails.vue";

export default {
  components: { Score, Rank, BoardOne },
  name: "Game",
  data() {
    return {
      nextPlayer: json.nextPlayer,
      partieName: json.partieName,
      finDePartie: json.finDePartie, // false to see ranking - true to see score
    };
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
