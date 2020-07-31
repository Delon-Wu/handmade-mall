<template>
    <div class="show-page">
        <ul ref="goodsCase" class="goods-case"  @scroll="refresh">
            <li v-for="(item, index) in goodsList" :key="index">
                <img :src="item.path[0]" />
                <div class="text-container">
                    <h3>{{item.trade_title}}</h3>
                    <p>{{item.good_description}}</p>
                    <b-button-group size="sm" class="d-flex">
                        <b-button variant="light">加入购物车</b-button>
                        <b-button variant="dark">购买</b-button>
                    </b-button-group>
                </div>
            </li>
            <li id="loading-li">
                <b-spinner v-if="isRefreshing" label="Loading..." variant="light"></b-spinner>
                <span v-else>---咱是有底线的 喵~---</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'ShowCase',
    data() {
        return {
            offset: 0,
            goodsList: [],
            isRefreshing: true,
            endFlag: false
        }
    },
    mounted() {
        // let newLiElement = document.createElement('li')
        // newLiElement.innerHTML = `<img src="../assets/placeholderimg.png" />
        //     <h3>漂亮的手机壳</h3>
        //     <p>卡哇伊的造型，外镶亮晶晶的钻石，各种少女风格</p>`
        // console.log(newLiElement)
        // console.log(this.$el)
        // this.$refs.goodsCase.appendChild(newLiElement)
        // console.log(this.$refs.goodsCase)
        let context = this
        if(context.offset == 0){
            this.$axios.get('/get_goods_list?offset='+context.offset).then((response) =>{
                response.data.forEach(element => {
                    element.path = JSON.parse(element.path)
                });
                let responseData = response.data
                console.log(responseData)
                context.goodsList = responseData
            })
            context.offset = 10
        }
    },
    methods: {
        refresh(e){
            if(e.target.scrollLeft == e.target.scrollLeftMax){
                let context = this
                if(!context.endFlag){
                    this.$axios.get('/get_goods_list?offset='+context.offset).then((response) =>{
                        if(response.data.length < 10){
                            context.endFlag = true
                            this.isRefreshing = false
                            response.data.forEach(element => {
                                element.path = JSON.parse(element.path)
                            });
                            let responseData = response.data
                            console.log('------滚动触发请求回响------',responseData)
                            // 刷新一下vue实例的数据
                            let freshData = context.goodsList.concat(responseData)
                            context.goodsList = freshData
                        }else{
                            response.data.forEach(element => {
                                element.path = JSON.parse(element.path)
                            });
                            let responseData = response.data
                            console.log('------滚动触发请求回响------',responseData)
                            // 刷新一下vue实例的数据
                            let freshData = context.goodsList.concat(responseData)
                            context.goodsList = freshData
                        }
                    })
                }
                return
            }
        }
    }
}
</script>
<style scoped>
  .show-page{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
  }
  .goods-case{
      list-style: none;
      padding-left: 0;
      overflow-x: auto;
      white-space: nowrap;
      position: relative;
      width: 95%;
  }
  .goods-case li{
      display: inline-block;
      width: 220px;
      background-color: #fff;
      font-weight: 500;
      text-align: left;
      border-radius: 5px;
      margin: 12px;
  }
  #loading-li{
    position: absolute;
    background-color: transparent;
    color: #737373;
    text-align: center;
    top: 50%;
    transform: translateY(50%);
  }
  .goods-case li img{
      width: 100%;
      height: 220px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
  }
  .goods-case li p{
      white-space: break-spaces;
      height: 64px;
  }
  .text-container{
      margin: 12px 12px;
      color:#505559;
  }
</style>