<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="deeppink">
      <img slot="text-icon" src="~assets/img/tabbar/home.svg" />
      <img slot="text-icon-active" src="~assets/img/tabbar/home_active.svg" />
      <div slot="text-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="deeppink">
      <img slot="text-icon" src="~assets/img/tabbar/category.svg" />
      <img slot="text-icon-active" src="~assets/img/tabbar/category_active.svg" />
      <div slot="text-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="deeppink">
      <img slot="text-icon" src="~assets/img/tabbar/cart.svg" />
      <img slot="text-icon-active" src="~assets/img/tabbar/cart_active.svg" />
      <div slot="text-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="deeppink">
      <img slot="text-icon" src="~assets/img/tabbar/profile.svg" />
      <img slot="text-icon-active" src="~assets/img/tabbar/profile_active.svg" />
      <div slot="text-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabber/TabBar';
  import TabBarItem from 'components/common/tabber/TabBarItem';

  export default {
    name: "MainTabBar",
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
