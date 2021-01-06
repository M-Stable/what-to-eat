<template lang="">
  <div class="login">
    <div class="content">
      <h1 class="header">Log In</h1>
      <form @submit.prevent="pressed">
        <input
          type="email"
          v-model="email"
          placeholder="Email Address"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
        <button class="loginBtn" type="submit">Log In</button>
      </form>
      <span class="or">or</span>
      <button class="googleBtn" v-on:click="googlePressed" type="submit">
        <img class="googleIcon" src="../icons/google.png" alt="google icon" />
        <span class="buttonText">Continue With Google</span>
      </button>
      <div v-if="error" class="error">{{ error.message }}</div>
      <span>
        Need an account? Click here to
        <router-link to="/register">register</router-link>
      </span>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  methods: {
    async pressed() {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        this.$router.replace({ name: "home" });
      } catch (err) {
        console.log(err);
      }
    },
    async googlePressed() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          /** @type {firebase.auth.OAuthCredential} */
          this.$router.replace({ name: "home" });
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
<style scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header {
  font-size: 64px;
  margin-bottom: 100px;
}

.content {
  min-height: 100vh;
  min-width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input {
  width: calc(100% - 25px);
  height: 50px;
  margin-bottom: 30px;
  font-size: 18px;
}

.loginBtn {
  border: 3px solid black;
  width: 100%;
  font-size: 28px;
  background: rgb(0, 0, 0);
  color: white;
  padding: 0 30px;
  margin-bottom: 30px;
}

.or {
  font-weight: bold;
  font-size: 20px;
}

.googleBtn {
  border: 3px solid black;
  width: 100%;
  font-size: 36px;
  background: transparent;
  padding: 0 30px;
  margin: 30px;
  position: relative;
}

button:hover {
  cursor: pointer;
}

.googleIcon {
  height: 1.5rem;
  align-self: start;

  position: absolute;
  left: 10px;
  top: 50%;
  transform: translate(50%, -50%);
}
</style>
