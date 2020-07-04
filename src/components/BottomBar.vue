<template>
    <div :class="{'bottom-bar': true, descend: bbTag}">
        <h1 :class="{'align-left': bbTag}">月亮与六元の手作屋
            <b-icon-caret-down id="bb-move-btn" :class="{rotate: bbTag}" @click="upOrDown"></b-icon-caret-down>
        </h1>
        <h2>输入你的账号信息，或快速注册</h2>
          <b-form id="log-form" @submit="onSubmit" @reset="onReset" v-if="show">
              <div id="log-input-container">
                <b-input id="input-1" v-model="email" type="email" :class="{danger: eState}" trim placeholder="这里键入你のEmail"></b-input>
                <b-input id="input-2" v-model="nickName" :class="{danger: nState}" max="8" trim placeholder="再键入你の昵称（登录可忽略哦）"></b-input>
                <b-input id="input-3" v-model="password" :class="{danger: pwState}" type="password" min="8" max="16" trim placeholder="最后键入你の密码"></b-input>
              </div>
              <div>
                <b-button  type="submit" variant="success" v-bind:class="{ preventClick: eState&&pwState }" :disabled="isValid">提交</b-button>
                <b-button  type="reset" variant="danger">重置</b-button>
              </div>
          </b-form>
    </div>
</template>
<script>
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
      }
    },
    data() {
      return {
        show: true,
        nickName: '',
        email: '',
        password: '',
        bbTag: false
      }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            alert(this.nickName)
            this.$axios.post( '/log_up_or_in', {
              email: this.email,
              nickName: this.nickName,
              password: this.password
            }).then(function(res){
              console.log(res)
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
        upOrDown() {
          if(!this.bbTag){
            this.bbTag = true
          }else{
            this.bbTag = false
          }
        }
    }
}
</script>
<style scoped>
.bottom-bar{
    width: 100%;
    height: 180px;
    position: fixed;
    bottom: 0;
    transition: all .5s ease-in-out;
    -webkit-transition: all .5s ease-in-out;
    background-color: #333;
}
.descend{
  bottom: -115px;
}
.bottom-bar h1{
    color: #fe0;
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
.align-left{
  font-size: 24px;
}
.btn-success{
  margin-right: 12px;
}
#log-form{
    display: flex;
    width: 65%;
    margin: auto;
    justify-items: center;
    align-items: center;
    justify-content: space-around;
}
#log-input-container{
    width: 85%;
    display: flex;
    justify-content: space-around;
}
#log-form input{
    width: 30%;
}
.btn-container{
    height: 100%;
}
/* .btn-primary{
    background-color: #10a59e;
    color: #fff;
    padding: 5px 15px;
} */
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