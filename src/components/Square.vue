<template>
  <div
    v-on:click="onclick($event)"
    v-bind:class="{
      'square dirt is-flex is-justify-content-center is-align-items-center': dirt,
      'square ground is-flex is-justify-content-center is-align-items-center': ground,
      'square grass is-flex is-justify-content-center is-align-items-center': grass,
      'square bush is-flex is-justify-content-center is-align-items-center': bush,
      'square lava is-flex is-justify-content-center is-align-items-center': lava
    }"
  >
    <div class="big-icon" v-if="player && !lava && !bush">
      <img :src="`/img/bunny-${player.color}.png`" alt="Image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Square",
  props: ["player", "dirt", "ground", "grass", "bush", "lava"],
  methods: {
    onclick(event) {
      console.log(event);
      console.log(this.$props.player);
      this.$props.player = {
        id: 1,
        color: "orange",
        name: "Marie",
        score: 250
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.square {
  width: 100px;
  height: 100px;
}
.dirt {
  background-image: url("/img/dirtTile.svg");
}
.lava {
  background-image: url("/img/lavaTile.svg");
}
.bush {
  background-image: url("/img/bushTile.svg");
}
.ground {
  background-image: url("/img/groundTile.svg");
}
.grass {
  background-image: url("/img/grassTile.svg");
}
</style>
