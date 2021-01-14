<template>
  <section id="board">
    <div v-for="layout in layoutData" :key="layout.id">
      <div v-if="layout.id === 2">
        <div class="is-flex">
          <div class="row">
            <div v-for="column in layout.columnOne" :key="column.id">
              <Square
                :bush="column.bush"
                :grass="column.grass"
                :dirt="column.dirt"
              />
            </div>
          </div>
          <div class="row">
            <div v-for="column in layout.columnTwo" :key="column.id">
              <Square
                :bush="column.bush"
                :grass="column.grass"
                :dirt="column.dirt"
              />
            </div>
          </div>
          <div class="row">
            <div v-for="column in layout.columnThree" :key="column.id">
              <Square
                :bush="column.bush"
                :grass="column.grass"
                :dirt="column.dirt"
              />
            </div>
          </div>
          <div class="row">
            <div v-for="column in layout.columnFour" :key="column.id">
              <Square
                :bush="column.bush"
                :grass="column.grass"
                :dirt="column.dirt"
              />
            </div>
          </div>
          <div class="row">
            <div v-for="column in layout.columnFive" :key="column.id">
              <Square
                :bush="column.bush"
                :grass="column.grass"
                :dirt="column.dirt"
              />
            </div>
          </div>
          <div class="row">
            <div v-for="column in layout.columnSix" :key="column.id">
              <Square
                :bush="column.bush"
                :grass="column.grass"
                :dirt="column.dirt"
              />
            </div>
          </div>
          <div class="row">
            <div v-for="column in layout.columnSeven" :key="column.id">
              <Square
                :bush="column.bush"
                :grass="column.grass"
                :dirt="column.dirt"
              />
            </div>
          </div>
          <div class="row">
            <div v-for="column in layout.columnEight" :key="column.id">
              <Square
                :bush="column.bush"
                :grass="column.grass"
                :dirt="column.dirt"
              />
            </div>
          </div>
          <div class="row">
            <div v-for="column in layout.columnNine" :key="column.id">
              <Square
                :bush="column.bush"
                :grass="column.grass"
                :dirt="column.dirt"
              />
            </div>
          </div>
          <div class="row">
            <div v-for="column in layout.columnTen" :key="column.id">
              <Square
                :bush="column.bush"
                :grass="column.grass"
                :dirt="column.dirt"
              />
            </div>
          </div>
          <div class="row">
            <div v-for="column in layout.columnEleven" :key="column.id">
              <Square
                :bush="column.bush"
                :grass="column.grass"
                :dirt="column.dirt"
              />
            </div>
          </div>
          <div class="row">
            <div v-for="column in layout.columnTwelve" :key="column.id">
              <Square
                :bush="column.bush"
                :grass="column.grass"
                :dirt="column.dirt"
              />
            </div>
          </div>
          <div class="row">
            <div v-for="column in layout.columnThirteen" :key="column.id">
              <Square
                :bush="column.bush"
                :grass="column.grass"
                :dirt="column.dirt"
              />
            </div>
          </div>
          <div class="row">
            <div v-for="column in layout.columnFourteen" :key="column.id">
              <Square
                :bush="column.bush"
                :grass="column.grass"
                :dirt="column.dirt"
              />
            </div>
          </div>
          <div class="row">
            <div v-for="column in layout.columnFifteen" :key="column.id">
              <Square
                :bush="column.bush"
                :grass="column.grass"
                :dirt="column.dirt"
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
  name: "BoardTwo",
  components: { Square },
  data() {
    return {
      player: json.currentPlayer,
      layoutData: layoutJSON.game,
    };
  },
};
</script>

<style scoped>
.columns {
  display: flex;
  flex-direction: row;
}
</style>
