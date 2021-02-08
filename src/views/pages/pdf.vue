/**
 * 
 * @author: liptpb
 * @date: 2021-02-02 
 */
<template>
  <div class="pdfView">
      <!-- 姓名，身份证 手机，按照这个顺序，姓名 身份证，必填（星号） -->
    <div class="title">核酸报告单查询</div>
    <van-cell-group>

       <van-field 
         v-model="name"
         placeholder="请输入姓名" 
         label="姓名" required="true"
       >
       </van-field>
       <van-field 
         v-model="iD"
         placeholder="请输入身份证" required="true"
         label="身份证" 
       >
       </van-field>
       <van-field 
         v-model="tel" 
         placeholder="请输入手机"  
         label="手机" 
       >
       </van-field>
       <div class='select'>
           <van-button type="primary" block @click="infoSumit">搜索</van-button>
       </div>
    </van-cell-group>
    <!-- <pdf v-for="item in numPages" :key="item" :src="src" :page="item" /> -->
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import { Notify,Toast  } from 'vant';
export default {
  components: {pdf,Notify,Toast},
  data() {
    return {
        name:'',
        tel:'',
        iD:'',
    };
  },
  mounted() {
  },
  methods: {
    infoSumit() {
        if(!this.name){
            Notify({ type: 'warning', message: '请输入姓名' });
            return
        }
        if(!this.iD){
            Notify({ type: 'warning', message: '请输入身份证' });
            return
        }else{
            if(this.iD && (!(/\d{17}[\d|x]|\d{15}/).test(this.iD) || (this.iD.length !== 15 && this.iD.length !== 18))){
              Notify({ type: 'warning', message: '请输入正确的身份证号码' })
              return
            }
        }
        if(this.tel&&!(/^1[3456789]\d{9}$/.test(this.tel))){ 
            Notify({ type: 'warning', message: '请输入正确的手机号码' })
            return
        }
         this.$get(this.HOST + '/hsbg/hsbginfo?uid=-1&ticket=5e8f1182ef6eb01b8d8e364e5c0e653c&_=1612289189506&hospitalcode=188282&idcardno='+this.iD+'&vtel='+this.tel+'&vname='+this.name).then((res) =>{
          if(res.PDFPath){
            var arr=JSON.stringify(res)
            // this.$router.push({ path: '/pdfImg?obj=+encodeURIComponent(arr))
            this.$router.push("/pdfImg?key="+encodeURIComponent(arr))
          }else{
             this.$router.push({ path: '/pdfImg' ,query: {key: ''}})
          }
        }).catch(function (error) {
            console.log(error);
        });
    },
  },
  created() {
    
  },
  computed: {},
  watch: {},
}
</script>

<style lang='less' scoped>
 .title{
     width: 100%;
     height: 80px;
     line-height: 80px;
     background: #07c160;
     text-align: center;
     font-size: 28px;
     color: #000;
     font-weight: bold;
 }
 .select{
     margin-top: 20px;
     text-align: center;
     padding: 10px;
 }
</style>