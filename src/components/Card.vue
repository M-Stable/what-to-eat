<template>
  <router-link class="router" :to="'/home/' + this.category">
    <div class="card">
      <h2>{{ this.category }}</h2>
      <span class="info-text">Items: {{ this.items }}</span>
      <span class="info-text">Average Rating: {{ this.avgRating }}</span>
    </div>
  </router-link>
</template>

<script>
export default {
  data() {
    return {
      categoryName: "",
    };
  },
  props: {
    category: String,
    avgRating: Number,
    items: Number,
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
  background: #c6efad;
  min-width: 200px;
  height: 270px;
  margin: 30px;
  padding: 10px;
  font-family: "Saira Condensed", sans-serif;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  border: 3px solid black;
  transition: 0.3s;

  display: flex;
  justify-content: center;
  flex-direction: column;
}

.card:hover {
  transform: translate(10px, 10px);
  transition: 0.3s;
  background: #adefdb;
  box-shadow: none;
}

h2 {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
}

.info-text {
  font-size: 1.5rem;
}
</style>
