<template>
  <div class="outer">
    <div class="card add-card">
      <input
        placeholder="Category Name"
        v-model="categoryName"
        @keyup="enterHandler"
      />
      <button class="add" @click="addHandler()">
        Add
      </button>
      <span v-if="error" class="error">This category already exists</span>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

export default {
  data() {
    return {
      categoryName: "",
      error: false,
    };
  },
  props: {
    categories: Array,
  },
  methods: {
    enterHandler(e) {
      if (e.keyCode === 13) {
        this.addHandler();
      }
    },
    addHandler() {
      const userId = firebase.auth().currentUser.uid;

      if (
        this.categories.some(
          (e) => e.category.toUpperCase() === this.categoryName.toUpperCase()
        )
      ) {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 2000);
        return;
      }

      const categoryData = {
        category: this.categoryName,
        items: 0,
        avgRating: 0,
      };

      const newPostKey = firebase
        .database()
        .ref("users/" + userId)
        .child("categories")
        .push().key;

      const updates = {};
      updates["users/" + userId + "/categories/" + newPostKey] = categoryData;

      this.categoryName = "";

      return firebase
        .database()
        .ref()
        .update(updates);
    },
  },
};
</script>

<style scoped>
.outer {
  flex-basis: 25%;
}

.card {
  background: #c6efad;
  min-width: 200px;
  height: 270px;
  margin-bottom: 50px;
  margin-right: 50px;
  padding: 10px;
  font-family: "Saira Condensed", sans-serif;
  border: 3px solid black;

  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
}

.card:hover {
  transform: translate(10px, 10px);
  transition: 0.3s;
  background: #adefdb;
  box-shadow: none;
}

.add-card {
  background: rgb(187, 187, 187);
}

.add-card:hover {
  transform: none;
  background: rgb(187, 187, 187);
}

.add {
  height: 40px;
  width: 100%;
  border: 3px solid black;
  align-self: center;
  background: black;
  color: white;
  margin-top: 10px;

  transition: 0.3s;
}

.add:hover {
  cursor: pointer;
  background: white;
  color: black;
}

input {
  font-size: 18px;
  padding: 10px;
}

.error {
  color: red;
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 5px;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
