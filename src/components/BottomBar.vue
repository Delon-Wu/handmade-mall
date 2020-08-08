<template>
    <div :class="{'bottom-bar': true, descend: bbTag}">
        <b-sidebar
          id="sidebar-backdrop"
          title="购物车"
          :backdrop-variant="variant"
          backdrop
          shadow
        >
          <b-list-group flush>
            <b-list-group-item class="d-flex justify-content-between align-items-center" 
              v-for="(item, index) in cartProducts" 
              :key="index"
            >
                <b-avatar square :src="item.path"></b-avatar>
                <div style="max-width:102px"> 
                  {{item.title}} <i class="text-danger">￥:{{item.price}}</i>
                </div>
              <b-form-spinbutton size="sm" v-model="item.quantity" inline min="0"></b-form-spinbutton>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-around align-items-center">
              <b-button squared variant="outline-dark" @click="setCartItems({items: []})"><b-icon-trash></b-icon-trash></b-button>
              <div class="text-danger">合计：{{cartTotalPrice}}元</div>
            </b-list-group-item>
          </b-list-group>
          <template v-slot:footer>
            <b-button squared block variant="warning" :disabled="!cartTotalPrice" @click="affirmOrder=true">确认下单</b-button>
          </template>
        </b-sidebar>

        <b-sidebar 
          id="sidebar-right" 
          title="聊天窗口"
          :backdrop-variant="variant"
          backdrop
          right
          shadow
        >
          <div class="px-3 py-2">
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
              in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </p>
            <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
          </div>
        </b-sidebar>

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
              <p class="text-danger">合计：{{cartTotalPrice}}元</p>
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
                @click="submitOders"
                :disabled="affirmStatus != 'accepted'"
              >
                确认已支付
              </b-button>
            </div>
          </template>
        </b-modal>

        <div class="flex-header">
          <span id="func-btn" v-show="isLogedIn">
            <b-icon-cart id="cart-btn" :variant="cartTotalPrice? 'danger': ''" v-b-toggle.sidebar-backdrop></b-icon-cart>
            <b-icon-card-checklist v-b-tooltip.hover title="我的订单"></b-icon-card-checklist>
            <b-icon-cloud id="admin-btn" v-if="isManager" v-b-tooltip.hover title="后台管理" @click="goToManage()"></b-icon-cloud>
          </span>
          <h1 :class="{'align-left': bbTag}">月亮与六元の手作屋
              <b-icon-caret-down id="bb-move-btn" :class="{rotate: bbTag}" @click="upOrDown"></b-icon-caret-down>
          </h1>
          <span id="user-bar" v-show="isLogedIn">
            <span class="avatar">{{nickName.charAt(0)}}</span>
            <span>{{nickName}}</span>
            <b-icon-chat-square class="chat-btn" v-show="normalChat" v-b-toggle.sidebar-right></b-icon-chat-square>
            <b-icon-chat-square-dots class="chat-btn" style="color: #c22" v-show="!normalChat" v-b-toggle.sidebar-right></b-icon-chat-square-dots>
          </span>
        </div>
        <h2 v-if="show">输入你的账号信息，或快速注册</h2>
        <b-form id="log-form" @submit="onSubmit" @reset="onReset" v-if="show">
            <div id="log-input-container">
              <b-form-group id="fieldset-1" description="邮箱格式：abc123@example.com"> 
                  <b-input id="input-1" v-model="email" type="email" :class="{danger: eState}" trim placeholder="这里键入你のEmail" max="30"></b-input></b-form-group>
              <b-form-group id="fieldset-2" description="密码格式：8-16个数字，字符，字母（必须包含字母）">
                <b-input id="input-2" v-model="password" :class="{danger: pwState}" type="password" min="8" max="16" trim placeholder="最后键入你の密码"></b-input>
              </b-form-group>
              <b-form-group  id="fieldset-3" description="昵称格式：1-8个字符">
                <b-input id="input-3" v-model="nickName" :class="{danger: nState}" max="8" trim placeholder="再键入你の昵称（登录可忽略哦）"></b-input>
              </b-form-group>
            </div>
            <div id="log-button-container">
              <b-button  type="submit" variant="success" v-bind:class="{ preventClick: eState&&pwState }" :disabled="isValid">提交</b-button>
              <b-button  type="reset" variant="danger">重置</b-button>
            </div>
        </b-form>
        <b-button size="sm" variant="outline-warning" class="mb-2" v-show="!show" @click="logOut">
          <b-icon icon="power" aria-hidden="true"></b-icon> Logout
        </b-button>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'BottomBar',
    computed: {
      eState() {
        var result = this.email.match(/[a-z,A-Z,0-9]+@[a-z,0-9]+\.[a-z]+/g)
        return  result == null ? true : false
      },
      nState() {
        return this.nickName.length >= 1 && this.nickName.length <=8 ? false : true
      },
      pwState() {
        var leters = this.password.match(/[a-z,A-Z]+/g)
        var result = leters != null && this.password.length > leters.length ? true : false
        return result && this.password.length >= 8 && this.password.length <= 16 ? false : true
      },
      isValid() {
        return this.eState || this.pwState ? true : false
      },
      invalidFeedback() {
        if (this.nickName.length > 4) {
          return ''
        } else if (this.nickName.length > 0) {
          return 'Enter at least 4 characters'
        } else {
          return 'Please enter something'
        }
      },
      ...mapState({
        cart: state => state.cart,
      }),
      ...mapGetters('cart', [
        'cartProducts',
        'cartTotalPrice'
      ])
    },
    data() {
      return {
        show: false,
        nickName: '',
        email: '',
        password: '',
        bbTag: false,
        normalChat: true,
        isLogedIn: false,
        isManager: false,
        affirmOrder: false,
        affirmStatus: ''
      }
    },
    mounted() {
      let context = this
      context.$axios.get('/log_in').then((response)=>{
        // console.log(response.data)
        if(response.data instanceof Object){
          context.show = false
          context.isLogedIn = true
          context.nickName = response.data.nickname
          if(response.data.id === 1) context.isManager = true
        }else{
          context.show = true
          context.isLogedIn= false
        }
      }).catch(function(err){
              console.log(err)
        })
    },
    methods: {
      ...mapMutations('cart',[
        'setCartItems'
      ]),
      ...mapActions('cart', [
        'checkout'
      ]),
       makeToast(append = false, logTitle = '叮~', logMessage) {
          this.$bvToast.toast(logMessage, {
            title: logTitle,
            autoHideDelay: 3000,
            appendToast: append
          })
        },
        onSubmit(evt) {
            var context = this
            evt.preventDefault()
            alert(context.nickName)
            context.$axios.post( '/log_up_or_in', {
              email: context.email,
              nickName: context.nickName || context.email,
              password: context.password
            }).then(function(res){
              const logCode = res.data.code
              if(logCode == '0000' || logCode == '0001'){
                context.nickName = res.data.nickName
                context.show = false
                context.isLogedIn = true
                if(res.data.id === 1) context.isManager = true
                let logMessage = logCode == '0000'? '注册成功 :- )': '登录成功 :- )'
                context.makeToast(false, undefined, logMessage)
              }else if(logCode == '0004'){
                context.makeToast(true, 'duang~', '密码错误哦 :-(')
              }
            }).catch(function(err){
              console.log(err)
            })
        },
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.email = ''
            this.nickName = ''
            this.password = ''
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        },
        logOut() {
          let context = this
          context.$axios.get('/log_out').then((response) =>{
            console.log('[logOut Response] -',response)
            if(response.data.code == '0005'){
              context.show = true
              context.isLogedIn = false
              context.makeToast(false, undefined, response.data.message)
            }
          })
        },
        upOrDown() {
          if(!this.bbTag){
            this.bbTag = true
          }else{
            this.bbTag = false
          }
        },
        goToManage() {
          this.$router.push({name: 'Management'})
        },
        submitOders() {
          this.checkout()
          this.affirmOrder = false
        }
    }
}
</script>
<style scoped>
.bottom-bar{
    width: 100%;
    height: 200px;
    position: fixed;
    bottom: 0;
    transition: all .5s ease-in-out;
    -webkit-transition: all .5s ease-in-out;
    background-color: #333;
    text-align: center;
}
.descend{
  bottom: -132px;
}
.flex-header{
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  color: #fdf352;
}
.bottom-bar h1{
    margin: 20px 0;
    font-weight: unset;
    transition: all .5s ease-in-out;
    -webkit-transition: all .5s ease-in-out;
}
.bottom-bar h2{
    color: #ddd;
    font-size: 12px;
    text-align: center;
}
#func-btn{
  min-width: 280px;
  display: flex;
  justify-content: space-evenly;
  color: #b8b8b8;
  font-size: 18px;
}
#exit-btn{
  font-size: 24px;
  color: #b8b8b8;
  cursor: pointer;
}
#func-btn svg:hover,#exit-btn:hover{
  color: #fff;
  cursor: pointer;
}
#user-bar{
  max-width: 350px;
  min-width: 280px;
  display: inline-flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: lighter;
  align-items: center;
  top: 14px;
}
#user-bar .avatar{
  width:38px;
  height: 38px;
  border-radius: 19px;
  background-color: #555;
  color: #fff;
  line-height: 35px;
}
.chat-btn{
  color: #fff;
  cursor: pointer;
}
.align-left{
  font-size: 24px;
}
#log-button-container{
  width: 20%;
  height: inherit;
  white-space: nowrap;
}
.btn-danger{
  margin-left: 12px;
}
#log-form{
    display: flex;
    width: 65%;
    margin: auto;
    justify-items: center;
    justify-content: space-between;
}
#log-input-container{
    width: 85%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
#log-input-container>fieldset{
    width: 210px;
}
.btn-primary:hover{
    background-color: #16c8bf;
}
.form-control:focus{
  border-color: #fe0;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(255, 242, 58, 0.8);
}
.form-control:focus.danger{
    border-color: #fb3434;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(251, 52, 52, 0.8);
}
.preventClick{
  cursor: not-allowed;
}
#bb-move-btn{
  color: #ddd;
  transition: all .5s ease-in-out;
  cursor: pointer;
}
.rotate{
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}
</style>