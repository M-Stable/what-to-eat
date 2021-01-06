<template lang="">
  <div class="category-page">
    <router-link to="/home">
      <button class="back-button">
        <chevron-left class="left-icon" :size="30" /> Back
      </button>
    </router-link>

    <div class="content">
      <div class="header-container">
        <h1>{{ category }}</h1>

        <div class="control-group">
          <button class="icon-button" @click="showModal = true">
            <plus class="icon-2x icon-add" title="Add Item" />
          </button>
          <button class="icon-button" @click="showWarning = true">
            <delete class="icon-2x icon-delete" title="Delete Category" />
          </button>
        </div>

        <div class="button-group">
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

      <div class="card-container">
        <item-card
          v-for="(item, index) in this.sortedItems"
          :key="index"
          v-bind:item="item"
        />
      </div>

      <div v-if="itemKeys.length === 0 && !loading">
        <span class="message">
          Hmm... Looks like you have no restaurants yet. Add one by clicking the
          + icon above!
        </span>
      </div>
    </div>

    <warning-modal
      v-if="showWarning"
      @close="showWarning = false"
      v-bind:category="category"
      v-bind:itemKeys="itemKeys"
      v-bind:categoryId="categoryId"
    />

    <add-modal
      v-if="showModal"
      @close="showModal = false"
      v-bind:category="category"
      type="Add"
    />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import AddModal from "../components/AddModal";
import WarningModal from "../components/WarningModal";
import ItemCard from "../components/ItemCard";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";
import Plus from "vue-material-design-icons/Plus.vue";
import Delete from "vue-material-design-icons/Delete.vue";
import SquareLoader from "vue-spinner/src/SquareLoader.vue";

export default {
  data() {
    return {
      categoryId: "",
      category: this.$route.params.id,
      items: [],
      itemKeys: [],
      showModal: false,
      showWarning: false,
      loading: true,
      nameSort: true,
    };
  },
  created() {
    const userId = firebase.auth().currentUser.uid;
    const dbRefObject = firebase.database().ref("/users/" + userId + "/items");

    // Listen for added Items
    dbRefObject.on("value", (snap) => {
      const result = Object.keys(snap.val()).map((key) => {
        if (snap.val()[key].category === this.category) return key;
      });

      this.itemKeys = result.filter((key) => key !== undefined);
      this.items = snap.val();

      this.loading = false;
    });

    firebase
      .database()
      .ref("/users/" + userId + "/categories")
      .once("value")
      .then((snapshot) => {
        this.categoryId = Object.keys(snapshot.val()).filter((key) => {
          if (snapshot.val()[key].category === this.category) return key;
        })[0];
      });
  },
  computed: {
    sortedItems: function() {
      const itemsWithId = this.itemKeys.map((itemKey) => {
        return { ...this.items[itemKey], id: itemKey };
      });
      const itemValues = Object.values(itemsWithId);

      return this.nameSort
        ? itemValues.sort((a, b) => (a.name > b.name ? 1 : -1))
        : itemValues.sort((a, b) =>
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
    AddModal,
    ItemCard,
    ChevronLeft,
    Plus,
    SquareLoader,
    Delete,
    WarningModal,
  },
};
</script>
<style scoped>
h1 {
  font-size: 48px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category-page {
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

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 30px;
}

.icon-button {
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  border-radius: 100px;
  background: transparent;
  border: none;
  outline: none;
  margin-right: 10px;
}

.icon-button:hover {
  cursor: pointer;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
}

.message {
  font-size: 2rem;
  font-family: "Saira Condensed", sans-serif;
}

.left-icon {
  height: 30px;
  width: 30px;
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

.material-design-icon.icon-2x {
  height: 3em;
  width: 3em;
}

.material-design-icon.icon-add:hover {
  color: #c6efad;
}

.material-design-icon.icon-delete:hover {
  color: red;
}

.material-design-icon.icon-2x > .material-design-icon__svg {
  height: 2em;
  width: 2em;
}

.button-group {
  display: flex;
  margin: 30px 0;
}

.control-group {
  display: flex;
  margin-left: -10px;
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
</style>
