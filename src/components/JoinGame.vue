<template>
  <div class="card">
    <div class="card-content">
      <div
        class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center mb-4"
      >
        <div class="text-block">
          <h1>{{ msg }}</h1>
          <p class="has-text-primary mb-5">
            Entrez le lien de la partie pour y accéder
          </p>
        </div>
        <form
          id="app"
          @submit="joinGame"
          action="/"
          method="post"
          class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center mb-5"
        >
          <b-field>
            <b-input
              v-model="link"
              placeholder="Lien de la partie"
              maxlength="30"
            ></b-input>
          </b-field>
        </form>
        <button
          class="button is-primary is-rounded mb-4 mr-4"
          @click="joinGame()"
        >
          C'est parti !
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JoinGame",
  data() {
    return {
      msg: "Rejoindre une partie",
      link: null
    };
  },
  methods: {
    joinGame() {
      console.log(this.link);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: bold;
  font-size: 40px;
  margin-bottom: 20px;
}
.text-block {
  width: 300px;
  padding: 20px;
}
</style>
