<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "Game",
  data() {
    return {
      msg: "Partie en cours avec le plateau/parcours choisi"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1 {
  font-weight: normal;
}
</style>
