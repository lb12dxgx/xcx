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
       <div class="weui-cells weui-cells_form" >
         <div class="weui-cell ">
                    <div class="weui-cell__hd">
                        <label class="weui-label">姓名</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input"   placeholder="请输入姓名" v-model="addForm.personName">
                    </div>
                    
        </div>
        <div class="weui-cell ">
              <div class="weui-cell__hd">
                  <label class="weui-label">身份证号</label>
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
                  <radio-group class="radio-group" @change="radioChange">
                    <label class="radio" v-for="(item, index) in items" :key="item.name">
                      <radio :value="item.name" :checked="item.checked"/> {{item.value}}
                    </label>
                </radio-group>
                 
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

        
        
      </div>

     
           
      <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="savePerson" >保存</a> 
      
     
     </div>

   
 </div>
 

</template>

<script>


import {isExitByUserCode,savePersonDesc,getPersonByOpenid} from '../../api/api';
export default {
  data () {
    return {
    
      avatarUrl:'',
      nickName:'',
      addForm:{
        personName:'',
        userCode:'',
        enterpriseName:'',
        personSex:'男',
        openid:''
      },
      items: [
        {name: '男', value: '男',checked: 'true'},
        {name: '女', value: '女',}
      ]
    
    }
     
  },


  methods: {
    radioChange (e) {
      console.log('radio发生change事件，携带value值为：', e.target.value);
      this.addForm.personSex=e.target.value
    },

  
  savePerson(){
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
