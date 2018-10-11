<template>
  <div class="frome-box" >
    <div class="frome-title">企业申请</div>
    <div class="frome-content">
      <formitemedit labelName="企业名称" itemName="enterpriseName" @inputvalue="setFormValue" :value="addForm.enterpriseName" />
      <formitem labelName="企业电话" itemName="enttelphone" @inputvalue="setFormValue" :value="addForm.enttelphone"/>
      <formitemedit labelName="联系人" itemName="lxName" @inputvalue="setFormValue" :value="addForm.lxName"/>
      <formitemedit labelName="联系电话" itemName="telphone" @inputvalue="setFormValue" :value="addForm.telphone"/>
    </div>
       <input type="button" value="提交申请" class="tj-btn" @click="save()" >
  </div>
      
</template>

<script>
import {exitEnterprise,saveEnterprise,addPersonEnterprise,getPersonByOpenid} from '../../../api/api';

import formitem from '../../../components/formitem.vue';
import formitemedit from '../../../components/formitemedit.vue';

export default {
  components: {
      formitem,
      formitemedit
  }, 

  data () {
    return { 
      
      addForm:{
        enterpriseName:'',
        enttelphone:'',
        company:'',
        lxName:'',
        telphone:'',
        applyCityId:'',
        enterpriseType:2
      }
      

    }
  },

  

  methods: {
    setFormValue(formJson){
      this.addForm[formJson.name]=formJson.value;
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