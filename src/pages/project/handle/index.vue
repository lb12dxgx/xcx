<template>
  
   <div class="frome-box">
    <div class="tab-list">
      <ul>
         <li>
          <a   :class="step1 ?'link-on' : 'link-none' " @click="goStep1">基本信息</a>
        </li>
         <li>
          <a   :class="step2 ?'link-on' : 'link-none' " @click="goStep2">位置信息</a>
        </li>
        <li>
          <a   :class="step3 ?'link-on' : 'link-none' " @click="goStep3">反馈信息</a>
        </li>
      </ul>
    </div>
   <div class="clear"></div>

    <div class="step1" v-if="step1">
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

            <block v-for="(item,index) in fileList" :key="index">
                <div class="listImg"  :id="item" @click="previewImage" >
                  <image style="width:95%;height:100%" :src="item"  />
                </div>
            </block>

            </div>

             <input type="button" value="拨打联系人电话" class="tj-btn" @tap="calling" >
            <input type="button" value="拨打企业电话" class="tj-btn" @tap="callingEmp" >
             
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
               <cover-view class="controls">
               
                <cover-view class="play"  >
                  <button type="warn"  @click="toXianChang()"> 导航到现场 </button>
                </cover-view>
               
             </cover-view>
            </map>

           
             
          </div>

      </div>

    </div>

    <div class="step3" v-if="step3">

       <div class="frome-content">
          <div class="text-box ">
            <picker mode="selector"  :range="resultArray" @change="resultChange">   <input  type="text" v-model="addForm.result" disabled="true"/>
              <label class="lablefocus">管线情况</label>
            </picker>
          </div>

          <div class="text-box ">
            <picker mode="selector"  :range="typeArray" @change="typeChange">   <input  type="text" v-model="addForm.type" disabled="true"/>
              <label class="lablefocus">管线类型</label>
            </picker>
          </div>

          <div class="text-box ">
            <picker mode="date" :value="addForm.projectStartDate"  @change="dateChange">    <input  type="text" v-model="addForm.resultDate" disabled="true"/>
              <label class="lablefocus">标注时间</label>
            </picker>
          </div>

          <div class="text-box ">
              <textarea   v-model="addForm.resultSumary" rows="3"/>
              <label class="lablefocus">标注说明</label>
           </div>
          
          <input type="button" value="保存" class="tj-btn" 
          @click="saveResult()" >

    </div>


   </div>   

  </div>
 

</template>

<script>

import {getAddressByMap,getApplayproject,saveProjectResult,getFileList,url} from '../../../api/api';

export default {
  data () {
     return {
        resultArray:['有', '无'],
        typeArray:['水','燃气','通讯','电力','其他'],
        step1:true,
        step2:false,
        step3:false,
        ismap:false,
        beforeProjectId:'',
        fileList:[],
        addForm:{
          result:'',
          type:'',
          resultDate:'',
          resultSumary:''

        },
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
       getApplayproject({'beforeProjectId':this.beforeProjectId}).then((res)=>{
        this.projectForm=res.retData;
        getFileList({bussinessId:this.projectForm.picId}).then((res)=>{
          var arr=res.retData;
          for(let ele of arr) {  
            this.fileList.push(url+"/"+ele.fileWebPath);
          };
          
        })
        
      })
    },

    goStep2(){
      this.step2=true;
      this.step1=false;
      this.step3=false;
      getApplayproject({'beforeProjectId':this.beforeProjectId}).then((res)=>{
        this.projectForm=res.retData;
        this.showMap();
       })
      
    },


    goStep3(){
      this.step3=true;
      this.step1=false;
      this.step2=false;
    },

    saveResult(){
       var params = Object.assign({beforeProjectId:this.beforeProjectId}, this.addForm);

      saveProjectResult(params).then((res)=>{
          wx.navigateTo({
            url: '/pages/before/qs/main'
          })
      });

    },

    previewImage: function (e) {
      var _this=this;
      var current = e.target.dataset.src;
      wx.previewImage({
        current: current, // 当前显示图片的http链接  
        urls: _this.fileList // 需要预览的图片http链接列表  
        })
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
      //console.log(this.projectForm.mapJson);
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
          iconPath: "/static/img/view.png", 
          id: i+1,
          latitude:this.pointarray[i].latitude,
          longitude: this.pointarray[i].longitude,
          width:40,
          height:40
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
      this.addForm={};
      this.fileList=[];
  },

  onShow() {
    let query=this.$root.$mp.query;
    this.beforeProjectId=query.beforeProjectId;
     this.goStep1();

  },



}

</script>

<style scoped>
  .controls{
    position: relative;
    top: 85%;
    height: 120px;
    display: block;
    text-align: center;

  }
  .circle{
    width: 50px;
    height: 50px;
    border: 0 solid #ffffff;
    border-radius: 450px;
    box-shadow: 4px 1px 1px #cccccc;

  }


  .play{
    flex: 1;
    height: 100px;
    width:150px;
    display: inline-block;
}


</style>
