<template>
  <div
    class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-background-background mb-4"
  >
    <figure class="big-icon mt-6 mb-2">
      <img src="/img/carrot.png" />
    </figure>
    <p class="is-family-secondary is-size-1 has-text-black mb-5">
      BUNNY<br />
      WORLD
    </p>

    <div
      class="form is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-background-white p-5"
    >
      <p class="mt-5 mb-5">Choisir ton nom et ton avatar</p>

      <form
        id="app"
        @submit="checkForm"
        action="/"
        method="post"
        class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center mb-5"
      >
        <div class="icon mb-4">
          <img
            v-if="colorAvatar"
            :src="`/img/bunny-${colorAvatar}.png`"
            alt="Image"
          />
          <img v-if="!colorAvatar" :src="`/img/bunny-orange.png`" alt="Image" />
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

        <b-field>
          <b-input
            v-model="name"
            maxlength="30"
            placeholder="Entrez votre nom"
          ></b-input>
        </b-field>

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

      <div class="is-flex is-flex-direction-column is">
        <button class="button is-primary is-rounded mb-5" @click="checkForm()">
          Créer mon profil
        </button>
        <button
          class="button has-text-primary is-outlined is-rounded mb-5"
          @click="$router.replace('/login')"
        >
          J'ai déjà un lapinou
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../config/firebaseConfig";
import JoinGameVue from "../components/JoinGame.vue";
import { colors } from "../service/service.js";

export default {
  name: "Signin",
  data() {
    return {
      errors: [],
      name: null,
      email: null,
      password: null,
      colorAvatar: null,
      colors: colors(),
      user: null,
      games: auth.games,
      currentUser: auth.currentUser
    };
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    checkForm() {
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(res => {
          res.user.updateProfile({
            displayName: this.name,
            photoURL: this.colorAvatar
          });
          this.$router.push("/");
        })
        .catch(error => {
          alert(error.message);
        });
    },
    displayJoinGame() {
      this.$buefy.modal.open({
        parent: this,
        component: JoinGameVue,
        hasModalCard: true,
        trapFocus: true
      });
    }
  }
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
