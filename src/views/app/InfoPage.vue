<template>
  <div id="info">
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
          {{ group }}
        </div>

        <div class="top">type:</div>
        <div class="info">
          {{ type }}
        </div>

        <div class="top">details:</div>
        <div class="info">
          {{ details }}
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
      date: "",
      plusMinus: "",
      group: "",
      type: "",
      details: "",
    };
  },

  beforeMount() {
    const userId = firebase.auth().currentUser.uid;

    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("expenses")
      .doc(this.$route.params.id)
      .get()
      .then((item) => {
        this.date = item.data().date;
        this.plusMinus = "-" + item.data().expenses + "€";
        this.type = item.data().moneyType;
        this.group = item.data().group;
        this.details = item.data().info;
      });
  },
};
</script>

<style scoped>
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
</style>
