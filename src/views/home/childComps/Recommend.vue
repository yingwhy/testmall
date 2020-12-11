<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Recommend",
    props:{
      recommends: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    width: 100%;
    display: flex;
    justify-content: space-around;
    text-align: center;
    font-size: 14px;
    padding: 10px 0 20px;
    border-bottom: 8px #e7e7e7 solid;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item img{
    width: 90%;
    margin-bottom: 10px;
  }
</style>
