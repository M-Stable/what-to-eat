<template lang="">
  <div class="home-page">
    <div class="content">
      <h1>What to eat?</h1>
      <div class="options">
        <input class="search" v-model="search" placeholder="Search..." />
        <view-list
          class="list-icon icon-2x"
          @click="listView = !listView"
          title="Toggle List"
        />
      </div>
      <square-loader :loading="loading" color="black" />
      <div v-if="!listView" class="card-container">
        <card
          v-for="(item, index) in filteredCategories"
          :key="index"
          v-bind:category="item.category"
          v-bind:avgRating="item.avgRating"
          v-bind:items="item.items"
        />
        <add-card v-if="!loading" type="add" v-bind:categories="categories" />
      </div>
      <div v-else-if="listView">
        <div class="heading-container">
          <span class="info">Name</span>
          <span class="rating">Rating</span>
          <span class="info">Category </span>
          <span class="info">Phone</span>
          <span class="info">Location</span>
          <span class="info">Website</span>
        </div>
        <list-item
          v-for="(item, index) in filteredItems"
          :key="index"
          v-bind:item="item"
        />
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
import ViewList from "vue-material-design-icons/ViewList.vue";
import ListItem from "../components/ListItem";
import SquareLoader from "vue-spinner/src/SquareLoader.vue";

export default {
  data() {
    return {
      categories: [],
      search: "",
      categoryKeys: [],
      listView: false,
      allItems: [],
      itemKeys: [],
      loading: true,
    };
  },
  created() {
    const userId = firebase.auth().currentUser.uid;
    const dbRefObject = firebase
      .database()
      .ref("/users/" + userId + "/categories");
    dbRefObject.on("value", (snap) => {
      this.categories = Object.values(snap.val());
      this.loading = false;
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
              this.allItems = snapshot.val();
              this.itemKeys = Object.keys(allItems);

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
                avgRating: arrAvg ? arrAvg : 0,
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
        item.category.toUpperCase().includes(this.search.toUpperCase())
      );
    },
    filteredItems: function() {
      return Object.values(this.allItems).filter(
        (item) =>
          item.category.toUpperCase().includes(this.search.toUpperCase()) ||
          item.name.toUpperCase().includes(this.search.toUpperCase()) ||
          item.location.toUpperCase().includes(this.search.toUpperCase())
      );
    },
  },
  components: {
    Card,
    AddCard,
    ViewList,
    ListItem,
    SquareLoader,
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
}

.options {
  display: flex;
  align-items: center;
}

.search {
  height: 40px;
  width: 50%;
  font-size: 18px;
  margin-bottom: 20px;
  margin-right: 50px;
}

.list-icon {
  margin-bottom: 20px;
}

.material-design-icon.icon-2x {
  height: 2em;
  width: 2em;
}

.material-design-icon.icon-2x:hover {
  color: #c6efad;
}

.material-design-icon.icon-2x > .material-design-icon__svg {
  height: 2em;
  width: 2em;
}

.heading-container {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 5px;
  font-family: "Saira Condensed", sans-serif;
  font-weight: 600;
  font-size: 1.5rem;

  display: flex;
  justify-content: space-evenly;
}

.heading-container span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info {
  flex: 2;
}

.rating {
  flex: 1;
}
</style>
