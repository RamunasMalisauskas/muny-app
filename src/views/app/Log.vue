<template>
  <div id="log">
    <div class="section">
      <div class="container">
        <Hero />

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

        <div class="mobile-card">
          <div
            class="card"
            v-show="toggle"
            v-for="transfer in transferData"
            :key="transfer.id"
          >
            <div class="top">date</div>
            <div class="info">
              {{ new Date(transfer.date.seconds * 1000).toLocaleString("lt") }}
            </div>

            <div class="top">+/-</div>
            <div class="info">
              {{ transfer.plusMinus }}
            </div>

            <div class="top">group</div>
            <div class="info">
              {{ transfer.group }}
            </div>

            <div class="top">type</div>
            <div class="info">
              {{ transfer.type }}
            </div>

            <div class="top">details</div>
            <div class="info">
              {{ transfer.info }}
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
      transferData: [],
      toggle: true,
    };
  },

  beforeMount() {
    const userId = firebase.auth().currentUser.uid;

    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("expenses")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((item) => {
          this.transferData.push({
            id: item.id,
            date: item.data().date,
            plusMinus: "-" + item.data().expenses,
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
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((item) => {
          this.transferData.push({
            id: item.id,
            date: item.data().date,
            plusMinus: "+" + item.data().income,
            type: item.data().moneyType,
            info: item.data().info,
          });
        });
      });
  },
};
</script>

<style scoped>
.section {
  padding: 1.5em;
}

.is-narrow {
  padding: 0;
}
</style>
