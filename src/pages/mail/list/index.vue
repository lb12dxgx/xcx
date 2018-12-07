<template>
  <div>
    <div class="weui-panel weui-panel_access" style="margin-top:20px">
      <div class="weui-panel__hd">商城</div>
      <div class="weui-panel__bd">
          <a  class="weui-media-box weui-media-box_appmsg" v-for="(item,index) in list" :key="index" @click="view(item.giftId)">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="item.smailPicUrl" alt="">
            </div>
            <div class="weui-media-box__bd  weui-cell_primary">
              <h4 class="weui-media-box__title">{{item.name}}</h4>
              <p class="weui-media-box__desc">{{item.price}}</p>
              <p class="weui-media-box__desc">{{item.spec}}</p>
             </div>
          </a>
      </div>
    </div>
      
  </div>
    
</template>

<script>


import {giftList} from '../../../api/api';


export default {
  data () {
    return {
     list:[]
    }
     
  },
  
  methods: {
    view(giftId){
      var openid=wx.getStorageSync('openid');
      if(openid==''){
        wx.switchTab({
          url: '/pages/my/main'
        });
        return;
      }
      wx.navigateTo({
        url: '/pages/mail/view/main?giftId='+giftId
      })
    }

  },

 

  onUnload(){
   this.list=[];
  },

  onLoad() {
   giftList().then((res)=>{
    this.list=res.retData;
    
   });
  }
}

</script>

<style scoped>
  


</style>
