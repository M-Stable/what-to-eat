<template lang="">
  <div class="login">
    <div class="content">
      <router-link to="/">
        <button class="back-button">
          <chevron-left class="left-icon" :size="30" /> Back
        </button>
      </router-link>

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
        <button class="loginBtn" type="submit" :disabled="loading">
          <clip-loader :loading="loading" color="#fff" size="10px" />
          <span v-if="!loading">Log In</span>
        </button>
      </form>
      <span v-if="error" class="error">Incorrect Email or Password</span>
      <span class="or">or</span>
      <button class="googleBtn" v-on:click="googlePressed" type="submit">
        <img class="googleIcon" src="../icons/google.png" alt="google icon" />
        <span class="buttonText">Continue With Google</span>
      </button>
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
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";

export default {
  methods: {
    async pressed() {
      this.loading = true;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        this.loading = false;
        this.$router.replace({ name: "home" });
      } catch (err) {
        this.loading = false;
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    },
    async googlePressed() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          /** @type {firebase.auth.OAuthCredential} */
          this.loading = false;
          this.$router.replace({ name: "home" });
        })
        .catch((error) => {
          this.loading = false;
          console.log(error)
        });
    },
  },
  data() {
    return {
      email: "",
      password: "",
      error: false,
      loading: false,
    };
  },
  components: {
    ClipLoader,
    ChevronLeft,
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
  font-size: 1.5rem;
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

.error {
  color: red;
  text-align: center;
  margin-bottom: 30px;
}

.back-button {
  display: flex;
  align-items: center;
  font-size: 1rem;
  border: none;
  padding-right: 15px;
  outline: none;
  position: absolute;
  top: 10px;
  left: 10px;
  background: white;
  transition: 0.3s;
}

.back-button:hover {
  background: black;
  color: white;
  transition: 0.3s;
}

.left-icon {
  height: 30px;
  width: 30px;
}
</style>
