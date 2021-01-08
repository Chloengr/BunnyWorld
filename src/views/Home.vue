<template>
  <container
    class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-background-background mb-4"
  >
    <figure class="big-icon mt-6 mb-2">
      <img src="/img/Carrot.png" />
    </figure>
    <p class="is-family-secondary is-size-1 has-text-black mb-5">
      BUNNY<br />
      WOLRD
    </p>

    <div
      class="form is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-background-white p-5"
    >

      <div v-if="currentPlayer" class="mb-5 cards">
        <div v-for="game in games" v-bind:key="game.id">
          <div v-for="player in game.players" v-bind:key="player.id">
            <card-score
              v-if="player.id === currentPlayer.id"
              :player="player"
              :gameName="game.name"
              class="mt-2"
            ></card-score>
          </div>
        </div>


      <div class="content">
        <card-score
          v-for="player in players"
          v-bind:key="player.id"
          :player="player"
          class="mb-3"
        ></card-score>


      <p class="mt-5 mb-5">Choisir ton nom et ton avatar</p>

      <form
        id="app"
        @submit="checkForm"
        action="/"
        method="post"
        v-if="!currentPlayer"
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
      </form>

      <div v-if="currentPlayer">
        <button
          class="button has-text-secondary is-outlined is-rounded mb-5"
          @click="$router.push(`/profile/${currentPlayer.id}`)"
        >
          Modifier mon profil
        </button>
      </div>

      <div>
        <button
          class="button is-primary is-rounded mb-4 mr-4"
          @click="checkForm()"
        >
          Créer
        </button>
        <button
          class="button is-white is-rounded mb-4 ml-4"
          @click="checkForm()"
        >
          Rejoindre
        </button>
      </div>
    </div>
  </container>
</template>

<script>
import CardScore from "../components/CardScore";
import json from "../data/data.json";
export default {
  name: "Profile",
  components: { CardScore },
  data() {
    return {
      errors: [],
      name: null,
      colorAvatar: null,
      colors: json.colors,
    };
  },
  methods: {
    checkForm: function () {
      this.$buefy.snackbar.open({
        message: `TODO`,
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