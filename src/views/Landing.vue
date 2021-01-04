<template lang="">
  <div class="landing">
    <video class="bgVideo" autoplay muted loop>
      <source src="../media/foodvideo.mp4" type="video/mp4" />
    </video>
    <div class="content">
      <h1>Stuck on what to eat?</h1>
      <h1><span class="header2">Let me help.</span></h1>
      <router-link to="/home"><button>Log In</button></router-link>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
};
</script>
<style scoped>
.landing {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bgVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;

  filter: brightness(50%);
}

.content {
  min-height: 100vh;
  min-width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  padding: 0 30px;
}

button {
  border: 5px solid white;
  background: rgba(255, 255, 255, 0.5);
  width: 300px;
  height: 90px;
  font-size: 36px;
  margin-top: 50px;

  display: inline-block;
  vertical-align: middle;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  background: rgba(255, 255, 255, 0.5);
  color: black;
  text-decoration: none;
  outline: none;
}

button:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  -webkit-transform: scaleY(0);
  transform: scaleY(0);
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
button:hover,
button:focus,
button:active {
  color: black;
  cursor: pointer;
}
button:hover:before,
button:focus:before,
button:active:before {
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
}

h1 {
  font-size: 64px;
  margin: 0;
}

.header2 {
  color: #a6f599;
}
</style>
