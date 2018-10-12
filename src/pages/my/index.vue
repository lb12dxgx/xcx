<template>
  
  <div>
    <div class="my">
      <div class="my-head">
         <div class="myAvatar">
           <open-data type="userAvatarUrl"></open-data>
         </div>
         <div class="my-name">
           <open-data type="userNickName"></open-data> 
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
                  <a  class="weui-btn weui-btn_mini weui-btn_primary" @click="sendSms" style="background: #d70601;" >{{sendMsg}}</a>

              </div>  
        </div>
        
      </div>

     <input type="button" value="登录" class="tj-btn"  @click="regUser" v-if="isLogin" >
     <input type="button" value="注销" class="tj-btn"  @click="logOut" v-if="!isLogin" >
     
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
      telphone:'13720053036',
      smscode:'7405',
      sendMsg:'发送验证码'
    
    }
     
  },


  methods: {
    getUserInfo () {
      //console.log("----");
      // 调用登录接口
      wx.login({
        success: (r) => {
          getOpenId({"code":r.code}).then((res) => {
            this.openid=res.retData.openid;
            //console.log('res.retData==='+this.openid)
           
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
            this.goPerson();
          
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
     display: flex;
     flex-direction: column;
     align-items: center;
  }
  .myAvatar{
    width: 100px;
    height: 100px;
    border-radius:50%;
    overflow:hidden;
    display: block;
    border: 2px solid #fff;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);

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
