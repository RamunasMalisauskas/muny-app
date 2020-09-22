<template>
  <div id="register">
    <div class="section">
      <div class="container">
        <Hero />

        <Notification
          v-if="error"
          v-on:close="error = false"
          :message="errorMessage"
        />

        <form name="login" v-on:submit.prevent="register">
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
            <label class="label" for="email">Email</label>
            <input
              class="input"
              type="email"
              placeholder="youremail@email.lt"
              v-model="email"
              required
            />
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

          <div class="control">
            <button class="button" :class="loading && `is-loading`">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Hero from "../../components/Hero";
import Notification from "../../components/Notification";

export default {
  name: "Login",
  components: { Hero, Notification },

  data() {
    return {
      home: "",
      email: "",
      password: "",
      error: false,
      errorMessage: "",
      loading: false,
    };
  },

  methods: {
    // creating user in with auth and creating another DB for user || so that couple users can be added to the same home
    register() {
      this.loading = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          firebase
            .firestore()
            .collection("users")
            .add({ home: this.home, email: this.email });
        })
        .then(() => {
          this.$router.push("/expenses");
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
          this.errorMessage =
            "there has been a problem with registry try again";
        });
    },

    // test() {
    //   console.log(this.name, this.home, this.password);
    // },
  },
};
</script>

<style scoped>
.section {
  padding: 1.5em;
}

form {
  margin-top: 2em;
}

label {
  color: #ed185b;
}

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

.input {
  color: #ef735f;
}

.input:hover {
  border-color: #f4bc53;
}
</style>
