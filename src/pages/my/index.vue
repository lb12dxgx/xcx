<template>
  
  <div class="my">
    <div class="my-head">
       <div >
        <img :src="userInfo.avatarUrl" />
       </div>
       <div class="my-name">
         {{userInfo.nickName}}
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
         
    <a href="javascript:;" class="weui-btn weui-btn_min weui-btn_primary" style="width:30%;margin-top:20px">登录</a> 
    
    </div>
 

</template>

<script>
import {isExitByTelphone,getSmsCode,validateSmsCode} from '../../api/api';
export default {
  data () {
    return {
      userInfo:{},
      telphone:'',
      smscode:'',
      name:''
    }
     
  },


  methods: {
    getUserInfo () {
      console.log("----");
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo;
              console.log(res.userInfo);
            }
          })
        }
      })
    },
    sendSms(){
      console.log('telphone==='+this.telphone)
      isExitByTelphone({'telphone':this.telphone,"type":0}).then((res) => {
        console.log('res.retData==='+res.retData)
      })
    }
  },

   mounted() {
    this.getUserInfo()
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
