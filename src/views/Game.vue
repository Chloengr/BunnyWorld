<template>
  <div>
    <score v-if="!finDePartie" :nextPlayer="nextPlayer"></score>
    <rank v-if="finDePartie" :partieName="partieName"></rank>
    <boardOne v-if="$route.params.id == 1"></boardOne>
    <boardTwo v-if="$route.params.id == 2"></boardTwo>
  </div>
</template>

<script>
import Score from "../components/Score.vue";
import Rank from "../components/Rank.vue";
import json from "../data/data.json";
import BoardOne from "../components/BoardOne.vue";
import BoardTwo from "../components/BoardTwo.vue";
export default {
  components: { Score, Rank, BoardOne, BoardTwo },
  name: "Game",
  data() {
    return {
      nextPlayer: json.nextPlayer,
      partieName: json.partieName,
      finDePartie: json.finDePartie, // false to see ranking - true to see score
      msg: "Partie en cours avec le plateau/parcours choisi"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
