<template>
  <div class="card">
    <div class="card-content">
      <div class="is-flex is-align-items-center">
        <div class="is-flex mr-1 card-media">
          <img
            class="bunny-icon"
            :src="`/img/bunny-${player.color}.png`"
            alt="Image"
          />
        </div>
        <div>
          <div class="has-text-centered mt-1">
            <p class="has-text-primary">{{ player.name }}</p>
            <b-rate
              v-model="rate"
              :icon-pack="packs"
              :icon="icons"
              :max="maxs"
              :size="sizes"
              :locale="locale"
              :show-text="text"
              :texts="texts"
              :rtl="isRtl"
              :spaced="isSpaced"
              :disabled="isDisabled"
            >
            </b-rate>
            <div class="weapons" v-if="player.weaponId == weapon.id">
              <img :src="`/img/${weapon.sprite}.svg`" />
            </div>
          </div>
        </div>
      </div>
      <div class="is-flex is-justify-content-center mt-3 mb-2">
        <button class="button is-primary is-rounded ">ATTAQUER !!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerDetails",
  props: ["player", "weapon"],
  data() {
    return {
      msg: "Details du joueur sélectionné pendant une partie",
      rate: this.player.life,
      text: false,
      maxs: 5,
      sizes: "is-medium",
      packs: "fas",
      icons: "heart",
      texts: ["Very bad", "Bad", "Good", "Very good", "Awesome"],
      isRtl: false,
      isSpaced: true,
      isDisabled: true,
      locale: undefined
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
.bunny-icon {
  height: 95px;
  padding-right: 30px;
}
</style>
