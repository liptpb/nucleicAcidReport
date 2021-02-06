/**
 * 
 * @author: liptpb
 * @date: 2021-02-02 
 */
<template>
  <div class="pdfView">
      <!-- 姓名，身份证 手机，按照这个顺序，姓名 身份证，必填（星号） -->
    <div class="title">核酸报告结果</div>
    <div v-show="pdfShow">
       <pdf v-for="item in numPages" :key="item" :src="src" :page="item"  />
    </div>
    <noData mess="未查到核酸报告结果" v-show="!pdfShow"></noData>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import noData from '@/components/noData'
export default {
  components: {pdf,noData},
  data() {
    return {
        numPages: '',
        src: '',
        pdfUrl1:
         'http://f.hzfeijia.com/html/abc.pdf',
         pdfShow:true
    };
  },
  mounted() {
   if(this.$route.query.key){
     this.pdfShow = true
     this.loadPdf(this.$route.query.key)
   }else{
     this.pdfShow = false
   }
   
  },
  methods: {
    loadPdf(url) {
      //  this.src = pdf.createLoadingTask(this.HOST+'/html/abc.pdf',{withCredentials: false})
      //  debugger
      this.src = pdf.createLoadingTask(url)
      this.src.promise.then((pdf) => {
         this.numPages = pdf._pdfInfo.numPages // 这里拿到当前pdf总页数       })
      })
    }
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
 .pdfView{
     overflow: hidden;
 }
</style>