<template>
  <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
    <div
      class="card is-flex is-justify-content-center is-align-items-center is-flex-direction-column p-5"
    >
      <div class="card-image">
        <figure class="image big-icon">
          <img src="/img/king.png" alt="Image" />
        </figure>
      </div>
      <div class="card-content">
        <h1 class="has-text-centered mb-4">
          C'est à {{ timeToPlay ? "toi" : nextPlayer.name }} de jouer !
        </h1>
        <div class="content">
          <card-score
            v-for="player in players"
            v-bind:key="player.id"
            :player="player"
            class="mb-3"
          ></card-score>
        </div>
        <div v-if="timeToPlay" class="is-flex is-justify-content-center">
          <button
            class="button is-primary is-rounded"
            v-on:click="isCardModalActive = false"
          >
            Jouer
          </button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import CardScore from "./CardScore.vue";
import { auth } from "../config/firebaseConfig";
export default {
  components: { CardScore },
  name: "Score",
  props: ["nextPlayer", "players"],
  data() {
    return {
      isCardModalActive: true,
      timeToPlay: null
    };
  },
  created() {
    this.timeToPlay = auth.currentUser.uid === this.nextPlayer.user;
    console.log(this.nextPlayer);
  }
};
</script>
