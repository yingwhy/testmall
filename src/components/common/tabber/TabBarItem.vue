<template>
  <div class="tab-bar-item" @click="itemClick()">
    <div v-if="!isActive"><slot name="text-icon"></slot></div>
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
        this.$router.replace(this.path).catch(err => {})
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path)!==-1
      },
      activeStyle(){
        return this.isActive?{ color: this.activeColor}:{}
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