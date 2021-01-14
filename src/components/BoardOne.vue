<template>
  <div id="board">
    <div v-for="layout in layoutData" :key="layout.id">
      <p v-if="layout.id === 1">
        {{ layout.id }}
      </p>
    </div>
  </div>
</template>

<script>
// import Square from "./Square.vue";
import layoutJSON from "../data/games-layout.json";

export default {
  name: "BoardOne",
  // components: { Square },
  data() {
    return {
      player: { id: 1, color: "orange", name: "Marie", score: 250 },
      layoutData: layoutJSON.game
    };
  }
};
console.log("JSON", layoutJSON.game[0].id);
</script>

<style scoped></style>
