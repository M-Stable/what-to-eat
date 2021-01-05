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
        <button class="add-button" @click="showModal = true" ><plus class="icon-2x" title="add item" /></button>
      </div>

      <div class="card-container">
        <item-card
          v-for="(key, index) in this.itemKeys"
          :key="index"
          v-bind:item="items[key]"
          v-bind:itemKey="key"
        />
      </div>

      <div v-if="itemKeys.length === 0">
        <span class="message">
          Hmm... Looks like you have no restaurants yet. Add one by clicking the
          + icon above!
        </span>
      </div>
    </div>

    <add-modal
      v-if="showModal"
      @close="showModal = false"
      v-bind:category="category"
      _type="Add"
    />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import AddModal from "../components/AddModal";
import ItemCard from "../components/ItemCard";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";
import Plus from "vue-material-design-icons/Plus.vue";

export default {
  data() {
    return {
      categoryId: "",
      category: this.$route.params.id,
      items: [],
      itemKeys: [],
      showModal: false,
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
    });
  },
  components: {
    AddModal,
    ItemCard,
    ChevronLeft,
    Plus,
  },
};
</script>
<style scoped>
h1 {
  font-size: 48px;
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
}

.add-button {
  width: 2rem;
  height: 2rem;
  margin-left: 10px;
  font-size: 1rem;
  border-radius: 100px;
  background: transparent;
  border: none;
  outline: none;
}

.add-button:hover {
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

.material-design-icon.icon-2x:hover {
  color: #c6efad;
}

.material-design-icon.icon-2x > .material-design-icon__svg {
  height: 2em;
  width: 2em;
}

</style>
