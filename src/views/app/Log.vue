<template>
  <div id="log">
    <div class="section">
      <div class="container">
        <Hero />

        <div class="desktop">
          <table v-show="toggle" class="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>date</th>
                <th>+/-</th>
                <th>group</th>
                <th>type</th>
                <th>details</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="transfer in transferData" :key="transfer.id">
                <td>
                  {{
                    new Date(transfer.date.seconds * 1000).toLocaleString("lt")
                  }}
                </td>
                <td>{{ transfer.plusMinus }}</td>
                <td>{{ transfer.group }}</td>
                <td>{{ transfer.type }}</td>
                <td>{{ transfer.info }}</td>
                <!-- <td>
                  <button
                    class="button is-small"
                    v-on:click="remove(transfer.id)"
                  >
                    delete
                  </button>
                </td> -->
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <th>date</th>
                <th>+/-</th>
                <th>group</th>
                <th>type</th>
                <th>details</th>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="mobile">
          <div class="card" v-for="transfer in transferData" :key="transfer.id">
            <div class="date">
              {{ new Date(transfer.date.seconds * 1000).toLocaleString("lt") }}
            </div>

            <div class="info-main">{{ transfer.plusMinus }}</div>

            <div>
              <router-link :to="/infopage/ + transfer.id">
                <div class="control">
                  <button class="button">more info →</button>
                </div>
              </router-link>
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
      // assign it to search button
      // group: "home",
      // type: "card",
      // sort: "desc",
      timeSort: "desc",
      transferData: [],
    };
  },

  methods: {
    toggle() {
      this.active = !this.active;
    },

    remove(id) {
      const user = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid);

      console.log(
        user.collection("expenses").doc(id) || user.collection("income").doc(id)
      );
    },
  },

  beforeMount() {
    const userId = firebase.auth().currentUser.uid;

    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("expenses")
      // trying
      // .where("moneyType", "==", `${this.type}`)
      // .where("group", "==", `${this.group}`)
      // .orderBy("expenses", `${this.sort}`)
      .orderBy("date", `${this.timeSort}`)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((item) => {
          this.transferData.push({
            id: item.id,
            date: item.data().date,
            plusMinus: "-" + item.data().expenses + "€",
            type: item.data().moneyType,
            group: item.data().group,
            info: item.data().info,
          });
        });
      });

    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("income")
      .orderBy("date", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((item) => {
          this.transferData.push({
            id: item.id,
            date: item.data().date,
            plusMinus: "+" + item.data().income + "€",
            type: item.data().moneyType,
            info: item.data().info,
          });
        });
      });
  },
};
</script>

<style scoped>
/* major styles */
.section {
  padding: 1.5em;
}

.is-narrow {
  padding: 0;
}

.desktop {
  display: block;
}

.mobile {
  display: none;
}

/* table style */

.table thead th {
  color: #ed185b;
}

td {
  color: #eb6e56;
}

td:nth-child(2) {
  color: #ed185b;
}

/* // delete button style */
/* td:last-child {
  padding: 0.5em 0;
  text-align: right;
} */

/* mobile styles */
.card {
  margin: 1em 0;
  padding: 1em;
}

.top {
  color: #ed185b;
}

.info {
  color: #ed185b;
  font-size: 1.25em;
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
  padding: 0.5em;
  border-radius: 0.8em;
  color: #eb6e56;
  border: 1px solid #eb6e56;
}

.is-small:hover {
  background: #eb6e56;
  color: #fff;
}

@media only screen and (max-width: 1078px) {
  .desktop {
    display: none;
  }

  .mobile {
    display: block;
  }
}
</style>
