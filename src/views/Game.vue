<template>
  <div>
    <h1>Partie en cours avec le plateau/parcours choisi"</h1>
    <score v-if="!finDePartie" :nextPlayer="nextPlayer"></score>
    <rank v-if="finDePartie" :partieName="partieName"></rank>
    <board></board>
  </div>
</template>



<script>
import Score from "../components/Score.vue";
import Rank from "../components/Rank.vue";
import Board from "../components/Board.vue";
import json from "../data/data.json";
export default {
  components: { Score, Rank, Board },
  name: "Game",
  data() {
    return {
      nextPlayer: json.nextPlayer,
      partieName: json.partieName,
      finDePartie: json.finDePartie, // false to see ranking - true to see score
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
