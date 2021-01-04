<template>
  <div id="app">
    <!-- <topHeader></topHeader> -->
    <router-view />
  </div>
</template>

<script>
// import TopHeader from "./components/TopHeader";

export default {
  // components: { topHeader: TopHeader },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Saira+Condensed&display=swap");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button {
  font-family: "Saira Condensed", sans-serif;
  text-transform: uppercase;
}

input {
  padding: 0 10px;
  border-color: black;

  font-family: "Saira Condensed", sans-serif;
}
</style>
