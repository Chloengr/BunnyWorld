<template>
  <section id="board">
    <div v-for="layout in layoutData" :key="layout.id">
      <div v-if="layout.id === boardId">
        <div class="is-flex">
          <div v-for="column in layout.columns" :key="column.id">
            <div v-for="cell in getCells(column)" :key="cell">
              <Square
                v-if="layout.id === 1"
                :lava="cell ? cell.lava : null"
                :ground="cell ? cell.ground : null"
                :dirt="cell ? cell.dirt : null"
              />
              <Square
                v-if="layout.id === 2"
                :bush="cell.bush"
                :grass="cell.grass"
                :dirt="cell.dirt"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Square from "./Square.vue";
import layoutJSON from "../data/games-layout.json";
import json from "../data/data.json";
// div displayflex pour etre a la ligne
export default {
  name: "BoardOne",
  props: ["boardId"],
  components: { Square },
  data() {
    return {
      player: json.currentPlayer,
      layoutData: layoutJSON.game,
    };
  },
  methods: {
    getCells(column) {
      let cells = [];
      for (let i = 0; i < 14; i++) {
        cells.push(column[i]);
      }
      return cells;
    },
  },
};
</script>

<style scoped>
#board {
  overflow: scroll;
  height: 100vh;
}
</style>
