/**
 * 
 * @author: liptpb
 * @date: 2020-08-26 
 */
<template>
  <div class='nodata'>
      	<div class="container">
		      <div class="icon" v-show="icon"></div>
		<p>{{mess}}</p>
	</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {

    };
  },
  props: {
    mess: {
        type: String,                
        default: '暂时没有信息!'    
    },
    icon:{
       type: Boolean, 
       default: true
    }
  },
  mounted() {

  },
  methods: {

  },
  created() {

  },
  computed: {},
  watch: {},
}
</script>

<style lang='less' scoped>
.nodata{
    .container{
			width:100%;
			min-height: 50px;
            background-color:#fff;
            text-align: center;
            padding-bottom: 20px;
            .icon{
			width:150px;
			height:150px;
			background-image: url("../assets/0.png");
			-webkit-background-size: 100% 100%;
			background-size: 100% 100%;
			    text-align: center;
    display: inline-block;
    margin-top: 23px;
		}
		p{
			font-size:24px;
            font-family:PingFang SC;
            font-weight: 500;
    color: #aaaaaa;
		}
		}
		
}
</style>