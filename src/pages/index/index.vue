<template>
  <div class="warpe">
   
      <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000"  >
                <block v-for="(item, index) in movies" :index="index" :key="key">
                    <swiper-item>
                        <image :src="item.url" style="width:100%" mode="widthFix"/>
                    </swiper-item>
                </block>
      </swiper>
 
  <div>
    <div class="comnav">

        <a  class="left guanxian-box" @click="goUrl('/pages/before/main')">
          <ul class="pictext">
            <li class="left"><p><img src="/static/img/gxwj.png"  class="inconbox"></p></li>
            <li class="right">管线挖掘</li>
          </ul>
        </a>


        <a  class="right sgsb-box" @click="goUrl('/pages/accidentinfo/list/main')">
          <ul class="pictext">
            <li class="left"><p><img src="/static/img/sgsb.png"  class="inconbox"></p></li>
            <li class="right">事故上报</li>
          </ul>
        </a>
    </div>
    <div class="comnav">

        <a  class="left guanxian-box" @click="goUrl('/pages/meet/list/main')">
          <ul class="pictext">
            <li class="left"><p><img src="/static/img/hypx.png"  class="inconbox"></p></li>
            <li class="right">会议培训</li>
          </ul>
        </a>
        <a class="right sgsb-box" @click="goUrl('/pages/sns/submitProblem/main')"> 
      <!--  <a class="right sgsb-box" @click="goUrl('/pages/sns/viewProblem/main?problemId=cedf5ca3-42c1-4e57-8f14-051418b892e9')">   -->
    <!--   <a class="right sgsb-box" @click="goUrl('/pages/sns/viewProblem/main?shareCode=idday2018112211')" >  -->
          <ul class="pictext">
            <li class="left"><p><img src="/static/img/gxbbb.png"  class="inconbox"></p></li>
            <li class="right">管线帮帮帮</li>
          </ul>
        </a>
    </div>
  </div>
 
    <div class="tuijian">
      <div class="pictitle">
         <ul>
          <li class="left pictb"><p><img src="/static/img/pxhy.png"  class="bt-box"></p></li>
          <li class="left">会议培训</li>
          <li class="right">
          <a @click="goUrl('/pages/meet/list/main')" class="puff_right">更多 ></a>
          </li>
         </ul>
      </div>
      <div class="pxhy-box" v-for="(item,index) in list" :key="index">
          <a  class="zhengwen" @click="view(item.meetId)">
            <div class="garybt">{{item.meetName}}</div>
            <div class="garyzw">{{item.meetSummary}}</div>
            <div class="garyzsj juyou">{{item.startDate}}</div>
          </a>
      </div>
    
       
    </div>

  
</div>
     
</template>

<script>

import {meetList} from '../../api/api';

export default {
  data () {
    return {
      list:[],
      movies:[{'url':'/static/img/banner.jpg'},{'url':'/static/img/banner.jpg'}],
      

    }
  },

  

  methods: {
     view(meetId){
      wx.navigateTo({
        url: '/pages/meet/view/main?meetId='+meetId
      })
    },
    goUrl(path){
      var openid=wx.getStorageSync('openid');
      console.log("openid="+openid);
      if(openid==''){
        wx.switchTab({
          url: '/pages/my/main'
        });
        return;
      }

      if('/pages/before/main'==path){
        this.type=wx.getStorageSync('enterpriseType');
        console.log("type="+this.type);
        if(this.type==""){
           wx.navigateTo({
            url: '/pages/before/reg/main'
          })
        }else if(this.type==3){
           wx.navigateTo({
            url: '/pages/before/js/main'
          })
        }else if (this.type==2){
           wx.navigateTo({
            url: '/pages/before/qs/main'
          })
        }
        
      }else{
        wx.navigateTo({
          url: path
        })
      }
    },
    
   },

  onLoad(){
    meetList().then((res)=>{
      if(res.retData.content.length>0){
        this.list=res.retData.content.slice(0,2);
      }
  
   });
    
  }
}
</script>

<style scoped>
swiper{
  height: 165px;
}

</style>