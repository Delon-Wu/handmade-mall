<template>
    <div class= "cover">
        <div class= "top border"></div>
        <h1>欢迎光临</h1>
        <h2>月亮与六元<span class="small-font ">の手作屋</span></h2>
        <div class= "bottom border"></div>
        <b-icon-chevron-double-down style="color: #d5d5d5; width: 32px; height: 32px "></b-icon-chevron-double-down>
    </div>
</template>
<script>

export default {
    name: 'Cover'
}
</script>

<style scoped>
  .cover{
    border: transparent solid 1px;
  }
  .border{
      margin: auto;
  }
  .top{
      height: 8px;
      width: 42px;
      margin-bottom: 80px;
      margin-top: 80px;
      background-color: #ffee00;
  }
  .bottom{
      height: 8px;
      width: 32px;
      margin-top: 80px;
      background-color: #ffee00;
  }
    h1,h2{
        font-weight: lighter;
        color: #fff;
        text-align: center;
        letter-spacing: 6px
    }
    h1{
        font-size: 52px
    }
    h2{
        font-size: 32px
    }
    .small-font{
        font-size: 20px;
        margin-left: 20px;
    }
    .bi-chevron-double-down{
        margin-top: 45px;
        animation: turndown 3s;
        -webkit-animation: turndown 3s;
        animation-iteration-count: infinite;
        -webkit-animation-iteration-count: infinite;
        animation-timing-function: linear;
        -webkit-animation-timing-function: linear;
    }
    @keyframes turndown{
        0% {transform: translateY(12px)}
        50% {transform: translateY(-12px)}
        100% {transform: translateY(12px)}
    }
    @-webkit-keyframes turndown{
        0% {transform: translateY(12px)}
        50% {transform: translateY(-12px)}
        100% {transform: translateY(12px)}
    }
</style>