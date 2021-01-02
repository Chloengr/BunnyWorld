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
          C'est à {{ nextPlayer }} de jouer !
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
export default {
  components: { CardScore },
  name: "Score",
  props: ["nextPlayer"],
  data() {
    return {
      msg: "Résultats des joueurs de la partie",
      isCardModalActive: true,
      players: {
        player_1: { id: 1, color: "orange", name: "Marie", score: 250 },
        player_2: { id: 2, color: "blue", name: "Chloé", score: 200 },
        player_3: { id: 3, color: "green", name: "Thomas", score: 150 },
        player_4: { id: 4, color: "yellow", name: "Maxime", score: 100 }
      },
      timeToPlay: true
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
