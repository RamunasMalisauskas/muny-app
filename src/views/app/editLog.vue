<template>
  <div id="expenses">
    <div class="section">
      <div class="container">
        <Hero />

        <div class="column is-6-desktop">
          <form name="expenses" v-on:submit.prevent="edit">
            <div class="field">
              <label class="label">Where did you spend it?</label>
              <div class="columns">
                <div class="column is-4">
                  <label class="label secondary">select here:</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="selectedGroup">
                        <option value="">choose one:</option>
                        <option v-for="group in groups" :key="group.id">{{
                          group
                        }}</option>
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
                        v-model="addGroup"
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
                  required
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
                      value="cash"
                      v-model="moneyType"
                      required
                    />
                    Cash
                  </label>
                </div>

                <div class="column">
                  <label class="radio">
                    <input
                      type="radio"
                      name="moneyType"
                      value="card"
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

            <div class="control">
              <button class="button" :class="loading && `is-loading`">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Hero from "../../components/Hero";
import Notification from "../../components/Notification";

export default {
  name: "Expenses",
  components: { Hero, Notification },

  data() {
    return {};
  },
};
</script>

<style></style>
