<template>
  <div>
    <h1>{{ msg }}</h1>
    <score :nextPlayer="nextPlayer"></score>
  </div>
</template>

<script>
import Score from "../components/Score.vue";
export default {
  components: { Score },
  name: "Game",
  data() {
    return {
      msg: "Partie en cours avec le plateau/parcours choisi",
      nextPlayer: "Marie",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
