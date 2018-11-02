<template>
  <div>
    <div class="weui-panel weui-panel_access" style="margin-top:20px">
      <div class="weui-panel__hd">我的兑换记录</div>
      <div class="weui-panel__bd">
          <a  class="weui-media-box weui-media-box_appmsg" v-for="(item,index) in list" :key="index" >
             <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="item.smailPicUrl" alt="">
            </div>
            <div class="weui-media-box__bd  weui-cell_primary">
              <h4 class="weui-media-box__title">{{item.giftName}}</h4>
              <p class="weui-media-box__desc">编号:{{item.exchangeCode}}</p>
              <p class="weui-media-box__desc">数量:{{item.num}}</p>
              <p class="weui-media-box__desc">积分:{{item.money}}</p>
              <p class="weui-media-box__desc">兑换时间:{{item.createDate}}</p>
              <p class="weui-media-box__desc" v-if="item.state==0">待发货</p>
              <p class="weui-media-box__desc" v-if="item.state==1">快递时间:{{item.postDate}}</p>
              <p class="weui-media-box__desc" v-if="item.state==1">快递单号:{{item.postCode}}</p>
             </div> 
          </a>
      </div>
    </div> 
      
  </div>
    
</template>

<script>


import {exchangeList} from '../../../api/api';


export default {
  data () {
    return {
     list:[]
    }
     
  },
  
  methods: {
    view(giftId){
      wx.navigateTo({
        url: '/pages/mail/view/main?giftId='+giftId
      })
    }

  },

 

  onUnload(){
   this.list=[];
  },

  onLoad() {
   exchangeList().then((res)=>{
    this.list=res.retData;
    
   });
  }
}

</script>

<style scoped>
  


</style>
