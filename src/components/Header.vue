<template>
  <div class="header">
    <div class="wrapper">
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.tech.co%2Fwp-content%2Fuploads%2F2015%2F07%2Ftech-02-acorns.png&f=1&nofb=1"
        alt="logo"
      />
      <nav>
        <span v-if="loggedIn">
          <router-link to="/students">Students</router-link>
          <router-link to="/add">+Student </router-link>
          <router-link to="/groups">Groups </router-link>
          <router-link to="/addGroup">+Group </router-link>
          <a class="blue" v-on:click="signOut()">Sign Out</a>
        </span>

        <span v-else>
          <router-link to="/register">Register</router-link>
          <router-link class="blue" to="/login">Login</router-link>
        </span>
      </nav>
    </div>
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
img {
  width: 100px;
}
</style>
