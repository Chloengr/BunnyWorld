<template>
  <div
    v-on:click="onclick($event)"
    v-bind:class="{
      'square is-flex is-justify-content-center is-align-items-center': !obstacle,
      'square obstacle is-flex is-justify-content-center is-align-items-center': obstacle,
    }"
  >
    <div class="big-icon" v-if="player && !obstacle">
      <img :src="`/img/bunny-${player.color}.png`" alt="Image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Square",
  props: ["obstacle", "player"],
  methods: {
    onclick(event) {
      console.log(event);
      console.log(this.$props.player);
      this.$props.player = {
        id: 1,
        color: "orange",
        name: "Marie",
        score: 250,
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.square {
  width: 100px;
  height: 100px;
  border: 1px solid black;
}

.obstacle {
  background-color: black;
}
</style>
