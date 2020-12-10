<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from "./src/components/content/MainTabBar";
  export default {
    name: "App",
    components: {
      MainTabBar
    }
  }
</script>

<style scoped>
  @import "src/assets/css/base.css";

</style>
