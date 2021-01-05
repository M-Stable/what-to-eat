<template>
  <div class="outer">
    <div class="card add-card">
      <input placeholder="Category Name" v-model="categoryName" />
      <button class="add" @click="addHandler()">
        Add
      </button>
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
    };
  },
  methods: {
    //TODO: CHECK FOR UNIQUE CATEGORY
    addHandler() {
      const userId = firebase.auth().currentUser.uid;

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
  margin: 30px;
  padding: 10px;
  font-family: "Saira Condensed", sans-serif;
  border: 3px solid black;

  display: flex;
  justify-content: center;
  flex-direction: column;
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
</style>
