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
          La partie {{ partieName }} est finie !
        </h1>
        <div class="content">
          <!-- Player ranking by score -->
          <div
            v-for="player in rank(this.players)"
            v-bind:key="player.id"
            class="mb-3 is-flex is-justify-content-space-between p-3"
          >
            <div class="is-flex">
              <p class="has-text-primary mr-5">{{ incerement() }}e</p>
              <div class="is-flex">
                <div class="small-icon mr-2">
                  <img :src="`/img/bunny-${player.color}.png`" alt="Image" />
                </div>
                <p>{{ player.name }}</p>
              </div>
            </div>
            <p class="has-text-gray">{{ player.score }} points</p>
          </div>
        </div>
        <div class="box is-flex is-justify-content-center">
          <p v-if="isWinner" class="has-text-secondary has-text-centered">
            Bravo {{ this.players[0].name }} ! Tu as gagné avec
            {{ this.players[0].score }} points !
          </p>
          <p v-if="!isWinner" class="has-text-secondary has-text-centered">
            {{ this.players[0].name }} a gagné avec
            {{ this.players[0].score }} points ! Tu gagneras la prochaine fois
            😥
          </p>
        </div>
        <div class="is-flex is-justify-content-center">
          <button class="button is-primary is-rounded" @click="snackbar">
            <!-- on click TODO -->
            Rejouer
          </button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "Rank",
  props: ["partieName"],
  data() {
    return {
      msg: "Classement des joueurs de la partie",
      isCardModalActive: true,
      players: [
        { id: 1, color: "orange", name: "Marie", score: 250 },
        { id: 2, color: "blue", name: "Chloé", score: 300 },
        { id: 3, color: "green", name: "Thomas", score: 50 },
        { id: 4, color: "yellow", name: "Maxime", score: 100 },
      ],
      i: 0,
      isWinner: false,
    };
  },
  methods: {
    snackbar() {
      this.$buefy.snackbar.open({
        message: `TODO`,
      });
    },
    rank(players) {
      return players.sort(function (a, b) {
        return b.score - a.score;
      });
    },
    incerement() {
      return (this.i = this.i + 1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
