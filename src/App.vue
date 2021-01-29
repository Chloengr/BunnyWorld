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
        <b-navbar-item>
          <button
            class="button has-text-primary is-outlined is-rounded mb-5 hidden"
            @click="install()"
            :disabled="installDisable"
          >
            Installer l'application
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
let promptEvent = null;

export default {
  data() {
    return {
      user: null,
      installDisable: false,
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.photoURL);
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logOut() {
      auth.signOut().then(() => {
        auth.onAuthStateChanged(() => {
          this.$router.push("/login");
        });
      });
    },
    install() {
      if (promptEvent) {
        promptEvent.prompt();
      }
    },
  },
  mounted: function() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      promptEvent = e;
      this.installDisable = false;
      promptEvent.userChoice.then((choiceObject) => {
        if (choiceObject.outcome === "accepted") {
          this.installDisable = true;
        }
      });
    });
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
