<template>
  <div>
    <div class="weui-panel weui-panel_access" style="margin-top:20px">
      <div class="weui-panel__hd">兑换礼品</div>
      <div class="weui-panel__bd">
          <a  class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="gift.smailPicUrl" alt="">
            </div>
            <div class="weui-media-box__bd  weui-cell_primary">
              <h4 class="weui-media-box__title">{{gift.name}}</h4>
              <p class="weui-media-box__desc">{{gift.price}}</p>
              <p class="weui-media-box__desc">{{gift.spec}}</p>
              <p class="weui-media-box__desc">库存数量: {{gift.num}}</p>
             </div>
          </a>
      </div>
      <div class="weui-cells__title">礼品数量</div>
      <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number"  v-model="num"
                    placeholder="请输入礼品数量">
                </div>
            </div>
        </div>
        

        <div class="weui-cells__title">邮寄地址</div>
        <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <input class="weui-input" type="text"  v-model="postAddren"
                      placeholder="请输入邮寄地址">
              </div>
            </div>
        </div>
        <div class="weui-cells__title">联系电话</div>
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                      <input class="weui-input" type="telphone"  v-model="telePhone"
                      placeholder="请输入联系电话">
                </div>
            </div>
        </div>

        <div class="weui-cells__title">
          需要支付：<span style="color:red;font-size;18px">{{money}}</span>
        </div>
        <div class="weui-cells__title">
          个人积分：<span style="font-size;18px">{{score}}</span>
        </div>
       
    </div>
    <input type="button" class="tj-btn" value="提交" @click="handleSave()" />
      
  </div>
    
</template>

<script>


import {getGift,getPersonByOpenid,exchangeGift} from '../../../api/api';


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
     score:'',
     num:1,
     postAddren:'',
     telePhone:''

    }
     
  },

  computed: {
    // 计算属性的 getter
    money: function () {
      // `this` 指向 vm 实例
      return this.num*this.gift.price
    }
  },
  
  methods: {
    handleSave(){
      if(this.num>this.gift.num){
        wx.showToast({
            title: '超过最大库存量',
            duration: 2000
        });
        return false;
      };

      if(this.money>this.score){
        wx.showToast({
            title: '大于本人积分',
            duration: 2000
        });
        return false;
      };

      exchangeGift({'giftId':this.gift.giftId,'num':this.num,'postAddren':this.postAddren,'telphone':this.telphone}).then((res)=>{
        if(res.state==0){
          wx.showToast({
            title: '数量不合法',
            duration: 2000
          });
        }else{
          wx.redirectTo({url:'/pages/index/main'});
        }
      })

    }

  },

 

  onUnload(){
   this.gift={
        giftId:'',
        name:'',
        price:'',
        spec:'',
        post:'',
        num:'',
        picUrl:'',
        smailPicUrl:'',
        descUrl:''
      };
    this.score='';
    this.num=1;
  },

  onLoad() {
    let query=this.$root.$mp.query;
    this.giftId=query.giftId;
    getGift({'giftId':this.giftId}).then((res)=>{
      this.gift=res.retData;
     });
    getPersonByOpenid().then((res)=>{
      this.score=res.retData.score;
      this.postAddren=res.retData.postAddren;
      this.telePhone=res.retData.telePhone;
     });
  }
}

</script>

<style scoped>
  


</style>
