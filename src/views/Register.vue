<template>
  <div class="login">
    <div class="content">
      <h1 class="header">Register</h1>
      <form @submit.prevent="pressed">
        <input type="name" v-model="name" placeholder="Full Name" required />
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
        <button class="loginBtn" type="submit">Register</button>
      </form>
      <span class="or">or</span>
      <button class="googleBtn" v-on:click="googlePressed" type="submit">
        <img class="googleIcon" src="../icons/google.png" alt="google icon" />
        <span class="buttonText">Continue With Google</span>
      </button>
      <div v-if="error" class="error">{{ error.message }}</div>
      <span>
        Already have an Account?
        <router-link to="/login">Log In</router-link>
      </span>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default {
  methods: {
    async pressed() {
      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        firebase
          .database()
          .ref("users/" + user.uid)
          .set({
            username: this.name,
            email: user.email,
          });
        this.$user.name = this.name;
        this.$user.uid = user.uid;
        this.$user.email = user.email;
        this.$router.replace({ name: "home" });
      } catch (err) {
        console.log(err);
      }
    },
  },
  data() {
    return {
      name: "",
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
