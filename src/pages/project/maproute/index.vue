<template>
  
  <div>
   
   <map-route :route-info="routeInfo"></map-route>

            
  </div>
 

</template>

<script>

import {getAddressByMap} from '../../../api/api';

let plugin = requirePlugin("mapPlugin")

export default {
  data () {
     return {
       routeInfo: {
        startLat: 39.80469, 
        startLng: 116.30717, 
        startName: "我的位置",   // 起点名称 选填
        endLat: 39.80469,    // 终点纬度必传
        endLng: 116.30717,  //终点经度 必传
        endName: "施工位置",  //终点名称 必传
        mode: "car"  //算路方式 选填
        }
    }
   
  },
     
 


  methods: {
   

   
    
 },

  onShow() {
    var _this=this;

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
           _this.routeInfo.startLat = res.latitude;
           _this.routeInfo.startLng = res.longitude; 
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
    background-color: #FFF;

  }

  .step2{
    margin-top:50px;
    background-color: #FFF;

  }

  .step3{
    margin-top:50px;
    background-color: #FFF;

  }


</style>
