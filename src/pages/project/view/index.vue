<template>
  
   <div class="frome-box">
    <div class="tab-list">
      <ul>
         <li>
          <a   :class="step1 ?'link-on' : 'link-none' " @click="goStep1">反馈信息</a>
        </li>
         <li>
          <a   :class="step2 ?'link-on' : 'link-none' " @click="goStep2">基本信息</a>
        </li>
        <li>
          <a   :class="step3 ?'link-on' : 'link-none' " @click="goStep3">位置信息</a>
        </li>
      </ul>
    </div>
   <div class="clear"></div>

   <div class="step1" v-if="step1">
     
      <div class="liebiao-box" v-for="(item,index) in list" :key="index">
       <a>
         <p class="gcmc-text">{{item.enterpriseName}}</p>
         <ul class="list-box-xx">
           <li class="left-box left">有无管线</li>
           <li class="right-box right">{{item.result}}</li>

         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">管线类型</li>
           <li class="right-box right">{{item.type}}</li>

         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">标注时间</li>
           <li class="right-box right">{{item.resultDate}}</li>

         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">标注说明</li>
           <li class="right-box right">{{item.resultSumary}}</li>

         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">企业电话</li>
           <li class="right-box right">{{item.enttelphone}}</li>
         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">联系人</li>
           <li class="right-box right">{{item.personName}}</li>

         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">联系电话</li>
           <li class="right-box right">{{item.telePhone}}</li>
         </ul>
         
       </a>
        </div>
      </div>
       

    <div class="step2" v-if="step2">
            <div class="frome-content">
              <div class="text-box ">
                <input  type="text" v-model="projectForm.projectName" disabled="true" class="inputview" />
                <label class="lablefocus">工程名称</label>
               </div>
            <div class="text-box ">
              <input  type="text" v-model="projectForm.projectType" disabled="true" class="inputview"/>
              <label class="lablefocus">工程类别</label>
             
           </div>
           <div class="text-box ">
              <input  type="text" v-model="projectForm.projectStartDate" disabled="true" class="inputview"/>
              <label class="lablefocus">施工时间</label>
             
           </div>
            <div class="text-box ">
              <input  type="text" v-model="projectForm.projectAddren" disabled="true" class="inputview" />
              <label class="lablefocus">工程地点</label>
              
           </div>
           <div class="text-box ">
              <input  type="text" v-model="projectForm.projectStartEnd" disabled="true" class="inputview" />
              <label class="lablefocus">工程起止点</label>
           </div>

           <div class="text-box ">
              <input  type="text" v-model="projectForm.enterpriseName" disabled="true" class="inputview" />
              <label class="lablefocus">企业名称</label>
           </div>
            <div class="text-box ">
              <input  type="text" v-model="projectForm.enttelphone" disabled="true" class="inputview" />
              <label class="lablefocus">企业电话</label>
           </div>

           <div class="text-box ">
              <input  type="text" v-model="projectForm.personName" disabled="true" class="inputview" />
              <label class="lablefocus">联系人</label>
           </div>

           <div class="text-box ">
              <input  type="text" v-model="projectForm.telePhone" disabled="true" class="inputview" />
              <label class="lablefocus">联系电话</label>
           </div>

            </div>

            <input type="button" value="拨打联系人电话" class="tj-btn" @tap="calling" >
            <input type="button" value="拨打企业电话" class="tj-btn" @tap="callingEmp" >
             
    </div>

    <div class="step3" v-if="step3">
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

      

  </div>
 

</template>

<script>

import {getAddressByMap,getApplayproject,projectresultListByProject} from '../../../api/api';

export default {
  data () {
     return {
        list:[],
        step1:true,
        step2:false,
        step3:false,
        ismap:false,
        beforeProjectId:'',
        projectForm:{},
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

    resultChange(e){
      this.addForm.result=this.resultArray[e.mp.detail.value];
    },

    typeChange(e){
      this.addForm.type=this.typeArray[e.mp.detail.value];
    },
    dateChange(e){
       this.addForm.resultDate=e.mp.detail.value;
    },

    goStep1(){
      this.step1=true;
      this.step2=false;
      this.step3=false;
      projectresultListByProject({'beforeProjectId':this.beforeProjectId}).then((res)=>{
        this.list=res.retData;
      })
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
      this.showMap();
    },

    saveResult(){
       var params = Object.assign({beforeProjectId:this.beforeProjectId}, this.addForm);

      saveProjectResult(params).then((res)=>{
          wx.navigateTo({
            url: '/pages/before/qs/main'
          })
      });

    },

    toXianChang(){
       wx.navigateTo({
            url: '/pages/project/maproute/main?centpoint='+JSON.stringify(this.centpoint)
          })
       
    },
    calling(){
      wx.makePhoneCall({
      phoneNumber: this.projectForm.telePhone //仅为示例，并非真实的电话号码
      })
    },

    callingEmp(){
      wx.makePhoneCall({
        phoneNumber: this.projectForm.enttelphone //仅为示例，并非真实的电话号码
      })
    },

    showMap(){
      this.ismap=true;
      console.log(this.projectForm.mapJson);
      if(this.projectForm.mapJson!=""){
        this.pointarray=JSON.parse(this.projectForm.mapJson);
        this.centpoint= this.pointarray[0];
        this.mapLine();
      }
    },

    
    mapLine(){
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
  onUnload(){
      this.step1=true;
      this.step2=false;
      this.step3=false;
  },

  onLoad() {
    let query=this.$root.$mp.query;
    this.beforeProjectId=query.beforeProjectId;
    getApplayproject({'beforeProjectId':this.beforeProjectId}).then((res)=>{
        this.projectForm=res.retData;
      })
    this.goStep1();
     

  },



}

</script>

<style scoped>
  


</style>
