<template>
  <div id="log">
    <div class="section">
      <div class="container">
        <Hero />

        <div class="section">
          <div class="container">
            <table>
              <thead>
                <tr>
                  <th>head1</th>
                  <th>head2</th>
                  <th>head3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>data1</td>
                  <td>data2</td>
                  <td>data3</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>head1</th>
                  <th>head2</th>
                  <th>head3</th>
                </tr>
              </tfoot>
            </table>
          </div>
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

export default {
  name: "Log",
  components: { Hero },
};
</script>

<style scoped>
.section {
  padding: 1.5em;
}
</style>
