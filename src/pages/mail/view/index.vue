<template>
<div class="frome-box">
  <div style="width:100%;min-height:800px">
    <div style="text-align:center; width:100%;height:300px">
      <img  :src="gift.picUrl" style="width:100%;height:300px" />
    </div>
    <div>
      <div class="pxhy-box" style="width:100%;margin:0px">
        <a  class="zhengwen">
          <div class="garybt">{{gift.name}}</div>
          <div class="garyzw">{{gift.price}}</div>
          <div class="garyzsj juyou">
            {{gift.spec}} 
            {{gift.post==0?'免邮费':'收邮费'}}
          </div>
        </a>
      </div>
    </div>
    <div class="weui-cells__title">商品详情</div>
    <div style="text-align:center; width:100%;">
      <img  :src="gift.descUrl" style="width:100%;" />
    </div>
  </div>
   <div class="btn-bottom" @click="handleSave()" >立即兑换</div>
</div>


  </template>

<script>


import {getGift} from '../../../api/api';


export default {
  data () {
    return {
     
      gift:{
        giftId:'',
        name:'',
        price:'',
        spec:'',
        post:'',
        num:'',
        picUrl:'',
        smailPicUrl:'',
        descUrl:''
      },
    }
     
  },

  methods: {

    handleSave(){
      wx.navigateTo({
        url: '/pages/mail/exchange/main?giftId='+this.gift.giftId
      })
    }
    
  },

  onUnload(){
    
    this.gift={};
  
  },

 onLoad() {
    let query=this.$root.$mp.query;
  
    getGift({'giftId':query.giftId}).then((res)=>{
      this.gift=res.retData;
      
    })
   }
}

</script>

<style scoped>
.btn-bottom {
  position:fixed;
  bottom:0;
  display:flex;
  width:100%;
  text-align:center;
  height: 35px;
  background: #d70601;
  border: none;
  color: #fff;
  font-size: 18px;
  display: block;
  margin: 0 auto;
  padding:10px; 
  margin-top:50px;
}


</style>
