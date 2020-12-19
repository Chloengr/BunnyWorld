

<template>
  <div id="app">
    <div class="container is-fluid">
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
          <b-navbar-item tag="router-link" :to="{ path: '/create' }">
            Create
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/join' }">
            Join
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/game/1' }">
            Game
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/profile/1' }">
            Profile
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/components' }">
            Components
          </b-navbar-item>
        </template>
      </b-navbar>
      <router-view></router-view>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <strong>BunnyWorld</strong> by
        <p>Thomas Mary | Chloé Noger | Maxime Grand | Marie Gautron</p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
