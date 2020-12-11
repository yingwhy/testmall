<template>
  <div class="goods-list">
    <goods-list-item v-for="(item, index) in goods" :goodsItem="item"></goods-list-item>
<!--    {{goods}}-->
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    components:{
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods-list{
    display: flex;
    /*flex-wrap: wrap; 换行，第一行在上面
    flex-wrap:nowrap;不换行*/
    flex-wrap: wrap;
    justify-content:space-evenly;
  }
</style>
