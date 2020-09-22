<template>
  <div id="login">
    <div class="section">
      <div class="container">
        <Hero />

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

          <Notification
            v-if="error"
            @close="error = false"
            :message="errorMessage"
          />

          <div class="control" :class="loading && `is-loading`">
            <button class="button">Login</button>
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
          // ?????????????? KODĖL META ERROR ???????????
          // this.$router.push("/expenses");
        })
        .catch((error) => {
          this.loading = false;
          this.error = true;
          this.errorMessage = "oops...  " + error.message;
        });
    },
  },

  // looks for all the avalibe houses in DB, pushes it to array and it's used as select option input
  beforeMount() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((snapshop) =>
        snapshop.docs.forEach((doc) => {
          this.homes.push({
            name: doc.data().name,
          });
        })
      );
  },
};
</script>

<style scoped>
form {
  margin-top: 1em;
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
