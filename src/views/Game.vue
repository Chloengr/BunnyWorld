<template>
  <div>
    <score
      v-if="!finDePartie"
      :nextPlayer="nextPlayer"
      :players="players"
    ></score>
    <rank
      v-if="finDePartie"
      :currentGame="currentGame"
      :players="players"
    ></rank>
    <board :currentGame="currentGame" :players="players"></board>
    <!-- <button class="button is-rounded is-primary" @click="displayWeapon">
      Regardez, une arme !
    </button>
    <button class="button is-rounded is-primary" @click="displayPlayer">
      Regardez, un lapin !
    </button> -->
  </div>
</template>

<script>
import Score from "../components/Score.vue";
import Rank from "../components/Rank.vue";

import Board from "../components/Board.vue";
// import WeaponDetailsVue from "../components/WeaponDetails.vue";
// import PlayerDetailsVue from "../components/PlayerDetails.vue";
import { db } from "../config/firebaseConfig";

export default {
  components: { Score, Rank, Board },
  name: "Game",
  data() {
    return {
      nextPlayer: null,
      finDePartie: false, // false to see ranking - true to see score
      currentGame: [],
      players: [],
    };
  },
  created() {
    db.collection("game")
      .doc(this.$route.params.id)
      .get()
      .then((res) => {
        this.currentGame = res.data();
        this.players = res.data().players;

        let nextPlayerTab = [];
        let player = [];
        res.data().players.forEach((p) => {
          if (p.your_turn) {
            nextPlayerTab.push(p);
          }
          if (p.life > 0) {
            player.push(p);
          }
        });
        this.nextPlayer = nextPlayerTab[0];

        if (player.length === 1) {
          this.finDePartie = true;
        }
      });
  },
  methods: {
    // displayWeapon() {
    //   this.$buefy.modal.open({
    //     parent: this,
    //     props: { weapon: json.weapon },
    //     component: WeaponDetailsVue,
    //     hasModalCard: true,
    //     trapFocus: true,
    //   });
    // },
    // displayPlayer() {
    //   this.$buefy.modal.open({
    //     parent: this,
    //     props: { player: auth.currentUser, weapon: json.weapon },
    //     component: PlayerDetailsVue,
    //     hasModalCard: true,
    //     trapFocus: true,
    //   });
    // },
  },
};
</script>
