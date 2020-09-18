<template>
  <div id="login">
    <div class="section">
      <div class="container">
        <Hero />

        <Notification
          v-if="error"
          v-on:close="error = false"
          class="blue"
          :message="errorMessage"
        />

        <form name="login" v-on:submit.prevent="test">
          <div class="field">
            <label class="label">Your Household Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="e.g 742 Evergreen Terrace"
                v-model="home"
                required
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Your User Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="e.g John Jones"
                v-model="name"
                required
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Your Password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                placeholder="****"
                v-model="password"
                required
              />
            </div>
          </div>

          <div class="control" :class="loading && `is-loading`">
            <button class="button is-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Hero from "../../components/Hero";
import Notification from "../../components/Notification";

export default {
  name: "Login",
  components: { Hero, Notification },

  data() {
    return {
      home: "",
      name: "",
      password: "",
      error: false,
      errorMessage: "",
      loading: false,
    };
  },

  methods: {
    test() {
      console.log(this.name, this.home, this.password);
    },
  },
};
</script>

<style scoped>
form {
  margin-top: 1em;
}
</style>
