<template>
    <div class="show-page">
        <ul class="goods-case">
            <li v-for="item in 5" :key="item">
                <img src="../assets/placeholderimg.png" />
                <h3>漂亮的手机壳</h3>
                <p>卡哇伊的造型，外镶亮晶晶的钻石，各种少女，仙女风格</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'ShowCase'
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
  }
  .goods-case li{
      display: inline-block;
      width: 220px;
      background-color: #fff;
      font-weight: 500;
      text-align: left;
      border-radius: 3px;
      border: rgba(216, 204, 43, 0.125) solid 1px;
      margin: 12px;
  }
  .goods-case li img{
      width: 100%;
      height: 220px;
  }
  .goods-case li h3,.goods-case li p{
      margin: 12px 12px;
      color:#505559;
  }
</style>