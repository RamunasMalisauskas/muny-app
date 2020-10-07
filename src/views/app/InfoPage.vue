<template>
  <div id="info">
    <div class="section">
      <div class="container">
        <Hero />
        <div class="mobile">
          <div class="card">
            <div class="top">date:</div>
            <div class="date">
              {{ new Date(date.seconds * 1000).toLocaleString("lt") }}
            </div>

            <div class="info-main">{{ plusMinus }}</div>

            <div class="top">group:</div>
            <div class="info">
              {{ group || "income" }}  
            </div>

            <div class="top">type:</div>
            <div class="info">
              {{ type }}
            </div>

            <div class="top">details:</div>
            <div class="info">
              {{ details }}
            </div>

            <router-link to="/log">
              <div class="control">
                <button class="button">← go back</button>
              </div>
            </router-link>

            <router-link :to="/editLog/ + id">
              <button class="button is-small">
                Edit
              </button>
            </router-link>
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
  name: "Info",

  components: { Hero },

  data() {
    return {
      id: "",
      date: "",
      plusMinus: "",
      group: "",
      type: "",
      details: "",
    };
  },

  methods: {
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
      .doc(this.$route.params.id)
      .get()
      .then((item) => {
        this.id = this.$route.params.id;

        this.date = item.data().date;
        this.plusMinus = item.data().expenses
          ? "-" + item.data().expenses + "€"
          : "+" + item.data().income + "€";
        this.type = item.data().moneyType;
        this.group = item.data().group;
        this.details = item.data().info;
      });
  },
};
</script>

<style scoped>
.section {
  padding: 1.5em;
}

.card {
  margin: 1em 0;
  padding: 1em;
}

.top {
  color: #ed185b;
}

.info {
  color: #eb6e56;
  font-size: 1.25em;
  margin-bottom: 1em;
}

.date {
  color: #eb6e56;
  font-size: 1.25em;
}

.info-main {
  color: #ed185b;
  font-size: 2em;
  padding: 0.75em 0;
}

/* button styles */
button {
  color: #ed185b;
  border: 1px solid #ed185b;
  background: #fff;
  padding: 1.5em;
  border-radius: 0.8em;
}

.is-small {
  margin-top: 3em;
  border-radius: 0.8em;
  border: 0 solid;
  background: #eb6e56;
  color: #fff;
}
</style>
