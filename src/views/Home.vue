<template>
  <section>
    <b-button @click="clickMe">Click Me</b-button>
    <h1>{{ msg }}</h1>
  </section>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      msg: "Home"
    };
  },
  methods: {
    clickMe() {
      this.$buefy.notification.open("Clicked!!");
    }
  }
};
</script>
