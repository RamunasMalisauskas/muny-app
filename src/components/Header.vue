<template>
  <div id="Header">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a href="/">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.tech.co%2Fwp-content%2Fuploads%2F2015%2F07%2Ftech-02-acorns.png&f=1&nofb=1"
            alt="logo"
          />
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

        <div class="navbar-menu">
          <span v-if="logedIn">
            <router-link to="/expences">Expences</router-link>
            <router-link to="/income">Income </router-link>
            <router-link to="/log">Log </router-link>
            <router-link to="/summary">Summary </router-link>
            <a class="green">Sign Out</a>
          </span>

          <span v-else>
            <router-link to="/register">Register</router-link>
            <router-link class="green" to="/login">Login</router-link>
          </span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Header",
  data() {
    return {
      logedIn: false,
    };
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
    },
  },

  beforeMount() {
    firebase
      .auth()
      .onAuthStateChanged((user) =>
        user ? (this.loggedIn = true) : (this.loggedIn = false)
      );
  },
};
</script>

<style scoped>
.navbar-brand {
  padding: 0.5em 5em;
  width: 100%;
  background: rgb(141, 235, 141);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.green {
  background: rgb(186, 241, 186);
}

.green:hover {
  background: rgb(141, 235, 141);
}

.navbar-menu {
  flex-grow: 0;
}

.navbar-menu a {
  color: rgb(0, 100, 0);
  padding: 0.8em;
  border-radius: 0.8em;
  margin-left: 0.5em;
}

.navbar-menu a:hover {
  color: rgb(255, 255, 255);
}

img {
  width: 100px;
}
</style>
