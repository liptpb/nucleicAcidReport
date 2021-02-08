/**
 * 
 * @author: liptpb
 * @date: 2021-02-02 
 */
<template>
  <div class="pdfView">
      <!-- 姓名，身份证 手机，按照这个顺序，姓名 身份证，必填（星号） -->
    <div class="title">核酸报告结果</div>
    <!-- <van-button type="primary" block class="onButton" @click="onButton">下载核酸报告结果</van-button> -->
    <!-- <van-sticky offset-top="{{ 50 }}"> -->
       <van-icon name="down" color="#07c160" @click.stop="gotoOption('downLoad', 'li', '1')" style="border: 1px solid #07c160;border-radius: 50px;"/><div class="bor" @click.stop="gotoOption('downLoad', 'li', '1')">下载报告</div>
    <!-- </van-sticky> -->
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
  components: {pdf,noData,},
  data() {
    return {
        numPages: '',
        src: '',
        pdfUrl1:
         'http://f.hzfeijia.com/html/abc.pdf',
         pdfShow:true,
         key:{},
         pdfUrl:''
    };
  },
  mounted() {
    let key = JSON.parse(decodeURIComponent(this.$route.query.key));
 
    this.key = key
   if(key.PDFPath){
     this.pdfShow = true
     this.loadPdf(key.PDFPath)
   }else{
     this.pdfShow = false
   }
   
  },
  methods: {
    loadPdf(url) {
      this.src = pdf.createLoadingTask(url)
      this.src.promise.then((pdf) => {
         this.numPages = pdf._pdfInfo.numPages // 这里拿到当前pdf总页数       })
      })
    },
    gotoOption (val, item, index) {
      if (val === 'collect') {
        this.collectReport(item, index)
      } else if (val === 'downLoad') {
         this.$dialog.alert({
            title: "", //加上标题
            message: "是否下载核酸报告结果", //改变弹出框的内容
            showCancelButton: true //展示取水按钮
          })
          .then(() => { //点击确认按钮后的调用
                  this.downloadWeekly(this.key.PDFPath, this.key.VName,this.key.IDCardNo)
          })
          .catch(() => { //点击取消按钮后的调用
                 
          })
       
      }
    },
    //下载PDF
        pdfDownload(url,fileName){
             this.axios({
                method: 'get',
                responseType: 'arraybuffer',
                url: url
            }).then(function(res){
                //调用下载方法，把后端传过来的流传给fileDownload方法
                    this.fileDownload(res.data, fileName);
                }.bind(this)
            )
            .catch(
                function(error) {
                    this.$Message.error("网络请求出错")
                }.bind(this)
            );
        },
        fileDownload:function (data, fileName) {
            let blob = new Blob([data], {
				//type类型后端返回来的数据中会有，根据自己实际进行修改
                type: "application/vnd.ms-excel"
            });
            let filename = fileName || "报表.xls";
            if (typeof window.navigator.msSaveBlob !== "undefined") {
                window.navigator.msSaveBlob(blob, filename);
            } else {
                var blobURL = window.URL.createObjectURL(blob);
                // 创建隐藏<a>标签进行下载
                var tempLink = document.createElement("a");
                tempLink.style.display = "none";
                tempLink.href = blobURL;
                tempLink.setAttribute("download", filename);
                if (typeof tempLink.download === "undefined") {
                    tempLink.setAttribute("target", "_blank");
                }
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
                window.URL.revokeObjectURL(blobURL);
            }
        },
            // 下载
    downloadWeekly (url, pdfName, uuid) {
      // 调用子组件的下载方法
      this.downloadPDF(url, pdfName, uuid)
    },
 
    downloadPDF (url, fileName, uuid) {
      const _this = this
      fetch(url).then(function (response) {
        if (response.ok) {
          return response.arrayBuffer()
        }
        throw new Error('Network response was not ok.')
      }).then(function (arraybuffer) {
        let blob = new Blob([arraybuffer], {
          type: `application/pdf;charset-UTF-8` // word文档为msword,pdf文档为pdf
        })
 
        let objectURL = URL.createObjectURL(blob)
        console.log(objectURL)
        let downEle = document.createElement('a')
        let fname = fileName // 下载文件的名字
        // let fname = `download` // 下载文件的名字
        downEle.href = url
        downEle.setAttribute('download', fname)
        downEle.setAttribute("target", "_blank");
        document.body.appendChild(downEle)
        downEle.click()
      }).catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message)
      })
    },
        downloadPost (config){
          return new Promise((resolve,reject) => {
            axios({
                url: config.url,
                method: 'post',
                data: config.data,
                responseType: 'blob'
            }).then(res => {
              resolve(res)
            }).catch(err=>{
              reject(err);
            });
          });
        }
      },
  created() {
  },
  computed: {},
  watch: {},
}
</script>

<style lang='less' scoped>
/deep/ .van-dialog__confirm{
    color: #07c160;
}
.van-icon{
  // border: 1px solid #07c160;
  // width: 50px;
  // height: 50px;
  // border-radius: 50px;
  position: absolute;
  right: 35px;
  top: 100px;
  z-index: 99;
  font-size: 30px;
}
.bor{
  right: 16px;
  top: 140px;
  font-size: 18px;
  color: #07c160;
  text-align: center;
  position: absolute;
  z-index: 99;
}
.onButton{
  margin: 20px 0;
  padding: 0 10px;
}
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