<template>
  <div id="notification" v-bind:class="type">
    {{ message }}
    <button class="delete" v-on:click="close"></button>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    type: String,
    message: String,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
#notification {
  background: url("../assets/background.svg") no-repeat bottom center;
  background-size: cover;

  margin: 30px 0;
  border-radius: 10px;
}
</style>
