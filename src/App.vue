<template>
  <div id="app" style="display: none;" :style="{display: 'block'}">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
  @import '../static/less/app.less'; // 全局自定义的css样式
  #app {  
  width: 100%;  
  height: 100%;  
  overflow: scroll;  
  -webkit-overflow-scrolling: touch;  
  position: absolute;  
  left:0;  
  top:0;  
} 
</style>

