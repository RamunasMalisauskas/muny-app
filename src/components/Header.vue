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

        <div id="navbarBasicExample" class="navbar-menu">
          <span v-if="loggedIn">
            <router-link to="/expences">Expences</router-link>
            <router-link to="/income">Income </router-link>
            <router-link to="/log">Log </router-link>
            <router-link to="/summary">Summary </router-link>
            <a class="blue" v-on:click="signOut()">Sign Out</a>
          </span>

          <span v-else>
            <router-link to="/register">Register</router-link>
            <router-link class="blue" to="/login">Login</router-link>
          </span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      loggedIn: true,
    };
  },
};
</script>

<style scoped>
.navbar-brand {
  padding: 0.5em 5em;
  width: 100%;
  background: lightgreen;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.navbar-menu {
  flex-grow: 0;
}

.navbar-menu a {
    color: darkgreen;
    padding-left: 0.5em;
}
img {
  width: 100px;
}
</style>
