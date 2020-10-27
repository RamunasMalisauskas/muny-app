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

            <div class="card" v-show="toggle">
              <div class="total">expenses</div>
              <div>
                <!-- getting upshifted calculated % and getting name of the group by maping and returning second value (first is %) -->
                {{
                  groupOne[0] !== "0.00%"
                    ? groupOne[0] + " on " + groupOne.map((x) => x.name)[1]
                    : ""
                }}
              </div>

              <div>
                {{
                  groupTwo[0] !== "0.00%"
                    ? groupTwo[0] + " on " + groupTwo.map((x) => x.name)[1]
                    : ""
                }}
              </div>

              <div>
                {{
                  groupThree[0] !== "0.00%"
                    ? groupThree[0] + " on " + groupThree.map((x) => x.name)[1]
                    : ""
                }}
              </div>

              <div>
                {{
                  groupFour[0] !== "0.00%"
                    ? groupFour[0] + " on " + groupFour.map((x) => x.name)[1]
                    : ""
                }}
              </div>

              <div>
                {{
                  groupFive[0] !== "0.00%"
                    ? groupFive[0] + " on " + groupFive.map((x) => x.name)[1]
                    : ""
                }}
              </div>

              <div>
                <!-- validating last group by pushing it under 1% -->
                {{ this.groupSix >= 0.99 ? this.groupSix + "% on other" : "" }}
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
  name: "Summary",
  components: { Hero },

  data() {
    return {
      groups: [],
      expenses: [],
      groupOne: [],
      groupTwo: [],
      groupThree: [],
      groupFour: [],
      groupFive: [],
      groupSix: "",
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
      this.loading = true;
      // function for adding number in array (where they are given as string)
      const add = (x) => x.map(Number).reduce((a, v) => a + v, 0);

      const result = add(this.plusData) - add(this.minusData);
      // checking if number is positive/ negative or zero and returning with correct sign
      this.plusMinus =
        result.toString()[0] === "-"
          ? result + " €"
          : result == 0
          ? 0
          : "+" + result + " €";

      // same function for type of income
      const cash = add(this.plusTypeCash) - add(this.minusTypeCash);
      this.plusCash =
        cash.toString()[0] === "-"
          ? cash + " €"
          : cash == 0
          ? 0
          : "+" + cash + " €";

      const card = add(this.plusTypeCard) - add(this.minusTypeCard);
      this.plusCard =
        card.toString()[0] === "-"
          ? card + " €"
          : card == 0
          ? 0
          : "+" + card + " €";

      // calculating % of expenses and adding name and pushing to front of arrayS
      this.groupOne.unshift(
        (
          (add(this.groupOne.map((x) => x.minus)) * 100) /
          add(this.minusData)
        ).toFixed(2) + "%"
      );

      this.groupTwo.unshift(
        (
          (add(this.groupTwo.map((x) => x.minus)) * 100) /
          add(this.minusData)
        ).toFixed(2) + "%"
      );

      this.groupThree.unshift(
        (
          (add(this.groupThree.map((x) => x.minus)) * 100) /
          add(this.minusData)
        ).toFixed(2) + "%"
      );

      this.groupFour.unshift(
        (
          (add(this.groupFour.map((x) => x.minus)) * 100) /
          add(this.minusData)
        ).toFixed(2) + "%"
      );

      this.groupFive.unshift(
        (
          (add(this.groupFive.map((x) => x.minus)) * 100) /
          add(this.minusData)
        ).toFixed(2) + "%"
      );

      //  adding all expenses from groups and substracting it from 100%
      this.groupSix = (
        100 -
        (Number(this.groupOne[0].slice(0, -1)) +
          Number(this.groupTwo[0].slice(0, -1)) +
          Number(this.groupThree[0].slice(0, -1)) +
          Number(this.groupFour[0].slice(0, -1)) +
          Number(this.groupFive[0].slice(0, -1)))
      ).toFixed(2);

      this.loading = false;
      this.toggle = !this.toggle;
    },
  },

  // getting informations from DB and making calculations which are been pushed to local arrays
  beforeMount() {
    const get = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
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

          // pushing fetched data to array
          this.groups.push(item.data().group);
          //filtering array from duplicates
          const uniqueGroups = this.groups.filter(
            (x, i) => this.groups.indexOf(x) === i
          );
          this.groups = uniqueGroups;

          // getting data by group (from group array) and pushing it as object into designated group array

          if (item.data().group == this.groups[0]) {
            this.groupOne.push({
              name: this.groups[0],
              minus: item.data().expenses,
            });
          } else if (item.data().group == this.groups[1]) {
            this.groupTwo.push({
              name: this.groups[1],
              minus: item.data().expenses,
            });
          } else if (item.data().group == this.groups[2]) {
            this.groupThree.push({
              name: this.groups[2],
              minus: item.data().expenses,
            });
          } else if (item.data().group == this.groups[3]) {
            this.groupFour.push({
              name: this.groups[3],
              minus: item.data().expenses,
            });
          } else if (item.data().group == this.groups[4]) {
            this.groupFive.push({
              name: this.groups[4],
              minus: item.data().expenses,
            });
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
