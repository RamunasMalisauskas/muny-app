<template>
  <div id="log">
    <div class="section">
      <div class="container">
        <Hero />

        <div class="columns is-centered">
          <div class="column is-half">
            <div class="control">
              <button class="button" :class="loading && `is-loading`">
                Get info
              </button>
            </div>

            <div class="card">
              <div class="top">
                <p class="title is-6-desktop">2000</p>
                <div class="bottom columns">
                  <div class="column"><p class="subtitle">100</p></div>
                  <div class="column"><p class="subtitle">1900</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Hero from "../../components/Hero";

export default {
  name: "Log",
  components: { Hero },

  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped>
/* major styles */
.is-centered {
  text-align: center;
}

.columns {
  margin-top: 2em;
}

/* button style */
button {
  color: #fff;
  background: #ed185b;
  padding: 1.5em;
  border-radius: 0.8em;
  margin-left: 0.5em;
}

button:hover {
  color: #ed185b;
  border: 1px solid #ed185b;
  background: #fff;
}
</style>
