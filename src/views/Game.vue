<template>
  <div>
    <h1>{{ msg }}</h1>
    <score v-if="!finDePartie" :nextPlayer="nextPlayer"></score>
    <rank v-if="finDePartie" :partieName="partieName"></rank>
  </div>
</template>

<script>
import Score from "../components/Score.vue";
import Rank from "../components/Rank.vue";
export default {
  components: { Score, Rank },
  name: "Game",
  data() {
    return {
      msg: "Partie en cours avec le plateau/parcours choisi",
      nextPlayer: "Marie",
      partieName: "Partie de la mort",
      finDePartie: true, // false to see ranking
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
