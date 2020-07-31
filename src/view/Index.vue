<template>
    <div class="index" ref="index" v-on:wheel.capture="scroll">
        <Cover ref="cover" />
        <ShowPage ref="showpage" />
        <Footer ref="footer" />
        <BottomBar />
    </div>
</template>
<script>
import Cover from '../components/Cover.vue'
import ShowPage from '../components/ShowPage.vue'
import BottomBar from '../components/BottomBar.vue'
import Footer from '../components/Footer.vue'

const delay = (function () {
  let timer = 0
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()
export default {
    name: 'index',
    components: {
        Cover,
        ShowPage,
        BottomBar,
        Footer
    },
    data() {
        return {
            currentPage: 1
        }
    },
    mounted() {
        this.$nextTick(function(){
            var windowHeight = window.innerHeight
            this.$refs.cover.$el.style.height = windowHeight + 'px'
            this.$refs.showpage.$el.style.height = windowHeight + 'px'
            this.$refs.footer.$el.style.height = windowHeight + 'px'
        })
    },
    methods: {
        scroll: function (e){
            var context = this
            delay(function() {
                let scrollHeight = window.innerHeight
                switch (context.currentPage) {
                    case 1:
                    if(e.deltaY > 0){
                        console.log('下来第二页')
                        context.$refs.index.style.top = (-scrollHeight) + 'px'
                        context.currentPage++
                    }
                    break;
                    case 2:
                        if(e.deltaY > 0){
                        console.log('下来第三页')
                        context.$refs.index.style.top = 2*(-scrollHeight) + 'px'
                        context.currentPage++
                    }else if(e.deltaY < 0){
                        console.log('上去第一页')
                        context.$refs.index.style.top = 0 + 'px'
                        context.currentPage--
                    }
                    break;
                    case 3:
                        if(e.deltaY < 0){
                            console.log('上去第二页')
                            context.$refs.index.style.top = -scrollHeight + 'px'
                            context.currentPage--
                        }
                    break;
                }
            },600)
        }
    }
}
</script>
<style>
  .index{
      width: 100%;
      position: absolute;
      top: 0;
      transition: all .5s ease-in-out;
      -webkit-transition: all .5s ease-in-out;
  }
</style>