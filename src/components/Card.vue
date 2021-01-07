<template>
  <div class="router">
    <router-link class="router" :to="'/home/' + category">
      <div class="card" v-bind:style="{ background: color }">
        <router-link to="/home">
          <button class="icon-button" @click="showWarning = true">
            <delete class="icon-2x icon-delete" title="Delete Category" />
          </button>
        </router-link>
        <div class="title">
          <h2 class="overflow">{{ category }}</h2>
        </div>

        <span class="info-text">Items: {{ items }}</span>
        <span class="info-text">Average Rating: {{ avgRating }}</span>
      </div>
    </router-link>

    <warning-modal
      v-if="showWarning"
      @close="showWarning = false"
      v-bind:category="category"
      v-bind:categoryId="categoryId"
    />
  </div>
</template>

<script>
import Delete from "vue-material-design-icons/Delete.vue";
import WarningModal from "../components/WarningModal";

export default {
  components: {
    Delete,
    WarningModal,
  },
  props: {
    category: String,
    avgRating: Number,
    items: Number,
    color: String,
    categoryId: String,
  },
  data() {
    return {
      showWarning: false,
    };
  },
};
</script>

<style scoped>
.router,
.router:focus,
.router:visited {
  text-decoration: none;
  color: black;
  flex-basis: 25%;
}

.card {
  min-width: 200px;
  flex: 1;
  height: 270px;
  margin-bottom: 50px;
  margin-right: 50px;
  padding: 10px;
  font-family: "Saira Condensed", sans-serif;
  border: 3px solid black;
  transition: 0.3s;
  box-shadow: none;

  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
}

.card:hover {
  transform: translate(-10px, -10px);
  transition: 0.3s;
  background: #adefdb;

  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}

.card:hover .icon-button {
  opacity: 1;
}

.title {
  width: 200px;
}

h2 {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
}

.info-text {
  font-size: 1.5rem;
}

.icon-button {
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0;

  font-size: 1rem;
  border-radius: 100px;
  background: transparent;
  border: none;
  outline: none;
}

.icon-button:hover {
  cursor: pointer;
}

.material-design-icon.icon-delete:hover {
  color: red;
}

.overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
