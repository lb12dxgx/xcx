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
       <div class="weui-cells weui-cells_form" >
         <div class="weui-cell  ">
                    <div class="weui-cell__hd">
                        <label class="weui-label" :class="error_personName">姓名</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input "   placeholder="请输入姓名" v-model="addForm.personName">
                    </div>
                    
        </div>
        <div class="weui-cell ">
              <div class="weui-cell__hd">
                  <label class="weui-label " :class="error_userCode" >身份证号</label>
              </div>
              <div class="weui-cell__bd">
                  <input class="weui-input" placeholder="请输入身份证号" v-model="addForm.userCode">
              </div>
             
        </div>
        <div class="weui-cell ">
              <div class="weui-cell__hd">
                  <label class="weui-label">性别</label>
              </div>
              <div class="weui-cell__bd">
                <picker mode="selector"  :range="items" range-key="name"  @change="sexChange">
                   <input class="weui-input" placeholder="请选择性别" v-model="addForm.personSex" disabled="true">
                </picker>
              </div>
              
        </div>
         <div class="weui-cell ">
              <div class="weui-cell__hd">
                  <label class="weui-label">企业名称</label>
              </div>
              <div class="weui-cell__bd">
                 <input class="weui-input"   placeholder="请输入企业名称" v-model="addForm.enterpriseName">
              </div>
              
         </div>
          <div class="weui-cell ">
              <div class="weui-cell__hd">
                  <label class="weui-label">公司职务</label>
              </div>
              <div class="weui-cell__bd">
                 <input class="weui-input"   placeholder="请输入公司职务" v-model="addForm.personPosition">
              </div>
              
         </div>

       </div>

     <input type="button" value="保存" class="tj-btn"  @click="savePerson"/>
    </div>

   
 </div>
 

</template>

<script>


import {isExitByUserCode,savePersonDesc,getPersonByOpenid} from '../../api/api';

function isCardNo(card)  
{  
   // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
   var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
   if(reg.test(card) === false)  
   {  
    
      return  false;  
   }  
   return true;
};

function isPersonName(personName)  
{  
  console.log(personName=='');
   
   if(personName =='')  
   {  
     return  false;  
   }  
   return true;
};

export default {
  data () {
    return {
    
      avatarUrl:'',
      nickName:'',
      addForm:{
        personName:'',
        userCode:'',
        enterpriseName:'',
        personSex:'',
        personPosition:''
      },
      items: [
        {name: '男', value: '男'},
        {name: '女', value: '女'}
      ],

      error_personName:'',
      error_userCode:'',
    
    }
     
  },


  methods: {
    radioChange (e) {
      console.log('radio发生change事件，携带value值为：', e.target.value);
      this.addForm.personSex=e.target.value
    },

    sexChange:function(e){
      this.addForm.personSex=this.items[e.mp.detail.value].value;
      
    },

  
  savePerson(){


        if(!isPersonName(this.addForm.personName)){
           wx.showToast({
            title: '请输入姓名',
            duration: 2000
          });
           return false;
        };

        if(!isCardNo(this.addForm.userCode)){
           wx.showToast({
            title: '请输入身份证号',
            duration: 2000
          });
           return false;
         };

        if(this.addForm.enterpriseName==''){
          wx.showToast({
            title: '请输入企业名称',
            duration: 2000
          });
          return false;
       };

        if(this.addForm.personPosition==''){
          wx.showToast({
            title: '请输入职位',
            duration: 2000
          });
          return false;
       };

        if(this.addForm.personSex==''){
          wx.showToast({
            title: '请输入性别',
            duration: 2000
          });
          return false;
       };

        savePersonDesc(this.addForm) .then((res)=>{
         wx.switchTab({
            url: '/pages/my/main'
          })
      })
    },
},
  onShow() {
     this.addForm.openid=wx.getStorageSync('openid');
     this.avatarUrl = wx.getStorageSync('avatarUrl');
     this.nickName = wx.getStorageSync('nickName');
      getPersonByOpenid({'openid':wx.getStorageSync('openid')}) .then((res)=>{
          this.addForm=res.retData;
      })
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
