<template>
  <div id="expenses">
    <div class="section">
      <div class="container">
        <Hero />

        <div class="container">
          <form name="expenses" v-on:submit.prevent="minus">
            <div class="field">
              <label class="label">Where did you spend it?</label>
              <div class="columns">
                <div class="column is-4">
                  <label class="label secondary">select here:</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="selectedGroup">
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
import Hero from "../../components/Hero";
import Notification from "../../components/Notification";

export default {
  name: "Expenses",
  components: { Hero, Notification },

  data() {
    return {
      groups: [],
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
    // test() {
    //   console.log(firebase.auth().currentUser.uid);
    // },

    minus() {
      this.loading = true;

      // getting user ID
      const userId = firebase.auth().currentUser.uid;

      // filer which group to be added to DB
      const filteredGroup =
        this.addGroup.length > 1 ? this.addGroup : this.selectedGroup;

      // adds data based by your user ID
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("expenses")
        .add({
          group: filteredGroup,
          expenses: this.expenses,
          moneyType: this.moneyType,
          info: this.info,
          date: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log(filteredGroup, this.expenses, this.moneyType, this.info);
          this.error = true;
          this.errorMessage = `You have added ${this.expenses}eur to you expenses`;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.error = true;
          this.errorMessage = "oops...  " + error.message;
        });
    },
  },

  beforeMount() {
    // getting user ID
    const userId = firebase.auth().currentUser.uid;

    // getting groups from user DB
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("expenses")
      .get()
      .then((snapshop) =>
        snapshop.docs.forEach((item) => {
          this.groups.push(item.data().group);
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
  color: #ef735f;
}

.input,
textarea {
  color: #ef735f;
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

.secondary {
  color: #f4bc53;
}
</style>
