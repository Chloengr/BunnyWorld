<template>
  <div
    class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
  >
    <div class="box column is-one-quarter mb-6">
      <div
        class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
      >
        <div class="big-icon mb-1 mt-2">
          <img :src="`/img/bunny-${player.color}.png`" alt="Image" />
        </div>
        <h1>{{ player.name }}</h1>
        <small class="mb-5 has-text-centered">
          Si on est chaud : nombre de parties, nb de victoires ...
        </small>
      </div>
    </div>
    <form
      id="app"
      @submit="checkForm"
      action="/"
      method="post"
      class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
    >
      <p class="has-text-primary mb-5">Change ton nom ou ton avatar</p>
      <b-field label="Name">
        <b-input
          v-bind:value="this.player.name"
          v-model="name"
          maxlength="30"
        ></b-input>
      </b-field>
      <p class="has-text-primary mb-3" v-if="name">
        Name : {{ this.name }}
        <!-- Delete after back -->
      </p>

      <div class="icon mb-4">
        <img
          v-if="colorAvatar"
          :src="`/img/bunny-${colorAvatar}.png`"
          alt="Image"
        />
        <img
          v-if="!colorAvatar"
          :src="`/img/bunny-${player.color}.png`"
          alt="Image"
        />
      </div>

      <div class="block is-flex is-justify-content-center is-flex-wrap-wrap">
        <b-radio
          v-model="colorAvatar"
          name="blue"
          native-value="blue"
          type="is-avatar-blue"
          class="mb-2"
        >
          Blue
        </b-radio>
        <b-radio
          v-model="colorAvatar"
          name="green"
          native-value="green"
          type="is-avatar-green"
          class="mb-2"
        >
          Green
        </b-radio>
        <b-radio
          v-model="colorAvatar"
          name="orange"
          native-value="orange"
          type="is-avatar-orange"
          class="mb-2"
        >
          Orange
        </b-radio>
        <b-radio
          v-model="colorAvatar"
          name="purple"
          native-value="purple"
          type="is-avatar-purple"
          class="mb-2"
        >
          Purple
        </b-radio>
        <b-radio
          v-model="colorAvatar"
          name="yellow"
          native-value="yellow"
          type="is-avatar-yellow"
          class="mb-2"
        >
          Yellow
        </b-radio>
      </div>
      <p class="has-text-primary mb-5" v-if="colorAvatar">
        Color : {{ this.colorAvatar }}
        <!-- Delete after back -->
      </p>

      <div v-if="errors.length" class="mb-5">
        <small class="has-text-error">Corrige les erreurs suivantes : </small>
        <small
          class="has-text-error"
          v-for="error in errors"
          v-bind:key="error"
        >
          {{ error }}
        </small>
      </div>

      <button class="button is-primary is-rounded mb-4" type="submit">
        Modifier
      </button>
    </form>
  </div>
</template>

<script>
import json from "../data/data.json";
export default {
  name: "Profile",

  data() {
    return {
      player: json.currentPlayer,
      //form
      errors: [],
      name: null,
      colorAvatar: null,
    };
  },
  methods: {
    checkForm: function (e) {
      this.$buefy.snackbar.open({
        message: `POST in back-end`,
      });
      //if (this.name) return (this.player.name = this.name);
      this.errors = [];
      if (!this.name) this.errors.push("Nom requis.");
      if (!this.colorAvatar) this.errors.push("Couleur requise.");
      e.preventDefault();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
