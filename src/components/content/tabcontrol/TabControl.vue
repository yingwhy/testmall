<template>
  <div class="control">
    <div v-for="(item, index) in title" class="controlItem"
         :class="{active: index == currentIndex}" @click="itemClick(index)" :key="index">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data(){
      return{
        currentIndex: 0,
      }
    },
    props: {
      title: {
        type:Array,
        default(){
          return []
        }
      }
    },
    methods: {
      itemClick(index){
        this.currentIndex = index;
        // 发送自定义事件，这里tabClick是自定义事件的名字，index是自定义事件的参数
        this.$emit('tabClick', index)
      },
    },
  }
</script>

<style scoped>
  .control{
    width: 100%;
    display: flex;
    text-align: center;
    font-size: 18px;
    height: 44px;
    line-height: 44px;
    background-color: #ffffff;
  }
  .controlItem{
    flex: 1;
  }
  .controlItem span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }

</style>
