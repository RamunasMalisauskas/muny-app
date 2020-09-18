<template>
  <div id="login">
    <div class="section">
      <div class="container">
        <Hero />

        <form name="login">
          <div class="field">
            <label class="label">Your Household Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="e.g 742 Evergreen Terrace"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Your User Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="e.g John Jones"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Your Password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                placeholder="****"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Hero from "../../components/Hero";

export default {
  name: "Login",
  components: { Hero },
};
</script>

<style scoped>
form {
  margin-top: 1em;
}
</style>
