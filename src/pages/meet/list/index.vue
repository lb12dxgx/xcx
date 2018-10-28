<template>
  <div class="frome-box">
      <div class="weui-cells__title">会议培训</div>
      <div class="pxhy-box" v-for="(item,index) in list" :key="index">
          <a  class="zhengwen" @click="view(item.meetId)">
            <div class="garybt">{{item.meetName}}</div>
            <div class="garyzw">{{item.meetSummary}}</div>
            <div class="garyzsj juyou">{{item.startDate}}</div>
          </a>
      </div>
  </div>
    
</template>

<script>


import {meetList} from '../../../api/api';


export default {
  data () {
    return {
     list:[],
     pageNum:0,
     total:0,
    }
     
  },
  
  methods: {
    view(meetId){
      wx.navigateTo({
        url: '/pages/meet/view/main?meetId='+meetId
      })
    }

  },

  onReachBottom() {
    if(this.total>this.list.length){
      this.pageNum=this.pageNum+1
      meetList({'pageNum':this.pageNum}).then((res)=>{
        this.list=this.list.concat(res.retData.content);
      })
    }
  },

  onUnload(){
   this.list=[];
  },

  onLoad() {
   meetList().then((res)=>{
    this.list=res.retData.content;
    this.total=res.retData.totalElements;
   });
  }
}

</script>

<style scoped>
  


</style>
