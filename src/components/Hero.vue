<template>
  <div id="hero">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h2 class="title">
            {{ pageTitle + " " + "page" }}
          </h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Hero",
  computed: {
    pageTitle() {
      return this.$route.name;
    },
  },
};
</script>

<style scoped></style>
