<template>
  <div id="expenses">
    <div class="section">
      <div class="container">
        <Hero />

        <div class="column is-6-desktop">
          <form name="expenses" v-on:submit.prevent="update">
            <div class="field">
              <label class="label">select type of transfer:</label>
              <div class="control">
                <div class="select">
                  <select v-model="newTransferType">
                    <!-- disabled transfer value is as a referense of the current one and for display -->
                    <option disabled value="">
                      current: {{ transferType }}
                    </option>
                    <option>
                      <!-- returning oposite value of current -->
                      {{ transferType === "income" ? "expense" : "income" }}
                    </option>
                    <option> {{ transferType }} </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label">change amount:</label>
              <div class="control">
                <input
                  class="input"
                  type="number"
                  placeholder="$"
                  v-model="amount"
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
              <label class="label secondary">Additional info:</label>
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

            <div class="control" @click="update">
              <button class="button" :class="loading && `is-loading`">
                Update
              </button>
            </div>
          </form>

          <button class="remove button" @click="toggle">
            Delete
          </button>

          <router-link to="/log">
            <button class="link button">
              Go back ->
            </button>
          </router-link>

          <div class="modal" :class="{ 'is-active': active }">
            <div class="modal-background" v-on:click="toggle"></div>
            <div class="modal-content">
              <h2 class="subtitle">Are you sure?</h2>

              <div class="modal-buttons">
                <router-link to="/log">
                  <button class="button" @click="remove">
                    Delete
                  </button>
                </router-link>

                <button class="remove-modal button" @click="toggle">
                  No
                </button>
              </div>
            </div>
            <button
              class="modal-close is-large"
              aria-label="close"
              @click="toggle"
            ></button>
          </div>
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
  name: "Expenses",
  components: { Hero, Notification },

  data() {
    return {
      transferType: "",
      newTransferType: "",
      amount: "",
      moneyType: "",
      info: "",
      error: false,
      errorMessage: "",
      loading: false,
      active: false,
    };
  },

  methods: {
    update() {
      this.loading = true;

      const setFn = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("money")
        // getting document id from route.params
        .doc(`${this.$route.params.id}`);

      // checking into which collection new data to be added
      if (this.newTransferType === "income" || this.transferType === "income") {
        setFn
          .set({
            // setting collection by the new transfer type, if it's empty (not selected) by the old (one from the beforeMount)
            collection: this.newTransferType || this.transferType,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            income: this.amount,
            moneyType: this.moneyType,
            info: this.info,
          })
          .then(() => {
            this.error = true;
            this.errorMessage = `You have added ${this.amount}€ to your income database`;
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            this.error = true;
            this.errorMessage = "oops...  " + error.message;
          });
      } else {
        setFn
          .set({
            collection: this.newTransferType || this.transferType,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            expenses: this.amount,
            moneyType: this.moneyType,
            info: this.info,
          })
          .then(() => {
            this.error = true;
            this.errorMessage = `You have added ${this.amount}€ to your expenses database`;
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            this.error = true;
            this.errorMessage = "oops...  " + error.message;
          });
      }
    },

    toggle() {
      this.active = !this.active;
    },

    remove() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("money")
        .doc(`${this.$route.params.id}`)
        .delete();
    },
  },

  // fetching  the data by id and inserting it to the form
  beforeMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("money")
      // getting document id from route.params
      .doc(`${this.$route.params.id}`)
      .get()
      .then((item) => {
        // getting data accordingly if it exist as expesense or income
        this.amount = item.data().expenses
          ? item.data().expenses
          : item.data().income;
        this.moneyType = item.data().moneyType;
        this.info = item.data().info;
        this.transferType = item.data().collection;
      });
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

p {
  color: #eb6e56;
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
  margin: 1em 0;
}

.secondary {
  color: #f4bc53;
}

/* button styles */
button {
  margin-top: 0.5em;
  color: #fff;
  border: 0;
  background: #ed185b;
  padding: 1.5em;
  border-radius: 0.8em;
}

.remove {
  margin-top: 1.5em;
  color: #fff;
  background: #eb6e56;
}

.link {
  margin-top: 1.5em;
  color: #ed185b;
  border: 1px solid #ed185b;
  background: #fff;
}

button:hover {
  color: #ed185b;
  border: 1px solid #ed185b;
  background: #fff;
}

.remove:hover,
.remove-modal:hover {
  color: #fff;
  border: 1px solid #ed185b;
  background: #ed185b;
}

.radio:hover {
  color: #f4bc53;
}

/* modal style */
h2 {
  color: #ed185b;
}
.modal-background {
  background: #f4bc53;
  opacity: 0.8;
}

.modal-content {
  background: #f4bc53;
  padding: 2em;
  border-radius: 0.8em;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
}

.remove-modal {
  color: #ed185b;
  border: 1px solid #ed185b;
  background: #fff;
  padding: 1.5em;
  border-radius: 0.8em;
}
</style>
