<template>
  <div id="log">
    <div class="section">
      <div class="container">
        <Hero />

        <div class="columns is-centered">
          <div class="column is-half">
            <div class="control">
              <button
                class="button"
                @click="get()"
                :class="loading && `is-loading`"
              >
                Get info
              </button>
            </div>

            <div class="card">
              <div class="top">
                <p class="title is-6-desktop">{{ this.plusMinus }}</p>
                <div class="bottom columns">
                  <div class="column"><p class="subtitle">100</p></div>
                  <div class="column"><p class="subtitle">1900</p></div>
                </div>
              </div>
            </div>
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

export default {
  name: "Log",
  components: { Hero },

  data() {
    return {
      plusData: [],
      minusData: [],
      plusMinus: "",
      loading: false,
    };
  },

  methods: {
    get() {
      // function for adding number in array (where they are given as string)
      const add = (x) => x.map(Number).reduce((a, v) => a + v);
      const result = add(this.plusData) - add(this.minusData);
      // checking if number is positive or negative and returning positive number wih +
      this.plusMinus = result[0] === "-" ? result + " €" : "+" + result  + " €";
    },
  },

  // getting informations from DB and making calculations which are been pushed to local arrays
  beforeMount() {
    // geting expenses
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("expenses")
      .get()
      .then((snapshot) =>
        // running through the document
        snapshot.docs.forEach((item) => {
          // fetching expenses and pushing it to minusData array
          this.minusData.push(item.data().expenses);
        })
      );

    // geting income
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("income")
      .get()
      .then((snapshot) =>
        // running through the document
        snapshot.docs.forEach((item) => {
          // fetching expenses and pushing it to plusData array
          this.plusData.push(item.data().income);
        })
      );
  },
};
</script>

<style scoped>
/* major styles */
.is-centered {
  text-align: center;
}

.columns {
  margin-top: 2em;
}

/* button style */
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
</style>
