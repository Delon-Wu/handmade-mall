<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<style>
#app {
  font-family: "SF Pro Text","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,.8);
}
*{
  box-sizing: border-box
}
body,html{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-Y: hidden;
  margin: 0;
}
body{
  background: #fff url('./assets/bg.jpg') no-repeat fixed;
  background-size: cover;
  background-position: center;
}
</style>
