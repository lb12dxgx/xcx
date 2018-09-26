<template>
  
     <div class="weui-tab">
    

        <div class="weui-tab__panel">
          <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000" >
              <block v-for="(item, index) in movies" :index="index" :key="key">
                  <swiper-item>
                      <image :src="item.url" class="slide-image" mode="aspectFill"/>
                  </swiper-item>
              </block>
          </swiper>

        <div class="weui-grids bg-white">
          <a   class="weui-grid" v-for="(item, index) in pages" :index="index" :key="key"  @click="goUrl(item.page)" >
              <div class="weui-grid__icon" style="width:100px;height:100px">
                  <img  :src="item.url"  alt="">
              </div>
              <p class="weui-grid__label">{{item.name}}</p>
          </a>
       </div>

       <div class="weui-panel weui-panel_access">
            <div class="weui-panel__hd">
              视频直播
            </div>
            <div class="weui-panel__bd">
                <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">会议名称</h4>
                        <p class="weui-media-box__desc">
                          <div class="meet_desc">
                            <span>会议地点:</span>
                            <span>武汉</span>
                          </div>
                          <div class="meet_desc">
                            <span>开始时间:</span> 
                            <span>2018-08-23 10:00</span> 
                          </div>
                          <div class="meet_desc">
                            <span>直播状态:</span> 
                            <span>已结束</span> 
                          </div>
                        </p>
                    </div>
                </a>
                <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
                   
                    <div class="weui-media-box__bd">
                       <h4 class="weui-media-box__title">会议名称</h4>
                        <p class="weui-media-box__desc">
                          <div class="meet_desc">
                            <span>会议地点:</span>
                            <span>武汉</span>
                          </div>
                          <div class="meet_desc">
                            <span>开始时间:</span> 
                            <span>2018-08-23 10:00</span> 
                          </div>
                          <div class="meet_desc">
                            <span>直播状态:</span> 
                            <span>已结束</span> 
                          </div>
                        </p>
                    </div>
                </a>
            </div>
            <div class="weui-panel__ft">
                <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
                    <div class="weui-cell__bd">查看更多</div>
                    <span class="weui-cell__ft"></span>
                </a>    
            </div>
        </div>


        </div> 
      
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      movies:[{'url':'/static/images/banner.jpg'},{'url':'/static/images/banner.jpg'}],
      pages:[{'url':'/static/images/shigu.png','name':'事故上报','page':'/pages/accidentinfo/main'},
              {'url':'/static/images/zhaobiao.png','name':'管线挖据','page':'/pages/before/main'},
              {'url':'/static/images/caigou.png','name':'行业资讯'},
              {'url':'/static/images/huiyi.png','name':'产业服务'},
              {'url':'/static/images/qiye.png','name':'工作必备'},
              {'url':'/static/images/chanpin.png','name':'知识库'}]

    }
  },

  components: {
    card
  },

  methods: {
    goUrl(path){
      wx.navigateTo({
        url: path
      })
    },
    
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>


</style>
