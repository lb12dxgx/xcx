<template>
  
  <div class="my">
    <div class="my-head">
       <div >
        <img :src="avatarUrl" />
       </div>
       <div class="my-name">
         {{nickName}}
       </div> 
    </div>
     <div class="weui-cells weui-cells_form">
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
                <a  class="weui-btn weui-btn_mini weui-btn_primary" @click="sendSms" >发送验证码</a>
            </div>  
      </div>
      <div class="weui-cell ">
            <div class="weui-cell__hd">
                <label class="weui-label">姓名</label>
            </div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" placeholder="请输入姓名" v-model="name">
            </div>
           
      </div>
    </div>
         
    <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="regUser">登录</a> 
    
    </div>
 

</template>

<script>
import {isExitByTelphone,getSmsCode,validateSmsCode,getOpenId,regUser} from '../../api/api';
export default {
  data () {
    return {
      openid:'',
      avatarUrl:'',
      nickName:'',

      telphone:'13720053036',
      smscode:'2688',
      name:'张三',
      
      regInfo:{},
      
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
            console.log('res.retData==='+res.retData)
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
      
       var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
       if(!myreg.test(this.telphone)||this.telphone==''){
          wx.showToast({
            title: '手机号格式不对',
            duration: 2000
          });
          return false;
       }

      isExitByTelphone({'telphone':this.telphone,"type":0}).then((res) => {
        
        if(!res.retData){
          wx.showToast({
            title: '手机号已被绑定',
            duration: 2000
          }) 
        }else{
          getSmsCode({'telphone':this.telphone,'openId':this.openId,"type":0}).then((res) => {
            this.regInfo=res.retData;
          })
        }
      })
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
          this.regInfo.telphone=this.telphone;
         this.regInfo.userName=this.telphone;
         this.regInfo.openId=this.openId;
         this.regInfo.avatarUrl=this.avatarUrl;
         this.regInfo.nickName=this.nickName;

         regUser(this.regInfo) .then((res)=>{
            this.regInfo=res.retData;
            var regInfostr=JSON.stringify(this.regInfo);
            console.log(regInfostr);
            wx.setStorageSync({
              key:"regInfo ",
              data:regInfostr
            });

            wx.switchTab({
              url: '/pages/index/main'
            })
           
         })
       }

    })
  },
},
   onShow() {
    console.log(wx.getStorageSync('regInfo'));
    if(wx.getStorageSync('regInfo')!=''){
         var regInfostr=wx.getStorageSync('regInfo');
         this.regInfo=JSON.parse(regInfostr);
         this.avatarUrl = this.regInfo.avatarUrl;
         this.nickName = this.regInfo.nickName;
         this.openid=this.regInfo.openid;
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
