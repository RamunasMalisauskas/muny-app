<template>
  <div id="summary">
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
                Get summary
              </button>
            </div>

            <div class="card" v-show="toggle">
              <div class="top">
                <div class="total">balance</div>

                <div class="total title is-6-desktop">{{ this.plusMinus }}</div>
              </div>

              <div class="columns">
                <div class="column">
                  <div class="bottom">in cash:</div>

                  <div class="bottom">{{ this.plusCash }}</div>
                </div>

                <div class="column">
                  <div class="bottom">in card:</div>

                  <div class="bottom">{{ this.plusCard }}</div>
                </div>
              </div>
            </div>

            <!-- <div class="card" v-show="toggle">
              <div class="total">expenses</div>

              <div v-for="group in groups" :key="group.name">
                <div>
                  {{ group.name }}
                </div>
                <div>{{ group.value }}</div>
              </div>
            </div> -->
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
  name: "Summary",
  components: { Hero },

  data() {
    return {
      groups: [],
      plusData: [],
      minusData: [],
      plusTypeCash: [],
      minusTypeCash: [],
      plusTypeCard: [],
      minusTypeCard: [],
      plusCash: "",
      plusCard: "",
      plusMinus: "",
      loading: false,
      toggle: false,
    };
  },

  methods: {
    get() {
      // console.log(this.groups.map((a) => a.name));
      this.loading = true;
      // function for adding number in array (where they are given as string)
      const add = (x) => x.map(Number).reduce((a, v) => a + v, 0);

      const result = add(this.plusData) - add(this.minusData);
      // checking if number is positive/ negative or zero and returning with correct sign
      this.plusMinus =
        result.toString()[0] === "-"
          ? result + " €"
          : result.toString() == 0
          ? 0
          : "+" + result + " €";

      // same function for type of income
      const cash = add(this.plusTypeCash) - add(this.minusTypeCash);
      this.plusCash =
        cash.toString()[0] === "-"
          ? cash + " €"
          : cash.toString() == 0
          ? 0
          : "+" + cash + " €";

      const card = add(this.plusTypeCard) - add(this.minusTypeCard);
      this.plusCard =
        card.toString()[0] === "-"
          ? card + " €"
          : card.toString() == 0
          ? 0
          : "+" + card + " €";

      this.loading = false;
      this.toggle = !this.toggle;
    },
  },

  // getting informations from DB and making calculations which are been pushed to local arrays
  beforeMount() {
    // getting user ID
    const userId = firebase.auth().currentUser.uid;

    const get = firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("money");


    // getting expenses amount by selectin' specific value in collection (in this case collection == expenses)
    get
      .where("collection", "==", "expenses")
      .get()
      .then((snapshot) =>
        // running through the document
        snapshot.docs.forEach((item) => {
          // fetching expenses and pushing it to minusData array
          this.minusData.push(item.data().expenses);

          // geting detailed info of expenses type
          // checking the type of data and pushing it to accordin array
          if (item.data().moneyType == "cash") {
            this.minusTypeCash.push(item.data().expenses);
          } else {
            this.minusTypeCard.push(item.data().expenses);
          }
        })
      );

    // getting income
    // same logic as expenses
    get
      .where("collection", "==", "income")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((item) => {
          this.plusData.push(item.data().income);

          // geting type of income
          if (item.data().moneyType == "cash") {
            this.plusTypeCash.push(item.data().income);
          } else {
            this.plusTypeCard.push(item.data().income);
          }
        })
      );

    // getting group data from user DB
    // minus
    //   .then((snapshop) =>
    //     snapshop.docs.forEach((item) => {
    //       this.groups.push({
    //         id: item.id,
    //         name: item.data().group,
    //         value: item.data().expenses,
    //       });
    //     })
    //   )
    //   // filter unique groups from DB data
    //   .then(() => {
    //     const uniqueGroups = this.groups.filter(
    //       (x, i) => this.groups.indexOf(x) === i
    //     );
    //     this.groups = uniqueGroups;
    //   });

    // getting group values
  },
};
</script>

<style scoped>
/* major styles */
.section {
  padding: 1.5em;
}

.is-centered {
  text-align: center;
  margin-top: 0.25em;
}

.toggle {
  display: none;
}

.column {
  margin: 0;
  padding: 0;
}

.columns {
  padding: 1em;
}

/* card style */

.card {
  padding: 0.75em;
  margin-bottom: 0.75em;
}
.top {
  padding-bottom: 1em;
}
.total {
  color: #ed185b;
  padding-bottom: 0.25em;
}

.bottom {
  color: #eb6e56;
}

/* button style */
button {
  color: #fff;
  background: #ed185b;
  padding: 1.5em;
  border-radius: 0.8em;
  margin-bottom: 1em;
}

button:hover {
  color: #ed185b;
  border: 1px solid #ed185b;
  background: #fff;
}
</style>
