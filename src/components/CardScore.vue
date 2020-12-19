<template>
  <section
    class="px-5 py-2 is-flex is-justify-content-center is-flex-direction-column"
    id="card-score"
  >
    <small class="mb-2">Joueur {{ player.id }} </small>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
      <div class="is-flex">
        <div class="small-icon mr-2">
          <img :src="`/img/bunny-${player.color}.png`" alt="Image" />
        </div>
        <p>{{ player.name }}</p>
      </div>
      <p class="has-text-primary">{{ player.score }} points</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "card-score",
  props: ["player"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#card-score {
  border: 1px solid $primary;
  border-radius: 10px;
}
</style>
