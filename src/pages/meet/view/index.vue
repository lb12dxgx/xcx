<template>
<div class="frome-box">
        <div class="pxhy-box">
          <a  class="zhengwen">
            <div class="garybt">{{meet.meetName}}</div>
            <div class="garyzw">{{meet.meetSummary}}</div>
            <div class="garyzsj juyou">{{meet.startDate}}</div>
          </a>
        </div>
        <div  class="frome-content">
          <div class="weui-cells__title" style="margin-top:20px">日程信息</div>
          <div class="weui-cells ">
            <a  class="weui-cell weui-cell_access" v-for="(item,index) in list" :key="index" @click="view(item.meetPlanId)" >
              <div class="weui-cell__bd">
                <p>{{item.meetPlanName}}</p>
              </div>
              <div class="weui-cell__ft"> 
              </div>
            </a>
          </div>
        </div>
</div>

  </template>

<script>


import {getMeet,meetPlanList} from '../../../api/api';


export default {
  data () {
    return {
      meetId:'',
      list: [],
      meet:{},
    }
     
  },

  methods: {
    view(meetPlanId) {
      wx.navigateTo({
        url: '/pages/meet/plan/main?meetPlanId='+meetPlanId
      })
    },
  },

  onUnload(){
    this.list=[];
    this.meet={};
  
  },

 onLoad() {
    let query=this.$root.$mp.query;
    this.meetId=query.meetId;
    getMeet({'meetId':this.meetId}).then((res)=>{
      this.meet=res.retData;
      meetPlanList({'meetId':this.meetId}).then((res)=>{
        this.list=res.retData;
      })
    })
   }
}

</script>

<style scoped>
  


</style>
