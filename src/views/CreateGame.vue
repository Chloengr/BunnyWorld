<template>
  <div
    class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center mb-4"
  >
    <figure class="image big-icon">
      <img src="/img/play.png" alt="Image" />
    </figure>
    <h1>{{ msg }}</h1>
    <form
      id="app"
      @submit="initGame"
      action="/"
      method="post"
      class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center mb-5"
    >
      <b-field>
        <b-input
          v-model="name"
          placeholder="Nom de la partie"
          maxlength="30"
        ></b-input>
      </b-field>
      <b-field>
        <b-input v-model="nbPlayer" placeholder="Nombre de joueurs"></b-input>
      </b-field>
      <b-field class="board">
        <b-select placeholder="Quel plateau ?" v-model="boardChoice">
          <option value="1">Plateau 1</option>
          <option value="2">Plateau 2</option>
        </b-select>
      </b-field>
    </form>
    <div v-if="errors.length" class="mb-5">
      <small class="has-text-error">Attention ! </small>
      <small class="has-text-error" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </small>
    </div>
    <button class="button is-primary is-rounded mb-4 mr-4" @click="initGame()">
      C'est parti !
    </button>
  </div>
</template>

<script>
export default {
  name: "CreateGame",
  data() {
    return {
      msg: "Créer une partie",
      name: null,
      nbPlayer: null,
      boardChoice: null,
      labelPosition: "on-border",
      errors: []
    };
  },
  methods: {
    initGame: function(e) {
      console.log(e);
      this.errors = [];
      this.name ? console.log(this.name) : this.errors.push("Nom requis.");
      this.nbPlayer
        ? console.log(this.nbPlayer)
        : this.errors.push("Nombre de joueurs requis.");
      this.boardChoice
        ? console.log(this.boardChoice)
        : this.errors.push("Plateau requis.");
      e.preventDefault();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
  margin: 40px;
}
.board {
  margin-top: 20px;
}
</style>
