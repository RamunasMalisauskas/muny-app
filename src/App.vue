<template>
  <div id="app">
    <Header />
    <div id="nav">
      <router-link to="/login">login</router-link> |
      <router-link to="/register">register</router-link> |

      <router-link to="/expences">expences</router-link> |
      <router-link to="/income">income</router-link> |
      <router-link to="/log">log</router-link> |
      <router-link to="/summary">summary</router-link> |
    </div>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: { Header },
};
</script>

<style></style>
