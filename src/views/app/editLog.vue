<template>
  <div id="expenses">
    <div class="section">
      <div class="container">
        <Hero />

        <div class="column is-6-desktop">
          <form name="expenses" v-on:submit.prevent="update">
            <label class="label secondary">select type of transfer:</label>
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

            <div class="control">
              <button class="button" :class="loading && `is-loading`">
                Update
              </button>
            </div>

            <router-link to="/Log">
              <button class="remove button" @click="remove(id)">
                Delete
              </button>
            </router-link>
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
      this.loading = false;
    },

    remove(id) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("money")
        .doc(id)
        .delete();
    },
  },

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

<style></style>
