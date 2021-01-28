<template>
  <div id="app">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="/img/logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Home
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/game/1' }"
          v-if="this.user"
        >
          Game 1
        </b-navbar-item>
        <!-- <b-navbar-item tag="router-link" :to="{ path: '/game/2' }">
          Game 2
        </b-navbar-item> -->
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/profile' }"
          v-if="this.user"
        >
          <div class="is-flex is-align-items-center">
            <div class="is-flex is-align-items-center">
              <div class="small-icon mr-2">
                <img :src="`/img/bunny-${user.photoURL}.png`" alt="Image" />
              </div>
              <p class="has-text-secondary">{{ user.displayName }}</p>
            </div>
          </div>
        </b-navbar-item>
        <b-navbar-item v-if="this.user">
          <button class="button is-primary is-rounded" @click="logOut()">
            Se déconnecter
          </button>
        </b-navbar-item>
      </template>
    </b-navbar>
    <router-view></router-view>
    <footer class="footer">
      <div class="content has-text-centered">
        <strong>BunnyWorld</strong> by
        <p>Thomas Mary | Chloé Noger | Maxime Grand | Marie Gautron</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { auth } from "../src/config/firebaseConfig";

export default {
  data() {
    return {
      user: null,
      onLine: null,
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user connected", user);
        this.user = user;
      } else {
        this.user = null;
      }
    });
    this.onLine = navigator.onLine;
    console.log(this.onLine);
    console.log(navigator.onLine ? 'online' : 'offline')
    if (this.onLine === false) {
      this.$router.push("/offline");
    }
  },
  methods: {
    logOut() {
      auth.signOut().then(() => {
        auth.onAuthStateChanged(() => {
          this.$router.push("/login");
        });
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
