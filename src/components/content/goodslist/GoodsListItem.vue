<template>
  <div class="goods-item">
<!--    <a :href="goodsItem.link"> </a> 写链接比较少，大部分是配置路由-->
      <img :src="goodsItem.show.img" alt="" @load = "imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <!--      collect收藏-->
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods: {
      imageLoad(){
        this.$bus.$emit('itemImageLoad')
      }
    }
  }
</script>

<style scoped>
  .goods-item{
    position: relative;
    width: 48%;
    padding-bottom: 40px;
  }
  .goods-item img{
    width: 100%;
  }
  .goods-info{
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
    font-size: 12px;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .price{
    color: var(--color-tint);
    margin-right: 20px;
  }
  .collect{
    position: relative;
  }
  .collect:before{
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    top:0;
    left: -15px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    /*第一个数字0表示背景颜色*/
    /*第二个0/14px的含义： 0 是background-position的属性简写。background-position 属性设置背景图像的起始位置。*/
    /*第一个14px 是background-size的属性简写。第一个是左右大小(水平14px)，第二个是上下大小(垂直14px)*/
  }

</style>
