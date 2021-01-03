<template>
  <div
    class="box is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-background-lightgrey column is-three-fifths is-offset-one-fifth"
  >
    <div
      class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
    >
      <div class="big-icon mb-1">
        <img :src="`/img/bunny-${player.color}.png`" alt="Image" />
      </div>
      <h1 class="has-text-secondary">{{ player.name }}</h1>
      <p class="mb-5">
        Si on est chaud : nombre de parties, nb de victoires ...
      </p>
    </div>
    <div class="is-flex is-justify-content-center">
      <button class="button is-primary is-rounded">Modifier</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
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
