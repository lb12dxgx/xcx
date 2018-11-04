<template>
  <div class="frome-box" style="margin-top:0px">
    <div class="tab-list">
          <ul>
            <li>
              <a  class="link-none" @click="goStep1">寻找帮助</a>
            </li>
            <li>
              <a   class="link-on" @click="goStep2">我的问题</a>
            </li>
             <li>
              <a   class="link-none" @click="goStep3">问题大厅</a>
            </li>
             <li>
              <a   class="link-none" @click="goStep4">我参与的</a>
            </li>
          </ul>
      </div>
      <div class="clear"></div>
      <div class="pxhy-box" v-for="(item,index) in list" :key="index">
          <a  class="zhengwen" @click="view(item.meetId)">
            <div class="garybt">{{item.title}}</div>
            <div class="garyzw">{{item.giftName}}</div>
            <div class="garyzw">{{item.money}}</div>
            <div class="garyzw">{{item.dayNum}}</div>
            <div class="garyzsj juyou">{{item.createDate}}</div>
          </a>
      </div>
  </div>
    
</template>

<script>


import {myProblem} from '../../../api/api';


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
    },
    goStep1(){
      wx.redirectTo({
        url: '/pages/sns/submitProblem/main'
      })
    },

    goStep2(){
      wx.redirectTo({
        url: '/pages/sns/myProblem/main'
      })
    },

    goStep3(){
      wx.redirectTo({
        url: '/pages/sns/listProblem/main'
      })
    },

    goStep4(){
      wx.redirectTo({
        url: '/pages/sns/shareProblem/main'
      })
    },


  },

  onReachBottom() {
    if(this.total>this.list.length){
      this.pageNum=this.pageNum+1
      myProblem({'pageNum':this.pageNum}).then((res)=>{
        this.list=this.list.concat(res.retData.content);
      })
    }
  },

  onUnload(){
   this.list=[];
  },

  onLoad() {
   myProblem().then((res)=>{
    this.list=res.retData.content;
    this.total=res.retData.totalElements;
   });
  }
}

</script>

<style scoped>
  
.tab-list ul li{
  list-style: none;
  float: left;
  width: 23%;
}

.link-on{
  font-size: 16px
}

.link-none{
  font-size: 16px
}

</style>
