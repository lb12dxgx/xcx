<template>
  <div class="frome-box" >
    <div class="frome-title">城市申请</div>
    <div class="frome-content">
        <div class="text-box ">
          <input  type="text" data-name='cityName' @focus="handlefocus($event)" @blur="handleblur($event)" 
          :class="inputClassJson.cityName" v-model="addForm.cityName"/>
           <label class="lablefocus">城市名称</label>
        </div>
        <div class="text-box ">
          <input  type="text" data-name="applyCompany" @focus="handlefocus($event)" @blur="handleblur($event)" 
          :class="inputClassJson.applyCompany" v-model="addForm.applyCompany"/>
           <label class="lablefocus">申请单位</label>
        </div>
        <div class="text-box ">
          <input  type="text" data-name="enttelphone" @focus="handlefocus($event)" @blur="handleblur($event)" 
          :class="inputClassJson.enttelphone" v-model="addForm.enttelphone"/>
           <label class="lablefocus">单位电话</label>
        </div>
        <div class="text-box ">
          <input  type="text" data-name="person" @focus="handlefocus($event)" @blur="handleblur($event)" 
          :class="inputClassJson.person" v-model="addForm.person"/>
           <label class="lablefocus">联系人</label>
        </div>
         <div class="text-box ">
          <input  type="text" data-name="telphone" @focus="handlefocus($event)" @blur="handleblur($event)" 
          :class="inputClassJson.telphone" v-model="addForm.telphone"/>
           <label class="lablefocus">联系电话</label>
        </div>
    </div>
       <input type="button" class="tj-btn" value="提交申请" @click="addCity()" v-if="!exitCity" >
  </div>
      
</template>

<script>
import {getPersonByOpenid,saveApplaycity} from '../../../api/api';



export default {
 

  data () {
    return { 
      
      addForm:{
        provinceName:'',
        cityName:'',
        applyCompany:'',
        enttelphone:'',
        person:'',
        telphone:'',
      },

      inputClassJson:{
        cityName:'',
        applyCompany:'',
        enttelphone:'',
        person:'',
        telphone:'',
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