<template>
  <div
    class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
  >
    <div class="box column is-one-quarter mb-6">
      <div
        class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
      >
        <div class="big-icon mb-1 mt-2" v-if="this.user.photoURL">
          <img :src="`/img/bunny-${user.photoURL}.png`" alt="Image" />
        </div>
        <h1>{{ user.displayName }}</h1>
        <small class="mb-5 has-text-centered">
          Si on est chaud : nombre de parties, nb de victoires ...
        </small>
      </div>
    </div>
    <form
      id="app"
      class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
    >
      <p class="has-text-primary mb-5">Change ton nom ou ton avatar</p>
      <b-field>
        <b-input
          v-bind:value="this.user.displayName"
          v-model="name"
          maxlength="30"
          placeholder="Entrez votre nom"
        ></b-input>
      </b-field>

      <div class="icon mb-4">
        <img
          v-if="colorAvatar"
          :src="`/img/bunny-${colorAvatar}.png`"
          alt="Image"
        />
        <img
          v-if="!colorAvatar && this.user.photoURL"
          :src="`/img/bunny-${user.photoURL}.png`"
          alt="Image"
        />
      </div>

      <div class="block is-flex is-justify-content-center is-flex-wrap-wrap">
        <b-radio
          v-model="colorAvatar"
          v-for="color in colors"
          v-bind:key="color"
          :name="color"
          :native-value="color"
          :type="`is-avatar-${color}`"
          class="mb-2"
        >
          {{ color }}
        </b-radio>
      </div>

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

      <button class="button is-primary is-rounded mb-4" @click="checkForm()">
        Modifier
      </button>
    </form>
  </div>
</template>

<script>
import json from "../data/data.json";
import { auth } from "../config/firebaseConfig";
export default {
  name: "Profile",

  data() {
    return {
      user: null,
      colors: json.colors,
      //form
      errors: [],
      name: null,
      colorAvatar: null,
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        console.log(user);
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    async checkForm() {
      this.user = await auth.currentUser
        .updateProfile({
          displayName: this.name,
          photoURL: this.colorAvatar,
        })
        .then(() => this.$router.push("/profile"))
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
