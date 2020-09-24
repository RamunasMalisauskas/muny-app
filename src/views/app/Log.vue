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
          <div
            class="card"
            v-show="toggle"
            v-for="transfer in transferData"
            :key="transfer.id"
          >
            <div class="top">date:</div>
            <div class="date">
              {{ new Date(transfer.date.seconds * 1000).toLocaleString("lt") }}
            </div>

            <div class="info-main">{{ transfer.plusMinus }}</div>

            <div class="dropdown" :class="active && `is-active`">
              <div class="dropdown-trigger">
                <button
                  @click="toggle"
                  class="button"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                >
                  <span>more info -></span>
                </button>
              </div>

              <div class="dropdown-menu" id="dropdown-menu2" role="menu">
                <div class="dropdown-content">
                  <div class="dropdown-item">
                    <div class="top">group:</div>
                    <div class="info">
                      {{ transfer.group }}
                    </div>
                  </div>
                  <hr class="dropdown-divider" />
                  <div class="dropdown-item">
                    <div class="top">type:</div>
                    <div class="info">
                      {{ transfer.type }}
                    </div>
                  </div>
                  <hr class="dropdown-divider" />
                  <div class="dropdown-item">
                    <div class="top">details:</div>
                    <div class="info">
                      {{ transfer.info }}
                    </div>
                  </div>
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
      transferData: [],
      active: true,
    };
  },

  methods: {
    toggle() {
      this.active = !this.active;
    },
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

/* mobile styles */
.card {
  margin: 1em 0;
  padding: 1em;
}

.top {
  color: #eb6e56;
}

.info {
  color: #ed185b;
  font-size: 1.25em;
}

.date {
  font-size: 1.25em;
}

.info-main {
  color: #ed185b;
  font-size: 2em;
  padding: 1em 0;
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
