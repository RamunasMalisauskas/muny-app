<template>
  <div id="login">
    <div class="section">
      <div class="container">
        <Hero />

        <div class="column is-6-desktop">
          <form name="login" v-on:submit.prevent="login">
            <div class="field">
              <div class="control">
                <label class="label">Your Household Name</label>
                <div class="select">
                  <select>
                    <option v-for="home in homes" :key="home.name">{{
                      home.name
                    }}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label">Your Email</label>
              <input
                class="input is-6-desktop"
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

            <Notification
              v-if="error"
              @close="error = false"
              :message="errorMessage"
            />

            <div class="control">
              <button class="button" :class="loading && `is-loading`">
                Login
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
      homes: [],
      email: "",
      password: "",
      error: false,
      errorMessage: "",
      loading: false,
    };
  },

  // simple firebase login method with eroor message (if) displayed  in Notificaion
  methods: {
    login() {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.router.push("/expenses");
        })
        .catch((error) => {
          this.loading = false;
          this.error = true;
          this.errorMessage = "oops...  " + error.message;
        });
    },
  },

  // looks for all the available houses in DB, pushes it to array and it's used as select option input
  beforeMount() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((snapshop) =>
        snapshop.docs.forEach((doc) => {
          this.homes.push({
            name: doc.data().home,
          });
        })
      );
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
