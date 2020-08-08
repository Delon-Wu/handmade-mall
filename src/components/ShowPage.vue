<template>
    <div class="show-page">
        <b-modal
          v-model="affirmOrder"
          title="支付"
          header-bg-variant="dark"
          header-text-variant="light"
          body-bg-variant="light"
          body-text-variant="dark"
          footer-bg-variant="warning"
          footer-text-variant="light"
        >
          <b-container class="d-flex justify-content-between align-items-start">
              <p class="text-danger">合计：{{singlePrice}}元</p>
              <img style="max-width:130px" src="../assets/wechatpay.jpg">
              <img style="max-width:130px" src="../assets/alipay.jpg">
          </b-container>

          <template v-slot:modal-footer>
            <div class="w-100">
              <p class="float-left">
                付款后给掌柜留言，留下邮递的地址联系方式
                <b-form-checkbox
                id="checkbox-1"
                v-model="affirmStatus"
                name="checkbox-1"
                value="accepted"
                unchecked-value="not_accepted"
              >
                已了解购买流程
              </b-form-checkbox>
            </p>
              <b-button
                variant="primary"
                size="sm"
                class="float-right"
                @click="affirmOrder=false"
                :disabled="affirmStatus != 'accepted'"
              >
                确认已支付
              </b-button>
            </div>
          </template>
        </b-modal>
        <ul ref="goodsCase" class="goods-case"  @scroll="refresh">
            <li v-for="(item, index) in goodsList" :key="index">
                <img :src="item.path[0]" />
                <div class="text-container">
                    <h3>{{item.trade_title}}</h3>
                    <p>{{item.good_description}}<i class="text-danger" style="font-size:12px">￥: {{item.price}}</i></p>
                    <b-button-group size="sm" class="d-flex">
                        <b-button variant="light" @click="addProductToCart(item)">加入购物车</b-button>
                        <b-button variant="dark" @click="buyItNow(item)">购买</b-button>
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
import { mapMutations, mapActions } from 'vuex'

export default {
    name: 'ShowCase',
    data() {
        return {
            offset: 0,
            goodsList: [],
            isRefreshing: true,
            endFlag: false,
            affirmOrder: false,
            affirmStatus: '',
            singlePrice: Number
        }
    },
    mounted() {
        let context = this
        if(context.offset == 0){
            this.$axios.get('/get_goods_list?offset='+context.offset).then((response) =>{
                response.data.forEach(element => {
                    element.path = JSON.parse(element.path)
                });
                context.goodsList = [...response.data]
            })
            context.offset = 10
        }
    },
    methods: {
        ...mapMutations('cart', [
            'setBuyStatus'
        ]),
        ...mapActions('cart', [
            'addProductToCart',
            'setCartItems'
        ]),
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
        },
        buyItNow(item) {
            this.affirmOrder = true
            this.singlePrice = item.price
            // this.checkout()
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