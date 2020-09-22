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
                      <select v-model="group">
                        <option>Select dropdown</option>
                        <option>home</option>
                        <option>car</option>
                        <option>travel</option>
                        <option>food-out</option>
                        <option>pets</option>
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
                        v-model="group"
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
  name: "Expenses",
  components: { Hero, Notification },

  data() {
    return {
      group: "",
      expenses: "",
      moneyType: "",
      info: "",
      error: false,
      errorMessage: "",
      loading: false,
    };
  },

  methods: {
    minus() {
      console.log(this.group, this.expenses, this.info, this.moneyType);
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
