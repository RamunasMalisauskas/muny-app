<template>
  <div id="income">
    <div class="section">
      <div class="container">
        <Hero />

        <div class="container">
          <form name="expenses" v-on:submit.prevent="plus">
            <div class="field">
              <label class="label">Income</label>
              <div class="control">
                <input
                  class="input"
                  type="number"
                  placeholder="$"
                  v-model="income"
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
                      value="Cash"
                      v-model="moneyType"
                    />
                    Cash
                  </label>
                </div>

                <div class="column">
                  <label class="radio">
                    <input
                      type="radio"
                      name="moneyType"
                      value="Card"
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

      // getting user ID
      const userId = firebase.auth().currentUser.uid;

      // adds data based by your user ID
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("income")
        .add({
          income: this.income,
          moneyType: this.moneyType,
          info: this.info,
          date: firebase.firestore.FieldValue.serverTimestamp(),
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
.section {
  padding: 1.5em;
}

form {
  margin-top: 2em;
}

label {
  color: #ed185b;
}

.input,
textarea {
  color: #eb6e56;
}

textarea {
  max-width: 66%;
  min-width: 50%;
}

.input:hover,
textarea:hover {
  border-color: #f4bc53;
}

.moneyType {
  margin: 1.5em 0;
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

.radio:hover {
  color: #f4bc53;
}
</style>
