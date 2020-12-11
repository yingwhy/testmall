<template>
  <div class="tab-bar-item" @click="itemClick()">
<!--    if else 判断当前活跃-->
    <div v-if="!isActive"><slot name="text-icon"></slot></div>
<!--    isActive = true ; !isActive = false,则v-if="false",执行else-->
    <div v-else><slot name="text-icon-active"></slot></div>

    <div :style="activeStyle"><slot name="text-text"></slot></div>
  </div>

</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path: String,
      activeColor:{
        type: String,
        default: 'red'
      }

    },
    data(){
      return{
        //isActive不能写死
        // isActive: true
      }
    },
    methods:{
      itemClick(){
        // this.$router.push(this.path).catch(err => {})
        this.$router.replace(this.path).catch(err => {})
      }
    },
    computed:{
      isActive(){
        // indexof()如果要检索的字符串值没有出现，则该方法返回 -1。
        //当前$route.path 是不是 this.path
        //==-1，没有找到，不等于-1，就是找到了,
        //找到了，那么isActive=true

        ///home->item1(/home) =true
        ///home->item1(/cart) =false
        ///home->item1(/category) =false
        ///home->item1(/profile) =false
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        //this.isActive是否活跃，活跃颜色：this.activeColor，没p有this.activeColor，就用默认颜色{}，默认颜色red
        return this.isActive ? { color: this.activeColor}:{}
      }

    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
  }
  .tab-bar-item img{
    height: 24px;
    width: 24px;
    vertical-align: middle;
    margin-bottom: 2px;
    margin-top:3px;
  }
  /*.active{*/
  /*  color: red;*/
  /*}*/
</style>
