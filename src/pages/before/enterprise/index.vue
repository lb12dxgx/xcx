<template>
  <div class="frome-box" >
    <div class="frome-title">企业 申请</div>
    <div class="frome-content">
      <div class="text-box ">
        <input  type="text" data-name='enterpriseName' @focus="handlefocus($event)" @blur="handleblur($event)" 
        :class="inputClassJson.enterpriseName" v-model="addForm.enterpriseName"/>
        <label class="lablefocus">企业名称</label>
      </div>
      <div class="text-box ">
        <picker mode="selector"  :range="typeArray" @change="typeChange">  
          <input  type="text" v-model="addForm.qsType" disabled="true"/>
              <label class="lablefocus">企业类型</label>
        </picker>
      </div>
      <div class="text-box ">
        <input  type="text" data-name='enttelphone' @focus="handlefocus($event)" @blur="handleblur($event)" 
        :class="inputClassJson.enttelphone" v-model="addForm.enttelphone"/>
        <label class="lablefocus">企业电话</label>
      </div>
      <div class="text-box ">
        <input  type="text" data-name='lxName' @focus="handlefocus($event)" @blur="handleblur($event)" 
        :class="inputClassJson.lxName" v-model="addForm.lxName"/>
        <label class="lablefocus">联系人</label>
      </div>
       <div class="text-box ">
        <input  type="text" data-name='telphone' @focus="handlefocus($event)" @blur="handleblur($event)" 
        :class="inputClassJson.telphone" v-model="addForm.telphone"/>
        <label class="lablefocus">联系电话</label>
      </div>
    </div>
       <input type="button" value="提交申请" class="tj-btn" @click="save()" >
  </div>
      
</template>

<script>
import {exitEnterprise,saveEnterprise,addPersonEnterprise,getPersonByOpenid} from '../../../api/api';


export default {

  data () {
    return { 
      typeArray:['水行业','燃气行业','通讯行业','电力行业','其他行业'],
      addForm:{
        enterpriseName:'',
        enttelphone:'',
        qsType:'',
        company:'',
        lxName:'',
        telphone:'',
        applyCityId:'',
        enterpriseType:2
      },

      inputClassJson:{
        enterpriseName:'',
        enttelphone:'',
        company:'',
        lxName:''
      }
      

    }
  },

  

  methods: {
    handlefocus(e){
     var name=e.currentTarget.dataset.name;
      this.inputClassJson[name]='inputfocus';
    },
    handleblur(e){
      var name=e.currentTarget.dataset.name;
      this.inputClassJson[name]='';
    },

    typeChange(e){
      this.addForm.qsType=this.typeArray[e.mp.detail.value];
    },

    save(){
      saveEnterprise(this.addForm).then((res)=>{
       addPersonEnterprise({enterpriseId:res.retData.enterpriseId}).then((res)=>{
        wx.setStorageSync("enterpriseType",this.addForm.enterpriseType);
        if(this.addForm.enterpriseType==3){
            wx.navigateTo({
              url: '/pages/before/js/main'
            })
          }else{
             wx.navigateTo({
              url: '/pages/before/qs/main'
            })
          }

       });
      })
    }
    
   },

 onShow: function(option){
    let query=this.$root.$mp.query;
    this.addForm.enterpriseType=query.enterpriseType;
     this.addForm.applyCityId= query.applyCityId;
    getPersonByOpenid().then((res)=>{
      this.addForm.enterpriseName=res.retData.enterpriseName;
      this.addForm.telphone=res.retData.telePhone;
      this.addForm.lxName=res.retData.personName
    })
    
  }

}
</script>

<style scoped>

</style>