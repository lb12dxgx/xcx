<template>
<div class="frome-box">
  <div class="pxhy-box">
    <a  class="zhengwen">
      <div class="garybt">{{meetPlan.teacherName}}</div>
      <div class="garyzw">{{meetPlan.meetPlanName}}</div>
      <div class="garyzsj juyou">
              {{meetPlan.teacherCompany}} {{meetPlan.teacherPost}} 
      </div>
    </a>
  </div>
  <div  class="frome-content" v-if="meetPlan.videoUrl!=''">
    <div class="weui-cells__title" >视频</div>
    <div class="weui-uploader__files">
      <video   :src="meetPlan.videoUrl" controls style="margin-left:10px" :poster="meetPlan.picUrl"/>
    </div>    
  </div>
  
</div>

  </template>

<script>


import {getMeetPlan} from '../../../api/api';


export default {
  data () {
    return {
      meetPlan:{},
    }
  },

  methods: {
    
  },

  onUnload(){
    this.list=[];
    this.meet={};
  
  },

 onLoad() {
    let query=this.$root.$mp.query;
    getMeetPlan({'meetPlanId':query.meetPlanId}).then((res)=>{
      this.meetPlan=res.retData;
     })
   }
}

</script>

<style scoped>
  


</style>
