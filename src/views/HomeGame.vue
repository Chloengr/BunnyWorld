<template>
  <div
    class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-background-primary"
  >
    <p class="has-text-black mb-5">Choisir ton nom et ton avatar</p>

    <form
      id="app"
      @submit="checkForm"
      action="/"
      method="post"
      class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
    >
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

      <b-field>
        <b-input
          v-bind:value="this.player.name"
          v-model="name"
          maxlength="30"
          placeholder="Entrez votre nom"
        ></b-input>
      </b-field>

      <b-row>
        <button class="button has-text-secondary is-outlined is-rounded mb-4" type="submit">
          Créer
        </button>
      </b-row>
      <b-row>
        <button class="button is-primary is-rounded mb-4 mr-4" type="submit">
          Créer
        </button>
        <button class="button is-white is-rounded mb-4 ml-4" type="submit">
          Rejoindre
        </button>
      </b-row>
    </form>
  </div>
</template>

<script>
export default {
  name: "Profile",

  data() {
    return {
      errors: [],
      name: null,
      colorAvatar: null,
      player: { id: 1, color: "orange", name: "Marie", score: 250 },
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