<template lang="">
  <div>
    <form @submit.prevent="pressed">
      Login
      <div class="email">
        <input type="email" v-model="email" placeholder="email" />
      </div>
      <div class="password">
        <input type="password" v-model="password" placeholder="password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <button v-on:click="googlePressed" type="submit">Login With Google</button>
    <div v-if="error" class="error">{{ error.message }}</div>
    <span>Need an account? Click here to <router-link to="/register">register</router-link></span>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  methods: {
    async pressed() {
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        console.log(user);
        this.$router.replace({ name: "secret" });
      } catch (err) {
        console.log(err);
      }
    },
    async googlePressed() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          console.log(token);
          // The signed-in user info.
          var user = result.user;
          console.log(user);
          // ...
          this.$router.replace({ name: "secret" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
};
</script>
<style lang="scss" scoped>
</style>