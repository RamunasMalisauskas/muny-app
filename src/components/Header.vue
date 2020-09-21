<template>
  <div id="Header">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a href="/">
          <img class="full" src="../assets/muny-logo.svg" alt="logo" />
          <img
            class="mobile"
            src="../assets/muny-logo-mobile.svg"
            alt="mobile-logo"
          />
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          v-on:click="burgerButton()"
          :class="{ 'is-active': active }"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

        <div class="navbar-menu" :class="{ 'is-active': active }">
          <span v-if="loggedIn">
            <router-link to="/expences">Expences</router-link>
            <router-link to="/income">Income </router-link>
            <router-link to="/log">Log </router-link>
            <router-link to="/summary">Summary </router-link>
            <a class="haze" @click="signOut()">Sign Out {{ this.name }}</a>
          </span>

          <span v-else>
            <router-link to="/register">Register</router-link>
            <router-link class="haze" to="/login">Login</router-link>
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
      name: "",
      links: [
        {
          name: "",
          url: "",
        },
      ],
      loggedIn: false,
      active: false,
    };
  },

  // signout method
  methods: {
    signOut() {
      firebase.auth().signOut();
    },

    // mobile active burger button toggle function
    burgerButton() {
      this.active = !this.active;
    },
  },

  // function to determined if the user is already logged in and this show two diferent headers with if-else
  // geting the name (first letter to uppercase) from the email of the user ant pushing it to name in data
  beforeMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
        const userName = firebase.auth().currentUser.email;
        // console.log(firebase.auth().currentUser)
        this.name =
          userName
            .split("@")[0]
            .slice(0, 1)
            .toUpperCase() + userName.split("@")[0].slice(1);
      }
    });
  },
};
</script>

<style scoped>
.navbar-brand {
  padding: 0.5em 5em;
  width: 100%;
  background: url("../assets/background.svg") no-repeat top center;
  background-size: cover;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}

.haze {
  color: #ed185b;
  background: #fff;
}

.haze:hover {
  color: #fff;
  background: #ed185b;
}

.navbar-menu {
  flex-grow: 0;
}

.navbar-burger {
  color: #ed185b;
}

.navbar-burger span {
  height: 2px;
  width: 50%;
}

a {
  color: #fff;
  padding: 0.8em;
  border-radius: 0.8em;
  margin-left: 0.5em;
}

a:hover {
  color: #ed185b;
}

img {
  min-height: 90px;
}

.full {
  display: block;
}

.mobile {
  display: none;
}

.navbar-menu.is-active {
  position: absolute;
  margin-top: 36em;
  background: #f0875e;
}

.navbar-menu.is-active a {
  display: block;
  padding: 1.5em 15em;
}

.navbar-menu {
  padding: 2em;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */

  img {
    min-width: 80px;
  }

  /* toggle the class of two diferernt images for mobile/desktop */
  .full {
    display: none;
  }

  .mobile {
    display: block;
  }
}
</style>
