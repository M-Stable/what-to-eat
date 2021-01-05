<template lang="">
  <div class="home-page">
    <div class="content">
      <h1>What to eat?</h1>
      <div class="options">
        <input class="search" v-model="search" placeholder="Search..." />
      </div>
      <div class="card-container">
        <card
          v-for="(item, index) in this.filteredCategories"
          :key="index"
          v-bind:category="item.category"
          v-bind:avgRating="item.avgRating"
          v-bind:items="item.items"
        />
        <add-card type="add" />
      </div>
    </div>

    <button class="sign-out" @click="signOut">Sign out</button>
  </div>
</template>
<script>
import firebase from "firebase/app";
import Card from "../components/Card";
import AddCard from "../components/AddCard";
import "firebase/database";

export default {
  data() {
    return {
      email: this.$user.email,
      uid: this.$user.uid,
      name: this.$user.name,
      categories: [],
      search: "",
      categoryKeys: [],
    };
  },
  created() {
    const userId = firebase.auth().currentUser.uid;
    const dbRefObject = firebase
      .database()
      .ref("/users/" + userId + "/categories");
    dbRefObject.on("value", (snap) => {
      this.categories = Object.values(snap.val());
    });

    // Read Categories to grab category id
    firebase
      .database()
      .ref("/users/" + userId + "/categories")
      .once("value")
      .then((snap) => {
        // For each Category, Read item values to update avg and total items
        Object.keys(snap.val()).forEach((key) => {
          firebase
            .database()
            .ref("/users/" + userId + "/items")
            .once("value")
            .then((snapshot) => {
              const allItems = snapshot.val();

              const result = Object.keys(allItems).map((itemkey) => {
                if (allItems[itemkey].category === snap.val()[key].category)
                  return itemkey;
              });

              const itemKeys = result.filter((key) => key !== undefined);

              const ratings = itemKeys.map((key) => allItems[key].rating);
              const arrAvg =
                ratings.reduce((acc, current) => acc + current, 0) /
                itemKeys.length;

              const categoryData = {
                category: snap.val()[key].category,
                items: itemKeys.length,
                avgRating: arrAvg,
              };

              const updates = {};
              updates["/users/" + userId + "/categories/" + key] = categoryData;

              return firebase
                .database()
                .ref()
                .update(updates);
            });
        });
      });
  },
  computed: {
    filteredCategories: function() {
      return this.categories.filter((item) =>
        item.category.includes(this.search)
      );
    },
  },
  components: {
    Card,
    AddCard,
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
<style scoped>
.home-page {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.sign-out {
  position: absolute;
  top: 10px;
  right: 10px;
}

.content {
  width: calc(80vw - 80px);
  min-height: calc(100vh - 80px);
  padding: 40px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
}

h1 {
  font-size: 48px;
  margin-left: 30px;
}

.options {
  margin-left: 30px;
}

.search {
  height: 40px;
  width: 50%;
  font-size: 18px;
}
</style>
