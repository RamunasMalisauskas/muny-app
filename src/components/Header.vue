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
            <a @click="mobileNavToggle()">
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
            <a @click="mobileNavToggle()">
              <router-link to="/register">Register</router-link>
            </a>
            <a @click="mobileNavToggle()">
              <router-link class="haze" to="/login">Login</router-link>
            </a>
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

    //  function to always! close mobile navBar after link has been clicked
    mobileNavToggle() {
      this.active = false;
    },
  },

  // function to determined if the user is already logged in and this show two diferent headers with if-else
  // geting the name (first letter to uppercase) from the email of the user ant pushing it to name in data
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
/* major styles */
.navbar-brand {
  padding: 0.5em 5em;
  min-width: 100%;
  background: url("../assets/background.svg") no-repeat top center;
  background-size: cover;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.navbar-menu {
  flex-grow: 0;
  padding: 2em;
}

img {
  min-height: 90px;
  min-width: 175px;
}

/* burger styles */
.navbar-burger {
  color: #ed185b;
}

.navbar-burger span {
  height: 2px;
  width: 50%;
}

/* link styles */
a {
  color: #ed185b;
  padding: 0.8em;
  border-radius: 0.8em;
  margin-right: 0.5em;
}

a:last-child {
  margin-right: 0;
}

a:hover {
  color: #fff;
}

/* button styles */
.haze {
  color: #ed185b;
  background: #fff;
}

.haze:hover {
  color: #fff;
  background: #ed185b;
}

/* responsive element style */
.full {
  display: block;
}

.mobile {
  display: none;
}

.navbar-menu.is-active {
  position: absolute;
  top: 144px;
  left: 0;
  width: 100%;
  background: #f0875e;
}

.navbar-menu.is-active a {
  display: block;
  color: #fff;
}

.navbar-menu.is-active .haze {
  color: #ed185b;
}

@media only screen and (max-width: 1078px) {
  /* 1078px has been choosen acording to resposivnes of the menu bar and logo */

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
