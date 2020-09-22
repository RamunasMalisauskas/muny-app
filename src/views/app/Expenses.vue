<template>
  <div id="expenses">
    <div class="section">
      <div class="container">
        <Hero />

        <Notification
          v-if="error"
          @close="error = false"
          :message="errorMessage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Hero from "../../components/Hero";
import Notification from "../../components/Notification";

export default {
  name: "Expenses",
  components: { Hero, Notification },

  data() {
    return {
      error: false,
      errorMessage: ""
    };
  },
};
</script>

<style scoped></style>>
