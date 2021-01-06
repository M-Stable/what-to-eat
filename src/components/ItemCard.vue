<template lang="">
  <div class="item-card">
    <pencil class="edit-icon" @click="showModal = true" />
    <h1 class="overflow">{{ item.name }}</h1>

    <div class="rating-container">
      <div
        v-for="(rating, index) in 5"
        :key="index"
        class="rating-div"
        v-bind:class="{ filled: index + 1 <= item.rating }"
      />
    </div>
    <div class="info">
      <span class="icon">
        <map-marker />
      </span>
      <h3 class="overflow">{{ item.location }}</h3>
    </div>
    <div class="info">
      <span class="icon">
        <phone-icon />
      </span>
      <h3>{{ item.phone }}</h3>
    </div>
    <div class="info">
      <span class="icon"> <open-in-new /> </span>
      <a
        v-if="item.website !== 'Unknown'"
        class="overflow"
        :href="item.website"
        target="__blank"
      >
        <h3 class="overflow">{{ item.website }}</h3>
      </a>
      <h3 v-else class="overflow">{{ item.website }}</h3>
    </div>
    <add-modal
      v-if="showModal"
      @close="showModal = false"
      v-bind:item="item"
      v-bind:_key="item.id"
      v-bind:category="item.category"
      type="Edit"
    />
  </div>
</template>
<script>
import PhoneIcon from "vue-material-design-icons/Phone.vue";
import MapMarker from "vue-material-design-icons/MapMarker.vue";
import OpenInNew from "vue-material-design-icons/OpenInNew.vue";
import Pencil from "vue-material-design-icons/Pencil.vue";
import AddModal from "../components/AddModal";

export default {
  props: {
    item: Object,
    itemKey: String,
  },
  components: {
    PhoneIcon,
    MapMarker,
    OpenInNew,
    Pencil,
    AddModal,
  },
  data() {
    return {
      showModal: false,
    };
  },
};
</script>
<style scoped>
.item-card {
  border: 3px solid black;
  width: 270px;
  min-width: 200px;
  padding: 10px;
  font-family: "Saira Condensed", sans-serif;
  margin-right: 30px;
  margin-bottom: 30px;
  position: relative;
}

.item-card:hover .rating-div {
  transform: rotate(225deg);
  transition: 0.8s ease-in-out;
}

.item-card:hover .filled {
  background: rgb(250, 192, 2);
  transition: 0.8s ease-in-out;
}

.item-card:hover .edit-icon {
  opacity: 1;
  transition: 0.5s;
}

.edit-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  opacity: 0;
}

.edit-icon:hover {
  cursor: pointer;
}

.rating-container {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.rating-div {
  height: 20px;
  width: 20px;
  border: 3px solid black;
  transform: rotate(45deg);
  transition: 0.8s;
  margin: 0 10px;
}

.filled {
  background: black;
}

h3 {
  margin: 0 10px;
}

.info {
  display: flex;
  align-items: center;
  margin: 2rem 0;
}

.icon {
  padding: 0;
  margin-bottom: -5px;
}

.overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
