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


        <a  class="right sgsb-box" @click="goUrl('/pages/accidentinfo/main')">
          <ul class="pictext">
            <li class="left"><p><img src="/static/img/sgsb.png"  class="inconbox"></p></li>
            <li class="right">事故上报</li>
          </ul>
        </a>
    </div>
    <div class="comnav">

        <a  class="left guanxian-box" @click="goUrl('/pages/accidentinfo/main')">
          <ul class="pictext">
            <li class="left"><p><img src="/static/img/hypx.png"  class="inconbox"></p></li>
            <li class="right">会议培训</li>
          </ul>
        </a>


        <a class="right sgsb-box" @click="goUrl('/pages/accidentinfo/main')">
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
          <li class="right"><a href="#" class="puff_right">更多 ></a></li>
         </ul>
      </div>
    <div class="pxhy-box">
      <a href="#" class="zhengwen">
        <div class="garybt">全国城市道路塌陷灾害与道路病害检测评估</div>
        <div class="garyzw">党的十九大提出构建以“城市群为主体”的城镇协调发展格局和建设“交通强国”的战略目标，为新时代我国建设安全、绿色、高效的城市道路设施服务体系带来新的历史机遇</div>
        <div class="garyzsj juyou">2018-08-09</div>
      </a>
    </div>
    <div class="pxhy-box">
      <a href="#" class="zhengwen">
        <p class="garybt">全国城市道路塌陷灾害与道路病害检测评估</p>
        <p class="garyzw">党的十九大提出构建以“城市群为主体”的城镇协调发展格局和建设“交通强国”的战略目标，为新时代我国建设安全、绿色、高效的城市道路设施服务体系带来新的历史机遇</p>
        <p class="garyzsj juyou">2018-08-09</p>
      </a>
    </div>
       
    </div>

  
</div>
     
</template>

<script>


export default {
  data () {
    return {
      
      movies:[{'url':'/static/img/banner.jpg'},{'url':'/static/img/banner.jpg'}],
      

    }
  },

  

  methods: {
    goUrl(path){
      if('/pages/before/main'==path){
        this.type=wx.getStorageSync('type');
        if(this.type==""){
           wx.navigateTo({
            url: '/pages/company/main'
          })
        }else if(this.type==2){
           wx.navigateTo({
            url: '/pages/before/js/main'
          })
        }else if (this.type==1){
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

  created () {
    // 调用应用实例的方法获取全局数据
    
  }
}
</script>

<style scoped>
swiper{
  height: 165px;
}

</style>