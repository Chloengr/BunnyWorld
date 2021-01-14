<template>
  <div class="card">
    <div class="card-content">
      <div class="is-flex is-justify-content-center">
          <div class="is-flex mr-1 card-media">
            <img :src="`/img/${weapon.sprite}.svg`" />
          </div>
          <div>
            <div class="has-text-centered mt-1">
              <!-- <p class="has-text-primary">{{weaponName}}</p> -->
              <p class="has-text-primary">{{weapon.name}}</p>
            </div>
            <div>
              <span class="is-flex is-justify">
                <span class="is-flex is-align-items-center">
                  <img class="mr-5" src="/img/hit.svg"/>
                  <p class="mr-6 text-value has-text-secondary">{{weapon.damage}}</p>
                </span>
                <span class="is-flex is-align-items-center">
                  <img class="mr-5" src="/img/range.svg" />
                  <p class="text-value has-text-secondary">{{weapon.range}}</p>
                </span>
              </span>
            </div>
          </div>
      </div>
    <div class="is-flex is-justify-content-center mt-3 mb-2">
      <button class="is-primary is-rounded button">Ramasser</button>
    </div>
    </div>
  </div> 
</template>

<script>
export default { 
  name: "WeaponDetails",
  props: ["weapon"],
  data() {
    return {
      msg: "Details de l'arme sélectionnée pendant une partie",
      //weaponName : "Epee de la mort qui tue", 
      //damage: "10",
      //range: "0",
      //sprite: "sword.svg",
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.text-value{
font-size: 30px;
}
</style>
