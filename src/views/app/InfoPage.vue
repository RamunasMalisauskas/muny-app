<template>
  <div id="info">
    mobile info

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

        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
export default {
  name: "Info",

  data() {
    return {
      transferData: [],
    };
  },
};
</script>

<style></style>
