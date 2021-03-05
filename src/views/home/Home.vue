<template>
  <div id= "home">
    <!--    ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。
如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例：-->
    <nav-bar class= "home-nav"><div slot= "center">购物街</div></nav-bar>
    <tab-control class= "tab-control" :title= "['流行', '新款', '精选']"
                   @tabClick= "tabClick" v-show= "isTabFixed"
                   ref= "tabControl1"></tab-control>
    <!-- scroll要有固定的高度 ，注意驼峰！！！！-->
    <scroll class="content"
            ref= "scroll"
            :probe-type= "3"
            @scrollPosition= "scrollPosition"
            @pullingUp= "loadMore"
            :pullUpLoad= "true">
      <!-- 子组件给父组件发送数据，接收的父组件不要搞错了 -->
      <!-- <home-swiper :banners= "banners" @swiperImageLoad= "swiperImageLoad"></home-swiper> -->
      <home-swiper :banners= "banners" ></home-swiper>
      <recommend :recommends= "recommends"></recommend>
      <popular></popular>
      <tab-control :title= "['流行', '新款', '精选']" @tabClick= "tabClick" 
                    ref = "tabControl2"></tab-control>
      <goods-list :goods= "showGoodsList"></goods-list>
    </scroll>
    <back-top class= "back-top" @click.native= "backClick" v-show= "showBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goodslist/GoodsList";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/common/backtop/BackTop.vue";

import HomeSwiper from "./childComps/HomeSwiper";
import Recommend from "./childComps/Recommend";
import Popular from "./childComps/Popular";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";


export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

    HomeSwiper,
    Recommend,
    Popular,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      // 置顶默认先不显示,false
      showBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoodsList() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
    mounted() {
    // 事件总线-监听事件触发
    // const refresh = this.debounce(.., 100);debounce函数抽离出去单独文件了，就是不用this.了
    // 防抖debounce,这里调用了debounce函数
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.$bus.$on("itemImageLoad", () => {
      // 每一页图片加载完，重新计算高度
      refresh();
    })
    // tab-control 吸顶效果
    // 所有组件都有一个属性 $el ,用于获取组件中的元素
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop 轮播图加载慢，这里直接计算算出来的不对
    // 监听完轮播图加载完，在获取offsetTop
  },

  methods: {
    //事件监听相关的方法
    //事件监听相关的方法
    tabClick(index) {
      //switch 语句用于基于不同的条件来执行不同的动作。
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 让两个tabControl 的栏目index点击同步，两个组件当前的currentIndex等于点击的index
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // 返回滑动定位
    scrollPosition(position) {
      // 监听backtop什么时候显示
      this.showBackTop = -position.y > 1000; 

      // 监听tabControl 吸顶，position：fixed
       this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    // 滑动过一定的距离，出现置顶
    backClick() {
      // scrollTop() 方法设置或返回被选元素的【垂直滚动条位置】
      this.$refs.scroll.showScrollTo(0, 0, 500);
    },
    loadMore() {
      // 当前的类型this.currentType// 1.先监听图片什么时候加载完
      // 2.图片加载完，重新计算一下高度（图片加载完之后，要滑动区域的高度）
      // ref resh重新, 刷新高度// this.$refs.scroll.scroll.refresh()
      // 这里直接调用请求就可以，注意类型不一样，所以要动态的传入类型
      this.getHomeGoods(this.currentType)
      // this.$refs.scroll.scroll.refresh()
      // 因为监听了图片的加载 item refresh（），这里载scroll.refresh()，就比较卡顿
    },
    // swiperImageLoad(){
    //   this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    //   console.log(this.tabOffsetTop);
    // },

    // 网络请求相关的方法
    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
        // 下次更新DOM时,获取新的tabOffsetTop值(不保险,可以在updated钩子中获取)
        this.$nextTick(() => {
          // 获取的是tabControl2的offsetTop
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
          console.log(this.tabOffsetTop);
        })

      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        console.log(this.goods);
        // 每次触发 pullingUp 钩子后，你应该主动调用 finishPullUp() 告诉
        // scroll 准备好下一次的 pullingUp 钩子。
        // this.$refs.scroll.scroll.finishPullUp(),第一个scroll书scroll组件，第二个scroll是组件保存的数据名字
        this.$refs.scroll.finishPullUp();
      });
    },
  },
  updated(){
    // $nextTick 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
    // 这里获取的是tabControl吸顶需要滚动的距离，之所以在这里获取，是因为这段距离的图片需要加载，
    // 大图加载需要的时间较长，所以在 DOM更新循环结束之后 执行延迟回调，计算距离offsetTop
    // this.$nextTick(() => {
    //       // 获取的是tabControl2的offsetTop
    //       this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    //       console.log(this.tabOffsetTop);
    // })
  },

  beforeDestroy(){
    this.$bus.$off("itemImageLoad")
  }

};
</script>

<style scoped>
#home {
  /*height: 100vh;*/
  /* padding-top: 44px; */
  /* vh -> view height 视口 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

/* 使用原生滚动时，固定在屏幕不随滑动一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  /*移动端一般这个属性都支持，到达这个top距离，变成position：fixed；*/
  /* position: sticky;
  top: 44px; */
  position: relative;
  z-index: 9;
}
/* 方法1 绝对定位*/
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .fixed{
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
} */

/* 方法2 */
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
} */
</style>
