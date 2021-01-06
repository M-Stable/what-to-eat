<template lang="">
  <div class="home-page">
    <div class="content">
      <h1>What to eat?</h1>
      <div class="options">
        <input class="search" v-model="search" placeholder="Search..." />
        <div class="button-group">
          <view-list
            class="list-icon icon-2x"
            @click="listView = !listView"
            title="Toggle List"
          />

          <label class="sort">Sort By:</label>
          <button
            @click="nameSort = true"
            v-bind:class="{ 'active-button': nameSort }"
          >
            Name
          </button>
          <button
            @click="nameSort = false"
            v-bind:class="{ 'active-button': !nameSort }"
          >
            Rating
          </button>
        </div>
      </div>
      <square-loader :loading="loading" color="black" />
      <div v-if="!listView" class="card-container">
        <card
          v-for="(item, index) in filteredCategories"
          :key="index"
          v-bind:category="item.category"
          v-bind:avgRating="item.avgRating"
          v-bind:items="item.items"
          v-bind:color="colors[index % 8]"
        />
        <add-card v-if="!loading" type="add" v-bind:categories="categories" />
      </div>
      <div v-else-if="listView">
        <div class="heading-container">
          <span class="info">Name</span>
          <span class="rating">Rating</span>
          <span v-if="$mq !== 'mobile'" class="info">Category </span>
          <span v-if="$mq !== 'mobile' && $mq !== 'tablet'" class="info"
            >Phone</span
          >
          <span v-if="$mq !== 'mobile' && $mq !== 'tablet'" class="info"
            >Location</span
          >
          <span v-if="$mq !== 'mobile' && $mq !== 'tablet'" class="info"
            >Website</span
          >
        </div>
        <list-item
          v-for="(item, index) in filteredItems"
          :key="index"
          v-bind:item="item"
        />
      </div>
    </div>

    <div class="user-info">
      <span class="user-name">{{ username }}</span>
      <button class="sign-out" @click="signOut">Sign out</button>
    </div>
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
import { COLORS } from "../helpers/colors.js";

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
      nameSort: true,
      colors: COLORS,
      username: "",
    };
  },
  created() {
    const userId = firebase.auth().currentUser.uid;
    this.username = firebase.auth().currentUser.displayName;
    const dbRefObject = firebase
      .database()
      .ref("/users/" + userId + "/categories");
    dbRefObject.on("value", (snap) => {
      if (snap.val()) this.categories = Object.values(snap.val());
      this.loading = false;
    });

    // Read Categories to grab category id
    firebase
      .database()
      .ref("/users/" + userId + "/categories")
      .once("value")
      .then((snap) => {
        if (!snap.val()) return;
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
      const filtered = this.categories.filter((item) =>
        item.category.toUpperCase().includes(this.search.toUpperCase())
      );

      return this.nameSort
        ? filtered.sort((a, b) => (a.category > b.category ? 1 : -1))
        : filtered.sort((a, b) =>
            a.avgRating < b.avgRating
              ? 1
              : a.avgRating === b.avgRating
              ? a.category > b.category
                ? 1
                : -1
              : -1
          );
    },
    filteredItems: function() {
      const filtered = Object.values(this.allItems).filter(
        (item) =>
          item.category.toUpperCase().includes(this.search.toUpperCase()) ||
          item.name.toUpperCase().includes(this.search.toUpperCase()) ||
          item.location.toUpperCase().includes(this.search.toUpperCase())
      );

      return this.nameSort
        ? filtered.sort((a, b) => (a.name > b.name ? 1 : -1))
        : filtered.sort((a, b) =>
            a.rating < b.rating
              ? 1
              : a.rating === b.rating
              ? a.name > b.name
                ? 1
                : -1
              : -1
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

.content {
  width: calc(80vw - 80px);
  min-height: calc(100vh - 80px);
  padding: 40px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

h1 {
  font-size: 48px;
}

.options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  min-width: 200px;
}

.search {
  height: 40px;
  min-width: 200px;
  width: 50%;
  font-size: 18px;
  margin-bottom: 20px;
}

.button-group {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 220px;
}

.sort {
  font-family: "Saira Condensed", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  margin-right: 10px;
}

.active-button {
  background: black;
  color: white;
}

.button-group button {
  border: none;
  font-size: 1rem;
  outline: none;
}

.button-group button:hover {
  cursor: pointer;
}

.list-icon {
  margin-right: 20px;
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
  min-width: 200px;
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

.user-info {
  position: absolute;
  top: 10px;
  right: 10px;
}

.user-name {
  font-family: "Saira Condensed", sans-serif;
}

.sign-out {
  border: 1px solid black;
  background: transparent;
  transition: 0.2s;
  margin-left: 10px;
}

.sign-out:hover {
  cursor: pointer;
  background: red;
  color: white;
  border-color: red;
  transition: 0.2s;
}
</style>
