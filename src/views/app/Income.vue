<template>
  <div id="income">
    <div class="section">
      <div class="container">
        <Hero />

        <div class="column is-6-desktop">
          <form name="expenses" v-on:submit.prevent="plus">
            <div class="field">
              <label class="label">Income</label>
              <div class="control">
                <input
                  class="input"
                  type="number"
                  placeholder="$"
                  v-model="income"
                  required
                />
              </div>
            </div>

            <div class="field">
              <div class="control moneyType columns">
                <div class="column is-2">
                  <label class="radio">
                    <input
                      type="radio"
                      name="moneyType"
                      value="cash"
                      v-model="moneyType"
                      required
                    />
                    Cash
                  </label>
                </div>

                <div class="column">
                  <label class="radio">
                    <input
                      type="radio"
                      name="moneyType"
                      value="card"
                      v-model="moneyType"
                      checked
                    />
                    Card
                  </label>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label secondary">Additional info</label>
              <div class="control">
                <textarea
                  class="textarea"
                  placeholder="if needed"
                  rows="1"
                  v-model="info"
                ></textarea>
              </div>
            </div>

            <Notification
              v-if="error"
              @close="error = false"
              :message="errorMessage"
            />

            <div class="control" :class="loading && `is-loading`">
              <button class="button">Add</button>
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
  name: "Income",
  components: { Hero, Notification },
  data() {
    return {
      income: "",
      moneyType: "",
      info: "",
      error: false,
      errorMessage: "",
      loading: false,
    };
  },

  methods: {
    plus() {
      // add spiner to button
      this.loading = true;

      // adds data based by your user ID
      firebase
        .firestore()
        .collection("users")
        // getting user ID
        .doc(firebase.auth().currentUser.uid)
        .collection("money")
        .add({
          income: Number(this.income),
          moneyType: this.moneyType,
          info: this.info,
          date: firebase.firestore.FieldValue.serverTimestamp(),
          collection: "income",
        })
        .then(() => {
          this.error = true;
          this.errorMessage = `You have added ${this.income}€ to you income database`;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.error = true;
          this.errorMessage = "oops...  " + error.message;
        });
    },
  },
};
</script>

<style scoped>
/* major styles */
.section {
  padding: 1.5em;
}

form {
  margin-top: 2em;
}

label {
  color: #ed185b;
}

/* input styles */
.input,
textarea {
  color: #eb6e56;
}

.input:hover,
textarea:hover {
  border-color: #f4bc53;
}

.moneyType {
  margin: 1.5em 0;
}

.secondary {
  color: #f4bc53;
}

/* button styles */
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

.radio:hover {
  color: #f4bc53;
}
</style>
