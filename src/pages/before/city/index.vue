<template>
  <div class="frome-box" >
    <div class="frome-title">企业申请</div>
    <div class="frome-content">
      <formitemedit labelName="城市名称" itemName="cityName" @inputvalue="setFormValue" :value="addForm.cityName" />
      <formitemedit labelName="申请单位" itemName="applyCompany" @inputvalue="setFormValue" :value="addForm.applyCompany"/>
      <formitemedit labelName="联系人" itemName="person" @inputvalue="setFormValue" :value="addForm.person"/>
      <formitemedit labelName="联系电话" itemName="telphone" @inputvalue="setFormValue" :value="addForm.telphone"/>
    </div>
       <input type="button" value="提交申请" class="tj-btn" @click="addCity()" v-if="!exitCity" >
  </div>
      
</template>

<script>
import {getPersonByOpenid,saveApplaycity} from '../../../api/api';

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
        provinceName:'',
        cityName:'',
        applyCompany:'',
        person:'',
        telphone:'',
      }
      

    }
  },

  

  methods: {
    setFormValue(formJson){
      this.addForm[formJson.name]=formJson.value;
    },

    addCity(){
      saveApplaycity(this.addForm).then((res)=>{
        var query="?step=1";
         wx.navigateTo({
          url: '/pages/before/reg/main'+query
       })
      })
    }
    
   },

 onShow: function(option){
    let query=this.$root.$mp.query;
    this.addForm.provinceName=query.provinceName;
    this.addForm.cityName=query.cityName;
    getPersonByOpenid().then((res)=>{
      this.addForm.applyCompany=res.retData.enterpriseName;
      this.addForm.telphone=res.retData.telePhone;
      this.addForm.person=res.retData.personName

    })
    //this.addForm.cityName="2334";
    
  }

}
</script>

<style scoped>

</style>