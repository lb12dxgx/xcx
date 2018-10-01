<template>
  
  <div >
   <div class="js">
    <div class="weui-navbar">
        <div @click="goStep1()" class="weui-navbar__item" :class="step1 ?'weui-bar__item_on' : '' ">
             项目基本信息
        </div>
        <div @click="goStep2()" class="weui-navbar__item" :class="step2 ?'weui-bar__item_on' : '' ">
             位置信息
        </div>
        <div @click="goStep3()" class="weui-navbar__item" :class="step3 ?'weui-bar__item_on' : '' ">
            结果反馈
        </div>
    </div>

    <div class="step1" v-if="step1">
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
                  <input class="weui-input "   placeholder="请输入工程地点"v-model="addForm.projectAddren">
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
             <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label" >联系人</label>
              </div>
              <div class="weui-cell__bd">
                  <input class="weui-input "   placeholder="联系人"v-model="addForm.projectCode">
              </div>
            </div>
             <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label" >联系电话</label>
              </div>
              <div class="weui-cell__bd">
                  <input class="weui-input "   placeholder="13720052345"v-model="addForm.projectCode">
              </div>
            </div>
            <button type="primary" @tap="calling" >拨打电话</button>
             
    </div>

    <div class="step2" v-if="step2">
        <div class="weui-cells weui-cells_form" >
         
          <div class="weui-cell">
              
              <div class="weui-cell__bd">
                 经度：{{centpoint.longitude}} 维度：{{centpoint.latitude}}
              </div>
        </div> 
          <div class="projectMap">

            <map id="map" :longitude="centpoint.longitude" :latitude="centpoint.latitude" scale="17"   :markers="markers"  :polyline="polyline"  show-location style="width: 100%; height: 70vh;"
            >
            </map>

             <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="toXianChang()" >导航到现场</a> 
             
          </div>

      </div>

    </div>

    <div class="step3" v-if="step3">

      <div class="weui-cells__title">管线情况</div>
        <div class="weui-cells ">
            <radio-group class="radio-group" @change="radioChange">
                    <div class="radio radioDiv" v-for="(item, index) in items" :key="item.name">
                      <radio :value="item.name" :checked="item.checked"/> {{item.value}}
                    </div>
            </radio-group>
        </div>
        <div class="weui-cells__title">现场标注时间</div>
      <div class="weui-cell">
            <div class="weui-cell__bd">
                <input class="weui-input "   placeholder="标注时间"v-model="addForm.projectCode">
                  
            </div>
     </div>
     <div class="weui-cells__title">现场标注措施</div>
      <div class="weui-cell">
            <div class="weui-cell__bd">
                <textarea class="weui-textarea" placeholder="请输入文本" rows="3"></textarea>
                  
            </div>
     </div>

      <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="saveResult()" >保存</a>

    </div>


   </div>   

  </div>
 

</template>

<script>

import {getAddressByMap} from '../../../api/api';

export default {
  data () {
     return {
        items: [
        {name: '1', value: '无管线',},
        {name: '2', value: '有管线',checked: 'true'}
      ],
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

    toXianChang(){
       wx.navigateTo({
            url: '/pages/project/maproute/main'
          })
       
    },
    calling(){
      wx.makePhoneCall({
      phoneNumber: '13720053036' //仅为示例，并非真实的电话号码
      })
    },

    saveResult(){
       wx.navigateTo({
            url: '/pages/before/qs/main'
          })
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
    saveMyPoint(){
      if(this.pointarray.length>=1){
        var centpoint=this.pointarray[0];
        getAddressByMap({'longitude':centpoint.longitude,'latitude':centpoint.latitude}).then((res)=>{
          this.addForm.projectAddren=res.retData;
          this.ismap=false;
       });
      }
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
