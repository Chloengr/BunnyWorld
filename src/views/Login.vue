<template>
  <container
    class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-background-background mb-4"
  >
    <figure class="big-icon mt-6 mb-2">
      <img src="/img/carrot.png" />
    </figure>
    <p class="is-family-secondary is-size-1 has-text-black mb-5">
      BUNNY<br />
      WOLRD
    </p>

    <div
      class="form is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-background-white p-5"
    >
      <p class="mt-5 mb-5">Connecte toi pour jouer !</p>
      <form
        id="app"
        @submit="checkForm"
        action="/"
        method="post"
        class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center mb-5"
      >
        <b-field>
          <b-input
            v-model="email"
            maxlength="100"
            placeholder="Email"
          ></b-input>
        </b-field>

        <b-field>
          <b-input
            v-model="password"
            maxlength="30"
            type="password"
            placeholder="Password"
          ></b-input>
        </b-field>
      </form>
      <div>
        <button
          class="button is-primary is-rounded mb-4 mr-4"
          @click="checkForm()"
        >
          Se connecter
        </button>
        <button
          class="button is-white is-rounded mb-4 ml-4"
          @click="$router.push('/home')"
        >
          Créer mon lapinou
        </button>
      </div>
    </div>
  </container>
</template>

<script>
import json from "../data/data.json";
import { auth } from "../config/firebaseConfig";

export default {
  name: "Profile",
  data() {
    return {
      errors: [],
      name: null,
      email: null,
      password: null,
      colorAvatar: null,
      colors: json.colors,
      currentPlayer: json.currentPlayer,
      games: json.games,
    };
  },
  methods: {
    checkForm() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          console.log(res.user);
          this.$router.push("/home");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>

<style>
.form {
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  width: 100%;
}
.cards {
  width: 90%;
}
</style>
