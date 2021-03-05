<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide class="swiper-slide" v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <!-- <img :src="item.image" alt="" @load= "imageLoad"> -->
          <img :src="item.image" alt="">
        </a>
      </swiper-slide>
      <!-- 分页器 -->
      <div class="swiper-pagination"  slot="pagination"></div>
<!--      <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--      <div class="swiper-button-next" slot="button-next"></div>-->
    </swiper>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from "vue-awesome-swiper";
  import "swiper/dist/css/swiper.css";

  export default {
    name: "HomeSwiper",
    props: {
      banners:{
        type: Array,
        default() {
          return [];
        }
      }
    },
    data(){
      return {
        swiperOption:{
          //显示分页
          pagination: {
            el: '.swiper-pagination'

          },
          //设置点击箭头
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          //自动轮播
          autoplay: {
            delay: 2000,
            //当用户滑动图片后继续自动轮播
            disableOnInteraction: false,
          },
          //开启循环模式
          loop: true,
          isLoad: false
        }
      }
    },
    components: {
      swiper,
      swiperSlide,
    },
    methods: {
      // 容易犯错！！！！ 单词字母顺序，单词大小写，this!!!,这三个
      // imageLoad(){
      //     if( !this.isLoad ){
      //       this.$emit('swiperImageLoad')
      //       this.isLoad = true
      //     }
      // }
    }
  }

</script>

<style scoped>
  .swiper-slide {
    width: 100%;
    background-color:#ffffff;
    font-size: 12px;
    text-align: center;
  }
  .swiper-slide img{
    width: 100%;
  }
</style>
