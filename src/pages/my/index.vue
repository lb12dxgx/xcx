<template>
  
  <div>
    <div class="my">
      <div class="my-head">
         <div >
          <img :src="avatarUrl" />
         </div>
         <div class="my-name">
           {{nickName}}
         </div> 
      </div>
       <div class="weui-cells weui-cells_form" v-if="isLogin">
         <div class="weui-cell ">
                    <div class="weui-cell__hd">
                        <label class="weui-label">手机号</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="number" pattern="[0-9]*"  placeholder="请输入手机号" v-model="telphone">
                    </div>
                    
        </div>
        <div class="weui-cell ">
              <div class="weui-cell__hd">
                  <label class="weui-label">验证码</label>
              </div>
              <div class="weui-cell__bd">
                  <input class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入验证码" v-model="smscode">
              </div>
              <div class="weui-cell__ft">
                  <a  class="weui-btn weui-btn_mini weui-btn_primary" @click="sendSms"  >{{sendMsg}}</a>
              </div>  
        </div>
        
      </div>

     
           
      <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="regUser" v-if="isLogin">登录</a> 
      <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="logOut" v-if="!isLogin">注销</a> 
     
     </div>

     <div class="weui-cells" v-if="!isLogin">
            <a class="weui-cell weui-cell_access"  @click="goPerson" >
                <div class="weui-cell__bd">
                    <p>个人资料</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>我的事故</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>我的申请</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>我的提问</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
      </div>
 </div>
 

</template>

<script>
import {isExitByTelphone,getSmsCode,validateSmsCode,getOpenId,regUser} from '../../api/api';
export default {
  data () {
    return {
      senddis:false,
      isLogin:true,
      openid:'',
      avatarUrl:'',
      nickName:'',

      telphone:'13720053036',
      smscode:'6956',
      sendMsg:'发送验证码'
    
    }
     
  },


  methods: {
    getUserInfo () {
      console.log("----");
      // 调用登录接口
      wx.login({
        success: (r) => {
          getOpenId({"code":r.code}).then((res) => {
            this.openid=res.retData.openid;
            console.log('res.retData==='+this.openid)
              wx.getUserInfo({
                success: (res) => {
                  this.avatarUrl = res.userInfo.avatarUrl;
                  this.nickName = res.userInfo.nickName;
                 
                }
              });
          });
          
        }
      })
    },

    sendSms(){

       if(this.senddis){
       	 return false;
       };

       var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
       
       if(!myreg.test(this.telphone)||this.telphone==''){
          wx.showToast({
            title: '手机号格式不对',
            duration: 2000
          });
          return false;
       };

      getSmsCode({'telphone':this.telphone,'openid':this.openid,"type":0}).then((res) => {
              this.senddis=true;
              if(res.state==1){
              	wx.showToast({
		            title: '短信已经发送',
		            duration: 2000
          		}) 
              }

               var m=60;
               var interval=setInterval(()=>{
	              m=m-1;
	              this.sendMsg=m+"秒";
	              if(m<=0){
	                 clearInterval(interval);
	                 this.senddis=false;
	                 this.sendMsg="再次发送"
	                 return; 
	              }
	             },1000);
          });
      
    },

    logOut(){
    	wx.clearStorageSync();
    	this.isLogin=true;
    },

    regUser(){

      var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
       if(!myreg.test(this.telphone)||this.telphone==''){
          wx.showToast({
            title: '手机号格式不对',
            duration: 2000
          });
          return false;
       };
       console.log(this.smscode.length);
       if(this.smscode==''||this.smscode.length!=4){
          wx.showToast({
            title: '验证码格式不对',
            duration: 2000
          });
          return false;
       };

       validateSmsCode({'telphone':this.telphone,'smscode':this.smscode})
       .then((res)=>{
        if(!res.retData){
          wx.showToast({
            title: '验证码不符合',
            duration: 2000
          }) 
        }else{

        regUser({'telphone':this.telphone}) .then((res)=>{
            console.log("openid"+res.retData.openid);
            wx.setStorageSync("openid",this.openid);
            wx.setStorageSync("avatarUrl",this.avatarUrl);
            wx.setStorageSync("nickName",this.nickName);
            console.log(wx.getStorageSync("avatarUrl"));
           wx.switchTab({
              url: '/pages/index/main'
            })
            /*wx.switchTab({
              url: '/pages/index/main'
            })*/
           
         })
       }

    })
  },

 goPerson(){
  wx.navigateTo({
    url: '/pages/person/main'
  })
 },

},
  onShow() {
    console.log("openid="+wx.getStorageSync("openid"));
    if(wx.getStorageSync("openid")!=''){
    	     this.isLogin=false;
          this.openid=wx.getStorageSync('openid');
          this.avatarUrl = wx.getStorageSync('avatarUrl');
          this.nickName = wx.getStorageSync('nickName');
         
    }else{
        this.getUserInfo();
    }
  }
}

</script>

<style scoped>
  .my{
    margin-top:5px;
    text-align: center;
   
  }
  .my-head{
     background-color: #fff;
  }
  .my img{
    width: 100px;
    height: 100px;
    border-radius:50%;
    -webkit-border-radius:50%;
    -moz-border-radius:50%
   }
  .my .my-name{
    font-size: 16px;
    margin: 0px 10px;
    padding:10px 10px;
  /*  border-bottom:1px solid #ccc;*/
  }
  .my-reg{
    margin-top:10px; 
    background-color: #fff;
  }

</style>
