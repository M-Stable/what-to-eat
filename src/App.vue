<template>
  <div id="app">
    <topHeader></topHeader>
    <div id="nav">
      <router-link to="/register">Register</router-link>|
      <router-link to="/login">Login</router-link>|
      <router-link to="/secret">Secret</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import TopHeader from "./components/TopHeader";

export default {
  components: { topHeader: TopHeader },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
