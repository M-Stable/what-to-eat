<template lang="">
    <div>
        Logged in
        <span v-if="loggedIn">Yes</span>
        <span v-else>No</span>
        <div>
            <button @click="signOut">Sign out</button>
        </div>
    </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.loggedIn = user ? true : false;
    });
  },
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    async signOut() {
      try {
        await firebase.auth().signOut();
        this.$router.replace({ name: "login" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="">
</style>