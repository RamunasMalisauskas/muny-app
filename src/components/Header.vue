<template>
  <div id="Header">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a href="/expenses">
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
            <a @click="burgerButton()">
              <router-link
                v-for="link in links"
                :key="link.name"
                :to="link.url"
              >
                {{ link.name }}
              </router-link>
            </a>

            <a class="haze" @click="logout()">Sign Out {{ this.userName }}</a>
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
      userName: "",
      links: [
        {
          name: "Expenses",
          url: "/expenses",
        },
        {
          name: "Income",
          url: "/income",
        },
        {
          name: "Log",
          url: "/log",
        },
        {
          name: "Summary",
          url: "/summary",
        },
      ],
      loggedIn: false,
      active: false,
    };
  },

  // signout method changes the if-else value
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => (this.loggedIn = false));
    },

    // mobile active burger button toggle function
    burgerButton() {
      this.active = !this.active;
    },
  },

  // function to determined if the user is already logged in and this show two diferent headers with if-else
  // geting the name (first letter to uppercase) from the email of the user ant pushing it to name in data
  // %%%%%%%%%% look up how to get it from database %%%%%%%%%%%
  beforeMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = !!user;
        const onlineName = firebase.auth().currentUser.email.split("@")[0];
        this.userName =
          onlineName.slice(0, 1).toUpperCase() + onlineName.slice(1);
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
  color: #ed185b;
  padding: 0.8em;
  border-radius: 0.8em;
  margin-left: 0.5em;
}

a:hover {
  color: #fff;
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
  top: 144px;
  background: #f0875e;
}

.navbar-menu.is-active a {
  display: block;
  color: #fff;
}

.navbar-menu.is-active .haze {
  color: #ed185b;
}

.navbar-menu {
  padding: 2em;
}

@media only screen and (max-width: 1200px) {
  /* 1200px has been choosen acording to resposivnes of the menu bar and logo */

  img {
    min-width: 76px;
  }

  /* toggle the class of two diferernt images for mobile/desktop logo */
  .full {
    display: none;
  }

  .mobile {
    display: block;
  }
}
</style>
