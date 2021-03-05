<template>
  <div class="wrapper" ref="wrapper">
      <!-- wrapper包裹 -->
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

// 通过静态方法 BScroll.use() 注册插件
BScroll.use(Pullup)

export default {
    name: "Scroll",
    data(){
        return{
            // 函数运行完数据就销毁了，定义一个变量去接受函数的数据
            scroll: null,
        }
    },
    props: {
        // 复用可能probeType设置的值不一样，谁用谁再设置，默认0
        // 动态获取外边的probeType、pullUpLoad
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    mounted(){
        // ref如果是绑定在普通的元素中,那么通过this.$refs.refname获取到的是-个元素对象。
        // ( 就跟document.querySelector(‘ .classname ‘ )一样 ，通过query去拿，
        // 可能会有很多一样的css选择器 名字，容易拿错)
        // 默认情况下BScroll是不可以实时的监听滚动位置，必须在下边传参数， click: true,等
        this.scroll = new BScroll(this.$refs.wrapper,{
            // probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画
            // 运行过程中实时派发 scroll 事件// probeType: 3,动态获取外边的probeType、pullUpLoad
            probeType: this.probeType, 
            click: true,
            scrollY: true,
            pullUpLoad: this.pullUpLoad
        })

        // 使用 on() 方法添加的事件处理程序适用于当前及未来的元素（比如由脚本创建的新元素）
        // on('scroll',{}), on( '监听的类型', function ) 这里的scroll是监听的类型，滑动类型scroll
        // 监听滑动到的位置
        this.scroll.on('scroll',(position) => {
            this.$emit('scrollPosition', position)
            // console.log(position);
        })
        // 上滑加载更多
       if(this.pullUpLoad){
            this.scroll.on('pullingUp',() => {
            this.$emit('pullingUp')
        })
       }

    },
    methods: {
        // 抽离
        // scrollTo() 方法可把内容滚动到指定的坐标。!!!!!!!!! scrollTo(),不是top
        showScrollTo(x, y, time = "300"){
            this.scroll && this.scroll.scrollTo(x, y, 300)
        },
        refresh(){
            // 确保scroll的数据拿到 刷新加载的高度
            this.scroll && this.scroll.refresh()
        },
        finishPullUp(){
            this.scroll && this.scroll.finishPullUp()
        }
    }

}
</script>

<style>

</style>