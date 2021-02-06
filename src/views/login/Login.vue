<template>
  <div class="login-box">
    <!-- <div class="container">
      <div class="icon"></div>
      <p>Bomo</p>
    </div> -->
    <div class="imgBox">
        <div class='imgBoxInfo'></div>
    </div>
      <div class="login-content">
          <div class="login-item flex alignCenter">
              <div class="item-left">+86</div>
              <div class="input-box flex_1 flex alignCenter">
                    <input class="input" type="number" @input="mobile=mobile.slice(0,11)" v-model="mobile" @blur="$blur" placeholder="请输入手机号">
              </div>
              <div class="item-right" @click.stop="startCountDown">{{waitTime == 60 ? '发送验证码' : `${waitTime}s`}}</div>
          </div>
           <div class="login-item flex alignCenter">
              <div class="item-left">验证码</div>
              <div class="input-box flex_1 flex alignCenter">
                    <input class="input" type="number" v-model="code" @blur="$blur" placeholder="请输入验证码">
              </div>
          </div>
          <div class="login-btn">
              <van-button color="#FF9900" :round="true" size="large" @click="sumitClick()">登录</van-button>
          </div>
      </div>
  </div>
</template>

<script>
    const mobileReg= /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

    export default {
        name: 'Login',
        data() {
            return {
                mobile: '',
                code: '',
                timer: null,
                waitTime: 60,
                repeatText: '',
            }
        },
        mounted() {
             if (window.history && window.history.pushState) {
              history.pushState(null, null, document.URL);
              window.addEventListener('popstate', this.goBack, false);
            }
        },
         methods: {
             goBack(){
    
               this.$router.replace({path: '/login'});
             },
            startCountDown(){
              
                this.$post(this.HOST + '/login/vc', {
                  "mobile" : this.mobile
                }).then((res) =>{

                    if(res.code == 0){
                        this.interval = setInterval(() => {
                            if(this.waitTime > 1) {
                                this.waitTime --
                                
                            }else {
                                clearInterval(this.interval)
                                this.waitTime = 60
                            }
                       },1000) 
                      
                    }else{
                        this.$toast.fail(res.msg)
                    }
                });
            },
            sumitClick(){
                
                this.$post(this.HOST + '/login', {mobile:this.mobile,vc:this.code}).then((res) =>{
                    // this.$toast('反馈成功')
                   
                    if(res.code == 0){
                       this.$toast.success('登录成功')
                       localStorage.clear();
                       localStorage.setItem("userToken",res.data)
                        setTimeout(() => { 
                            this.$router.push({ path:'/index' })
                        }, 2000)
                    }else{
                        this.$toast.fail(res.msg)
                    }
                    
                    }).catch((error) => {
                    this.$toast.fail('登录失败,请联系管理员')
                    });
            }, 
         }
        }
</script>

<style lang="less" scoped>
    /deep/ .van-toast{
        width: 160px;
        min-height: 160px;
        font-size: 24px;
    }
    .login-box {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        text-align: center;
        overflow: hidden;
        .imgBox{
            width: 100%;
            height: 445px;
            display: flex;
            border:0px solid #000;
            align-items:center;
                justify-content:center;
            .imgBoxInfo{
              
              width: 329px;
              height:149px;
              background: url("./img/0.png") no-repeat center;
              background-size: 100% 100%;
              
            }
        }
        .container{
                width:100%;
                 height: 500px;
                background: url("./img/bg.png") repeat;
                border-radius: 0 0 55% 37%;
                text-align: center;
                .icon {
                   width: 203px;
                   height: 293px;
                  background: url("./img/logo@2x.png") no-repeat center;
                  background-size: 100% 100%;
                   text-align: center;
                  display: inline-block;
                   margin-top: 70px;
               }
               p{
                margin-top: -56px;
			    font-size:60px;
                font-family:PingFang SC;
                font-weight: 500;
                color: #fff;
		      }
        }
       
        .login-content {
            padding: 40px 43px 0;
            // height: calc(100% - 400px);
            .login-item {
                height: 100px;
                border-bottom: 2px solid #ECECEC;
                .item-left {
                    width: 100px;
                    font-size:30px;
                    font-family:PingFang SC;
                    font-weight:bold;
                    color:rgba(102,102,102,1);
                    margin-right: 25px;
                }
                .input-box {
                    input {
                        width: 100%;
                        font-size:30px;
                        color: #d3d3d3;
                        height: 100px;
                        line-height: 100px;
                    }
                }
                .item-right {
                    font-size:24px;
                    font-family:PingFang SC;
                    font-weight:bold;
                    color:rgba(200,178,156,1);
                    cursor: pointer;
                }
            }
            .login-item:nth-child(1) {
                margin-bottom: 70px;
            }
            .login-btn {
                margin-top: 94px;
                /deep/ .van-button{
        height:86px;
        background:linear-gradient(259deg,rgba(249,62,70,1),rgba(239,24,110,1));
        border-radius:43px;
        font-size:36px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1)
    }
            }
        }
    }
</style>
