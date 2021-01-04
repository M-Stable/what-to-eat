<template>
  <div class="card" v-bind:class="{ 'add-card': this.type === 'add' }">
    <template v-if="this.type === 'category'">
      <h2>{{ this.category }}</h2>
      <span class="info-text">Items: {{ this.items }}</span>
      <span class="info-text">Average Rating: {{ this.avgRating }}</span>
    </template>

    <template v-if="this.type === 'add'">
      <input placeholder="Category Name" v-model="categoryName" />
      <button class="add" @click="addHandler()">
        Add
      </button>
    </template>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

export default {
  data() {
    return {
      addActive: false,
      categoryName: "",
    };
  },
  props: {
    category: String,
    avgRating: Number,
    items: Number,
    type: String,
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

<style>
.card {
  background: #c6efad;
  min-width: 230px;
  height: 270px;
  margin: 30px;
  padding: 10px;
  font-family: "Saira Condensed", sans-serif;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  border: 3px solid black;

  display: flex;
  justify-content: center;
  flex-direction: column;
}

.add-card {
  background: rgb(187, 187, 187);
}

h2 {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
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

.info-text {
  font-size: 1.5rem;
}

input {
  font-size: 18px;
  padding: 10px;
}
</style>
