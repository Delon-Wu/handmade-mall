<template>
    <div class="footer">
        <article id="footer">
            <img src="../assets/qr.png" />
            <content>
                <h6>扫码加店长了解更多~</h6>
                <p>声明：balabalabalabala</p>
            </content>
        </article>
    </div>
</template>
<script>
export default {
    name: 'Footer'
}
</script>
<style scoped>
  .footer{
      width: 100%;
      position: relative;
  }
  #footer{
      height: 62%;
      position: absolute;
      bottom: 50%;
      transform: translateY(50%);
      padding: 20px 50px;
      width: 100%;
      background-color: #131313;
      color: #dbd9d9;
      text-align: left;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  #footer img{
      width: 200px;
  }
  #footer h6{
      color: #86868b;
      padding-bottom: 12px;
      border-bottom: #ffffff1c solid 1px;
  }
  #footer content{
      margin-left: 32px;
  }
</style>