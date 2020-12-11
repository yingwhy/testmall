<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
<!--    ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。
如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例：-->
    <home-swiper :banners="banners" ></home-swiper>
    <recommend :recommends="recommends"></recommend>
    <popular></popular>
    <tab-control class="tab-control" :title="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
    <goods-list :goods = "showGoodsList"></goods-list>


  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/TabControl";
  import GoodsList from "components/content/goodslist/GoodsList";

  import HomeSwiper from "./childComps/HomeSwiper";
  import Recommend from "./childComps/Recommend";
  import Popular from "./childComps/Popular";

  import {getHomeMultidata, getHomeGoods} from "network/home";



  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,

      HomeSwiper,
      Recommend,
      Popular
    },
    data(){
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
      }
    },
    computed: {
      showGoodsList(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },

    methods: {
      //事件监听相关的方法
      //事件监听相关的方法
      tabClick(index){
        //switch 语句用于基于不同的条件来执行不同的动作。
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
      },


      // 网络请求相关的方法
      // 网络请求相关的方法
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // console.log(res)
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page +1
        getHomeGoods(type, page).then(res => {
          console.log(res);
          // this.goods[type].list.push(...res.data.list)
          // this.goods[type].page += 1
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /*height: 100vh;*/
    padding-top: 44px;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    /*移动端一般这个属性都支持，到达这个top距离，变成position：fixed；*/
    position: sticky;
    top:44px;
    z-index: 9;
  }
</style>
