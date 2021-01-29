<template>
  <div
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
      <div
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
      </div>
      <div class="is-flex is-flex-direction-column is">
        <button class="button is-primary is-rounded mb-5" @click="checkForm()">
          Se connecter
        </button>
        <button
          class="button has-text-primary is-outlined is-rounded mb-5"
          @click="$router.push('/signin')"
        >
          Créer mon lapinou
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../config/firebaseConfig";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    checkForm() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          console.log(res.user.displayName, "is connected");
          this.$router.push("/");
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
