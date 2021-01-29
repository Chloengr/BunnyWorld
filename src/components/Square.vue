<template>
  <div
    v-bind:class="{
      'square dirt is-flex is-justify-content-center is-align-items-center': dirt,
      'square ground is-flex is-justify-content-center is-align-items-center': ground,
      'square grass is-flex is-justify-content-center is-align-items-center': grass,
      'square bush is-flex is-justify-content-center is-align-items-center': bush,
      'square lava is-flex is-justify-content-center is-align-items-center': lava,
    }"
  >
    <div class="big-icon" v-if="player && !lava && !bush">
      <p class="is-flex is-justify-content-center is-align-items-center">
        {{ player.name }}
      </p>
      <img :src="`/img/bunny-${player.color}.png`" alt="Image" />
    </div>
  </div>
</template>

<script>
import { db } from "../config/firebaseConfig";

export default {
  name: "Square",
  props: ["player", "dirt", "ground", "grass", "bush", "lava"],
  created() {
    console.log("coucou");
    console.log("avant", this.player);
    if (this.player && (this.lava || this.bush)) {
      console.log("cest un obstacle tu peux pas tmettre la");
      this.$set(this.player, "x", Math.floor(Math.random() * 13));
      this.$set(this.player, "y", Math.floor(Math.random() * 13));
      console.log("apres", this.player);
      const playerRef = db.collection("player").where("id", "==", this.player);
      playerRef
        .set({ x: this.player.x, y: this.player.y })
        .then((res) => console.log("res", res));
    }
  },
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
p {
  color: white;
}
</style>
