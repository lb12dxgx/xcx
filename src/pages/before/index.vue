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

            <map id="map" :longitude="centpoint.longitude" :latitude="centpoint.latitude" scale="17"   :markers="markers"  :polyline="polyline"  show-location style="width: 100%; height: 80vh;"
            >
            </map>
              <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="setMyPoint">标注施工位置</a> 
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
        centpoint:{
          longitude:'',
          latitude:'',
        },
        pointarray:[],
        markers: [],
        polyline: []
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
      this.ismap=true;
      

    },

    setMyPoint(){
      var _this=this;
      wx.getLocation({
      type: 'gcj02', 
        success(res) {
           var point={};
           point.latitude = res.latitude+(0.01*_this.pointarray.length);
           point.longitude = res.longitude+(0.01*_this.pointarray.length);
           _this.pointarray.push(point);
           _this.addPoint();
         },
        fail(re){
          console.log(re);
        }
      });
     
    },
    addPoint(){
        this.polyline= [{
            points: this.pointarray,
            color:"#FF0000DD",
            width: 2,
            dottedLine: true
        }];
       for (var i = 0; i < this.pointarray.length; i++) {
          var marker={
          iconPath: "/static/images/timg.jpg", 
          id: 0,
          latitude: 23.099994,
          longitude: 113.324520,
          width: 50,
          height: 50
        };
        marker.latitude= this.pointarray[i].latitude;
        marker.longitude= this.pointarray[i].longitude;
        this.markers.push(marker);
       }
    }

   
    
 },

  onLoad() {
    var _this=this;
    this.type=wx.getStorageSync('type');
    if(this.type==""){
       wx.navigateTo({
        url: '/pages/company/main'
     })
    }

    wx.getSetting({
      success(res) {
       if (!res['scope.userLocation']||!res['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation', 
            success(res) {
              console.log(res)
            },
            fail(r) { console.log(r)},
            complete() { }
          })
        }
      }
    });

    wx.getLocation({
      type: 'gcj02', 
        success(res) {
           _this.centpoint.latitude = res.latitude;
           _this.centpoint.longitude = res.longitude;
           _this.pointarray.push( _this.centpoint);
           _this.addPoint();
          
        },
        fail(re){
          console.log(re);
        }
      });
     
      

  },



}

</script>

<style scoped>
  .step1{
    margin-top:50px;

  }


</style>
