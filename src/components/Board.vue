<template>
  <section id="board">
    <div v-for="layout in layoutData" :key="layout.id">
      <div v-if="layout.id === currentGame.board_number">
        <div class="is-flex">
          <div v-for="(column, x) in layout.columns" :key="x">
            <div v-for="(cell, y) in getCells(column)" :key="y">
              <div v-on:click="move(x, y)">
                <Square
                  :lava="cell ? cell.lava : null"
                  :ground="cell ? cell.ground : null"
                  :dirt="cell ? cell.dirt : null"
                  :grass="cell ? cell.grass : null"
                  :bush="cell ? cell.bush : null"
                  :x="x"
                  :y="y"
                  :ref="`x${x}y${y}`"
                  :player="playerInMap(x, y)"
                />
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
import { db, auth } from "../config/firebaseConfig";
import { firebase } from "@firebase/app";

export default {
  name: "Board",
  props: ["currentGame", "players"],
  components: { Square },
  data() {
    return {
      layoutData: layoutJSON.game,
      length: 0,
      walkableSquares: this.$nextTick(() => {
        return this.walkableZone();
      }),
      user: null,
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    getCells(column) {
      let cells = [];
      for (let i = 0; i < 14; i++) {
        cells.push(column[i]);
      }
      return cells;
    },
    playerInMap(x, y) {
      const tab = [];
      this.players.forEach((player) => {
        if (x === player.x && y === player.y) {
          tab.push(player);
        }
      });
      return tab[0];
    },
    walkableZone() {
      const directions = [
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: -1, y: 0 },
      ];
      const walkableSquares = [];
      directions.forEach((dir) => {
        this.players.map((p) => {
          if (this.user.uid === p.user) {
            const target = {
              x: p.x + dir.x,
              y: p.y + dir.y,
            };
            const ref = this.$refs[`x${target.x}y${target.y}`];
            if (ref && !ref[0].lava && !ref[0].bush) {
              walkableSquares.push(ref);
            }
          }
        });
      });
      walkableSquares.forEach((w) => {
        w[0].$el.classList.add("walkable");
      });

      return walkableSquares;
    },
    // When move set x, y , your turn to new values and set it to players, managing turns
    move(x, y) {
      const target = this.$refs[`x${x}y${y}`];
      if (this.walkableZone().includes(target)) {
        Object.keys(this.$refs).forEach((el) => {
          this.$refs[el][0].$el.classList.remove("walkable");
        });

        const gameRef = db.collection("game").doc(this.$route.params.id);

        this.players.map((p, i) => {
          if (this.user.uid === p.user && p.your_turn) {
            this.$set(p, "x", x);
            this.$set(p, "y", y);
            this.walkableZone();
            this.$set(p, "your_turn", false);

            if (i + 1 < this.players.length) {
              this.$set(this.players[i + 1], "your_turn", true);
            } else if (i + 1 >= this.players.length) {
              this.$set(this.players[0], "your_turn", true);
            }
          }
          gameRef
            .set({
              board_number: this.currentGame.board_number,
              name: this.currentGame.name,
              nbPlayer: this.currentGame.nbPlayer,
              players: firebase.firestore.FieldValue.arrayUnion(
                ...this.players
              ),
            })
            .then(() => {
              console.log("Set changes : ", this.players);
            })
            .catch((error) => {
              console.error("Error : ", error);
            });
        });
      }
    },
  },
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
