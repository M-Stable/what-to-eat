<template lang="">
  <div class="item-container">
    <span class="info">{{ item.name }} </span>
    <span class="rating">{{ item.rating }} </span>
    <span class="info">{{ item.category }} </span>
    <span class="info">{{ item.phone }} </span>
    <span class="info">{{ item.location }}</span>
    <span class="info">{{ item.website }}</span>
  </div>
</template>
<script>
export default {
  props: {
    item: Object,
  },
};
</script>
<style scoped>
.item-container {
  width: calc(100% - 20px);
  border: 3px solid black;
  padding: 10px;
  margin: 5px;
  font-family: "Saira Condensed", sans-serif;
  font-size: 1.5rem;

  display: flex;
  justify-content: space-evenly;
}

.info {
    flex: 2;
}

.rating {
    flex: 1;
}
</style>
