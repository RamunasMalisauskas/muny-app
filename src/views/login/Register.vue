<template>
  <div id="register">
    <div class="section">
      <div class="container">
        <Hero />

        <div class="column is-6-desktop">
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
              <label class="label">Enter Password</label>
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

            <div class="field">
              <label class="label">Repeat Password</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  placeholder="****"
                  v-model="passwordCheck"
                  required
                />
              </div>
            </div>

            <Notification
              v-if="error"
              v-on:close="error = false"
              :message="errorMessage"
            />

            <div class="control">
              <button class="button" :class="loading && `is-loading`">
                Register
              </button>
            </div>
          </form>
        </div>
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
      passwordCheck: "",
      error: false,
      errorMessage: "",
      loading: false,
    };
  },

  methods: {
    // creating user in with auth and creating another DB for user || so that couple users can be added to the same home
    register() {
      this.loading = true;

      // validating repeated password
      if (this.password !== this.passwordCheck) {
        this.error = true;
        this.errorMessage = "repeat password correctly";
        this.loading = false;
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({ home: this.home, email: this.email });
          })
          .then(() => {
            this.router.push("/expenses");
          })
          .catch((error) => {
            this.loading = false;
            this.error = true;
            this.errorMessage =
              "there has been a problem with registry try again " +
              error.message;
          });
      }
    },
  },
};
</script>

<style scoped>
/* major styles */
.section {
  padding: 1.5em;
}

.column {
  padding: 0;
}

form {
  margin-top: 2em;
}

label {
  color: #ed185b;
}

/* button style */
button {
  color: #fff;
  background: #ed185b;
  padding: 1.5em;
  border-radius: 0.8em;
  line-height: 0;
}

button:hover {
  color: #ed185b;
  border: 1px solid #ed185b;
  background: #fff;
}

/* input styles */
.input {
  color: #eb6e56;
}

.input:hover {
  border-color: #f4bc53;
}
</style>
