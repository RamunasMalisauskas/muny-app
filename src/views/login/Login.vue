<template>
  <div id="login">
    <div class="section">
      <div class="container">
        <Hero />

        <form name="login">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="e.g Alex Smith" />
            </div>
          </div>

          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
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
h3 {
  margin-bottom: 3em;
}</style
>>
