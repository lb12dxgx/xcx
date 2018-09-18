<template>
  
  <div >
   <div class="js">
    <div class="weui-navbar">
        <div @click="goStep1()" class="weui-navbar__item" :class="step1 ?'weui-bar__item_on' : '' ">
             挖据申请
        </div>
        <div @click="goStep2()" class="weui-navbar__item" :class="step2 ?'weui-bar__item_on' : '' ">
              反馈中
        </div>
        <div @click="goStep3()" class="weui-navbar__item" :class="step3 ?'weui-bar__item_on' : '' ">
              已反馈
        </div>
    </div>

    <div class="step1" v-if="step1">
        <div class="weui-cells weui-cells_form" >
         <div class="projectDesc" v-if="!ismap">

            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label" >工程名称</label>
              </div>
              <div class="weui-cell__bd">
                  <input class="weui-input "   placeholder="请输入工程名称"v-model="addForm.projectName">
              </div>
            </div>
          
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label" >工程类别</label>
              </div>
              <div class="weui-cell__bd">
                  <input class="weui-input "   placeholder="请输入工程编号"v-model="addForm.projectCode">
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label" >工程地点</label>
              </div>
              <div class="weui-cell__bd">
                  <input class="weui-input "   placeholder="请输入工程地点"v-model="addForm.projectCode">
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label" >工程起止点</label>
              </div>
              <div class="weui-cell__bd">
                  <input class="weui-input "   placeholder="请输入工程起止点" v-model="addForm.projectCode">
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label" >施工时间</label>
              </div>
              <div class="weui-cell__bd">
                  <input class="weui-input "   placeholder="请输入施工时间"v-model="addForm.projectCode">
              </div>
            </div>

            <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="showMap" >下一步</a> 

        </div>

          <div class="projectMap" v-if="ismap">

            <map id="map" longitude="113.324520" latitude="23.099994" scale="14" :controls="controls"  :markers="markers"  :polyline="polyline"  show-location style="width: 100%; height: 90vh;"
            @regionchange="regionchange"
            @controltap="controltap"
            @markertap="markertap"
            @tap="tap"



            ></map>
              
            </map>
          </div>

      </div>

    </div>


   </div>   

  </div>
 

</template>

<script>





export default {
  data () {
     return {
        step1:true,
        step2:false,
        step3:false,
        ismap:false,
        type:"",
        addForm:{},
      markers: [{
        iconPath: "/static/images/timg.jpg", 
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 50,
        height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/static/images/timg.jpg',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  }
   
   },
     
 


  methods: {
    goStep1(){
      this.step1=true;
      this.step2=false;
      this.step3=false;
    },

    goStep2(){
      this.step2=true;
      this.step1=false;
      this.step3=false;
    },


    goStep3(){
      this.step3=true;
      this.step1=false;
      this.step2=false;
    },

    showMap(){
      wx.authorize({scope: "scope.userLocation"});
      console.log("latitude==");
      wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log("latitude=="+latitude);
        wx.openLocation({
          latitude,
          longitude,
          scale: 28
        })
      }
    });

      this.ismap=true;
    },

    regionchange(e) {
    console.log(e)
  },
  markertap(e) {
    console.log(e)
  },
  controltap(e) {
    console.log(e)
  },
  tap(e) {
    console.log(e)
  }
    
 },

  onLoad() {
    this.type=wx.getStorageSync('type');
  console.log(this.type);
    if(this.type==""){
       wx.navigateTo({
        url: '/pages/company/main'
     })
    }
  }
}

</script>

<style scoped>
  .step1{
    margin-top:50px;

  }


</style>
