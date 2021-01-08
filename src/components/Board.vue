<template>
  <div class="is-flex">
    <div>
      <square :obstacle="true"></square>
      <square :obstacle="false"></square>
      <square :obstacle="false"></square>
    </div>
    <div>
      <square :obstacle="true"></square>
      <square :obstacle="false"></square>
      <square :obstacle="true"></square>
    </div>
    <div>
      <square :obstacle="true"></square>
      <square :obstacle="true"></square>
      <square :obstacle="true"></square>
    </div>
    <div>
      <square :obstacle="false"></square>
      <square :obstacle="false"></square>
      <square :obstacle="true"></square>
    </div>
  </div>
</template>

<script>
import Square from "./Square.vue";
export default {
  name: "Board",
  components: { Square },
  data() {
    return {
      player: { id: 1, color: "orange", name: "Marie", score: 250 },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
