<template>
  <div id="income">
    <div class="section">
      <div class="container">
        <Hero />

        <div class="container">
          <form name="expenses" v-on:submit.prevent="plus">
            <div class="field">
              <label class="label">Income</label>
              <div class="control">
                <input
                  class="input"
                  type="number"
                  placeholder="$"
                  v-model="income"
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

            <div class="control" :class="loading && `is-loading`">
              <button class="button">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hero from "../../components/Hero";
import Notification from "../../components/Notification";

export default {
  name: "Income",
  components: { Hero, Notification },
  data() {
    return {
      income: "",
      moneyType: "",
      info: "",
      error: false,
      errorMessage: "",
      loading: false,
    };
  },

  methods: {
    plus() {
      console.log(this.income, this.info, this.moneyType);
    },
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
</style>
