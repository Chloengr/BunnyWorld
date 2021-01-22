import Vue from "vue";
import VueRouter from "vue-router";

import Score from "@/components/Score";
import Rank from "@/components/Rank";
import WeaponDetails from "@/components/WeaponDetails";
import PlayerDetails from "@/components/PlayerDetails";
import JoinGame from "@/components/JoinGame";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/components",
    name: "Components",
    component: () => import("@/views/ComponentsUI.vue")
  },
  {
    path: "/create",
    name: "Créer une partie",
    component: () => import("@/views/CreateGame.vue")
  },
  {
    path: "/game/:id",
    name: "Partie en cours",
    component: () => import("@/views/Game.vue")
  },
  {
    path: "/profile",
    name: "Profil du joueur",
    component: () => import("@/views/Profile.vue")
  },
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/join",
    name: "Rejoindre une partie",
    component: JoinGame
  },
  {
    path: "/game/:id/rank",
    name: "Classement",
    component: Rank
  },
  {
    path: "/game/:id/score",
    name: "Resultats",
    component: Score
  },
  {
    path: "/game/:game/weapon/:id",
    name: "WeaponDetails",
    component: WeaponDetails
  },
  {
    path: "/game/:game/player/:id",
    name: "PlayerDetails",
    component: PlayerDetails
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
