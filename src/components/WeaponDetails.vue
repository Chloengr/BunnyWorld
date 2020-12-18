<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "WeaponDetails",
  data() {
    return {
      msg: "Details de l'arme sélectionnée pendant une partie"
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
