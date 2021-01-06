<template lang="">
  <div class="item-container">
    <span class="info">{{ item.name }} </span>
    <span class="rating">{{ item.rating }} </span>
    <span v-if="$mq !== 'mobile'" class="info">{{ item.category }} </span>
    <span v-if="$mq !== 'mobile' && $mq !== 'tablet'" class="info">{{ item.phone }} </span>
    <span v-if="$mq !== 'mobile' && $mq !== 'tablet'" class="info">{{ item.location }}</span>
    <span v-if="$mq !== 'mobile' && $mq !== 'tablet'" class="info"><a :href="item.website" target="__blank">{{ item.website }}</a></span>
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
  min-width: 200px;
  border: 3px solid black;
  padding: 10px;
  margin: 5px;
  font-family: "Saira Condensed", sans-serif;
  font-size: 1.5rem;

  display: flex;
  justify-content: space-evenly;
}

.item-container span {
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
