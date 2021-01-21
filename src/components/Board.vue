<template>
  <section id="board">
    <div v-for="layout in layoutData" :key="layout.id">
      <div v-if="layout.id === boardId">
        <div class="is-flex">
          <div v-for="(column, x) in layout.columns" :key="x">
            <div v-for="(cell, y) in getCells(column)" :key="y">
              <div v-on:click="move(x, y)">
                <Square
                  v-if="layout.id === 1"
                  :lava="cell ? cell.lava : null"
                  :ground="cell ? cell.ground : null"
                  :dirt="cell ? cell.dirt : null"
                  :x="x"
                  :y="y"
                  :ref="`x${x}y${y}`"
                  :player="x === player.x && y === player.y ? player : null"
                />
                <!-- Pour l'instant une seule grille -->
              </div>
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
export default {
  name: "Board",
  props: ["boardId"],
  components: { Square },
  data() {
    return {
      player: json.currentPlayer,
      layoutData: layoutJSON.game,
      length: 0,
      walkableSquares: this.$nextTick(() => {
        return this.walkableZone();
      })
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
    walkableZone() {
      const directions = [
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: -1, y: 0 }
      ];
      const walkableSquares = [];
      directions.forEach(dir => {
        const target = { x: this.player.x + dir.x, y: this.player.y + dir.y };
        const ref = this.$refs[`x${target.x}y${target.y}`];
        if (ref && !ref[0].lava && !ref[0].bush) {
          walkableSquares.push(ref);
        }
      });
      walkableSquares.forEach(w => {
        w[0].$el.classList.add("walkable");
      });

      console.log("add", walkableSquares);

      return walkableSquares;
    },
    move(x, y) {
      const target = this.$refs[`x${x}y${y}`];
      if (this.walkableZone().includes(target)) {
        Object.keys(this.$refs).forEach(el => {
          this.$refs[el][0].$el.classList.remove("walkable");
        });
        this.$set(this.player, "x", x);
        this.$set(this.player, "y", y);
        this.walkableZone();
      }
    }
  }
};
</script>

<style scoped>
#board {
  overflow: scroll;
  height: 100vh;
}

.walkable {
  opacity: 0.5;
}
</style>
