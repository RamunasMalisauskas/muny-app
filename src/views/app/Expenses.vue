<template>
  <div id="expenses">
    <div class="section">
      <div class="container">
        <Hero />

        <div class="column is-6-desktop">
          <form name="expenses" v-on:submit.prevent="minus">
            <div class="field">
              <label class="label">Where did you spend it?</label>
              <div class="columns">
                <div class="column is-4">
                  <label class="label secondary">select here:</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="selectedGroup">
                        <option disabled value="">choose one:</option>
                        <option v-for="group in groups" :key="group.id">{{
                          group
                        }}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="column">
                  <div class="field">
                    <label class="label secondary">or add here:</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        placeholder="e.g. home"
                        v-model="addGroup"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label">How much?</label>
              <div class="control">
                <input
                  class="input"
                  type="number"
                  placeholder="$"
                  v-model="expenses"
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

            <div class="control">
              <button class="button" :class="loading && `is-loading`">
                Add
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
  name: "Expenses",
  components: { Hero, Notification },

  data() {
    return {
      groups: ["groceries", "pets", "foodout", "car"],
      selectedGroup: "",
      addGroup: "",
      expenses: "",
      moneyType: "",
      info: "",
      error: false,
      errorMessage: "",
      loading: false,
    };
  },

  methods: {
    minus() {
      // add spiner to button
      this.loading = true;

      // filer which group to be added to DB
      const filteredGroup =
        this.addGroup.length > 2 && this.selectedGroup.length === 0
          ? this.addGroup
          : this.selectedGroup;

      // adds data based by your user ID
      //  checks if you have selected group beforehand
      if (this.addGroup.length === 0 && this.selectedGroup.length === 0) {
        this.error = true;
        this.errorMessage = "please select group";
        this.loading = false;
      } else {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("money")
          .add({
            collection: "expenses",
            group: filteredGroup.toLowerCase(),
            expenses: Number(this.expenses),
            moneyType: this.moneyType,
            info: this.info,
            date: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            console.log(this.filteredGroup);
            this.error = true;
            this.errorMessage = `You have added ${this.expenses}€ to your expenses database`;
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            this.error = true;
            this.errorMessage = "oops...  " + error.message;
          });
      }
    },
  },

  beforeMount() {
    // getting groups from user DB
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("money")
      .get()
      .then((snapshop) =>
        snapshop.docs.forEach((item) => {
          item.data().group ? this.groups.push(item.data().group) : "";
        })
      )
      // filter unique groups from DB data
      .then(() => {
        const uniqueGroups = this.groups.filter(
          (x, i) => this.groups.indexOf(x) === i
        );
        this.groups = uniqueGroups;
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
