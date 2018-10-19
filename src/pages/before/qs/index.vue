<template>
  
   <div class="frome-box">
    <div class="tab-list">
      <ul>
         <li>
          <a :class="step1class" @click="goStep1">待反馈</a>
        </li>
         <li>
          <a   :class="step2class" @click="goStep2">已反馈</a>
        </li>
        <li>
          <a   :class="step3class" @click="goStep3">挖掘申请</a>
        </li>
      </ul>
    </div>
   <div class="clear"></div>
    <div v-if="step1">
      <div>
        <div class="weui-cells ">
          <a  class="weui-cell weui-cell_access" @click="showArea()">
                <div class="weui-cell__bd">
                    <p>关注地区</p>
                </div>
                <div class="weui-cell__ft">
                </div>
          </a>
      </div>  
      <div class="liebiao-box" v-for="(item,index) in list" :key="index">
       <a  @click="handleProject(item.beforeProjectId)">
         <p class="gcmc-text">{{item.projectName}}</p>
         <ul class="list-box-xx">
           <li class="left-box left">工程地点</li>
           <li class="right-box right">{{item.projectAddren}}</li>

         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">工程起止点</li>
           <li class="right-box right">{{item.projectStartEnd}}</li>

         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">工程时间</li>
           <li class="right-box right">{{item.projectStartDate}}</li>

         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">工程类别</li>
           <li class="right-box right">{{item.projectStartDate}}</li>

         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">联系人</li>
           <li class="right-box right">{{item.personName}}</li>

         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">联系电话</li>
           <li class="right-box right">{{item.telePhone}}</li>
         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">已回复</li>
           <li class="right-box right">{{item.num}}</li>
         </ul>
       </a>
        </div>
      </div>
    </div>

    <div v-if="step2">
    <div>
      <div class="liebiao-box" v-for="(item,index) in list" :key="index">
       <a  @click="viewProject(item.beforeProjectId)">
         <p class="gcmc-text">{{item.projectName}}</p>
         <ul class="list-box-xx">
           <li class="left-box left">工程地点</li>
           <li class="right-box right">{{item.projectAddren}}</li>

         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">工程起止点</li>
           <li class="right-box right">{{item.projectStartEnd}}</li>

         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">工程时间</li>
           <li class="right-box right">{{item.projectStartDate}}</li>

         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">工程类别</li>
           <li class="right-box right">{{item.projectStartDate}}</li>

         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">联系人</li>
           <li class="right-box right">{{item.personName}}</li>

         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">联系电话</li>
           <li class="right-box right">{{item.telePhone}}</li>
         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">已回复</li>
           <li class="right-box right">{{item.num}}</li>
         </ul>
       </a>
      </div>
    </div>
  </div>
   


  <div v-if="step3">
    <div>
        <div class="projectDesc" v-if="!ismap">
        <div class="frome-content">
          <div class="text-box ">
            <input  type="text" v-model="addForm.projectName"/>
            <label class="lablefocus">工程名称</label>
           </div>
          
           <div class="text-box ">
             <picker mode="selector"  :range="typeArray" @change="typeChange"> 
              <input  type="text" v-model="addForm.projectType" disabled="true"/>
              <label class="lablefocus">工程类别</label>
             </picker>
           </div>
           <div class="text-box ">
             <picker mode="date"  @change="dateChange"> 
              <input  type="text" v-model="addForm.projectStartDate" disabled="true"/>
              <label class="lablefocus">施工时间</label>
             </picker>
           </div>
            <div class="text-box ">
              <input  type="text" v-model="addForm.projectAddren" />
              <label class="lablefocus">工程地点</label>
              
           </div>
           <div class="text-box ">
              <input  type="text" v-model="addForm.projectStartEnd" />
              <label class="lablefocus">工程起止点</label>
           </div>

           <div class="weui-uploader__bd th-backwhite clearfix">
            <div class="weui-uploader__files" id="uploaderFiles">
              <block v-for="(item,index) in files" :key="index">
                <div class="weui-uploader__file posi-rela" :id="item">
                  <icon type="cancel" size="20" class="th-icon-cancel" @click.stop="deletImg(index,item.fileInfoId)"/>
                  <image class="weui-uploader__file" :src="item.webPath" mode="aspectFill" />
                </div>
              </block>
            </div>
            
        </div>

           <div class="weui-cells__title">现场情况</div>
            <div class="weui-cells ">
              <a  class="weui-cell weui-cell_access" @click="showMap()">
                <div class="weui-cell__bd">
                    <p>标注</p>
                </div>
                <div class="weui-cell__ft">
                </div>
              </a>
              <a  class="weui-cell weui-cell_access" @click="chooseImage">
                <div class="weui-cell__bd">
                    <p>拍照</p>
                </div>
                <div class="weui-cell__ft">
                </div>
              </a>
            </div>

        
            
            <input type="button" value="提交申请" class="tj-btn" @click="save">
        </div>
      </div>
      <div class="projectMap" v-if="ismap">
          <map id="map" :longitude="centpoint.longitude" 
           :latitude="centpoint.latitude" scale="17"   :markers="markers"  :polyline="polyline"   
           style="width: 100%; height: 100vh;" 
           @regionchange="regionchange"  @end="regionchange" 
           @begin="regionchange" 
            >

            <cover-view class="controls">
              <cover-view class="play">
                <button type="primary" class="circle"  @click="setMyPoint"> 标注 </button>
              </cover-view>
              <cover-view class="play"  >
                <button type="warn"    @click="saveMyPoint"> 保存 </button>
              </cover-view>
              <cover-view class="play">
                <button type="primary" class="circle" @click="delMyPoint" > 删除 </button>
              </cover-view>
           </cover-view>
            </map>
              <!--  <input type="button" value="标注位置" class="tj-btn" @click="setMyPoint" >
               <input type="button" value="保存" class="tj-btn" @click="saveMyPoint" > -->
             
      </div>
    </div>
  </div>

 


  </div>

 

</template>

<script>

import formitem from '../../../components/formitem.vue';
import formitemedit from '../../../components/formitemedit.vue';

import {getAddressByMap,applayprojectListByCityId,applayprojectListFinshByOpenId,saveApplayproject,addApplayproject,deleteFile,url} from '../../../api/api';

export default {

  components: {
      formitem,
      formitemedit
  }, 

  data () {
     return {

        step1:true,
        step1class:'link-on',
        step2:false,
        step2class:'link-none',
        step3:true,
        step3class:'link-none',
        ismap:false,
        typeArray:['水利工程', '燃气工程', '交通工程', '通讯工程', '其他工程'],
        type:"",
        list:[],
        addForm:{
        projectName:'',
        projectType:'',
        projectStartDate:'',
        projectAddren:'',
        projectStartEnd:'',
        picId:'',
        mapJson:''
        },
        controls:[
        {
          id:1,
          position:{left:10,top:0},
          iconPath:'../../../static/img/err.png',
          clickable:true

        }
        ],
        centpoint:{
          longitude:'',
          latitude:'',
        },
        centmarker:{
          iconPath: "/static/img/dw.png", 
          id: 0,
          latitude: 23.099994,
          longitude: 113.324520,
          width: 30,
          height: 30
        },
        pointarray:[],
        markers: [],
        polyline: [],
        files: [],
  }
   
   },
     
 


  methods: {
   
    typeChange : function (e) {
        this.addForm.projectType=this.typeArray[e.mp.detail.value];
    },
    dateChange: function (e) {
        this.addForm.projectStartDate=e.mp.detail.value;
    },

    goStep1(){
      this.step1=true;
      this.step2=false;
      this.step3=false;
      this.step1class='link-on';
      this.step2class='link-none';
      this.step3class='link-none';
      applayprojectListByCityId().then((res)=>{
        this.list=res.retData;
        
      });
    },

    goStep2(){
      this.step2=true;
      this.step1=false;
      this.step3=false;
      this.step1class='link-none';
      this.step2class='link-on';
      this.step3class='link-none';
      applayprojectListFinshByOpenId().then((res)=>{
        this.list=res.retData;
        
      });
    },

    goStep3(){
      this.step2=false;
      this.step1=false;
      this.step3=true;
      this.step1class='link-none';
      this.step2class='link-none';
      this.step3class='link-on';
      addApplayproject() .then((res)=>{
        this.addForm.picId=res.retData.picId;
        this.addForm.openid=wx.getStorageSync('openid');
       })

      
    },

    showArea(){
      
    }

    viewProject(beforeProjectId){
       wx.navigateTo({
            url: '/pages/project/view/main?beforeProjectId='+beforeProjectId
      })
    },

    handleProject(beforeProjectId){
       wx.navigateTo({
            url: '/pages/project/handle/main?beforeProjectId='+beforeProjectId
      })
    },

    chooseImage(e) {
      var _this = this;
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
        wx.uploadFile({
            url: url+'/xcx/before/applayproject/uploadImg.xcx', //仅为示例，非真实的接口地址
            filePath: res.tempFilePaths[0],
            name: 'file',
            formData:{
              'openIdMd5': wx.getStorageSync('openid'),
              'picId':_this.addForm.picId
            },
            success: function(res){
             var file=JSON.parse(res.data);
              var fileJson={};
              fileJson.webPath=url+"/"+file.retData.fileWebPath
              fileJson.fileInfoId=file.retData.fileInfoId
              _this.files = _this.files.concat(fileJson);
            }
        })

          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
         // _this.files = _this.files.concat(res.tempFilePaths)



        },
        fail: function () {
         
        },
        complete: function () {
         
        }
      })
    },
    predivImage(e) {
     
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      })
    },
    deletImg(index,fileInfoId){
     deleteFile({'fileInfoId':fileInfoId,'openIdMd5':this.addForm.openid}).then((res)=>{
        var retfileArray=res.retData;
        var fileArray=[];       
        for(file of retfileArray){
          var fileJson={};
          fileJson.webPath=url+"/"+file.retData.fileWebPath;
          fileJson.fileInfoId=file.retData.fileInfoId;
         fileArray.push(fileJson);
        }
        this.files=fileArray;
        
      })
    },

    getLocation(){

    var _this=this;
    

    wx.getSetting({
      success(res) {
       if (!res['scope.userLocation']||!res['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation', 
            success(res) {
              
            },
            fail(r) { },
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
          _this.centmarker.latitude = res.latitude;
          _this.centmarker.longitude = res.longitude;
          _this.markers.push(_this.centmarker);
          
        },
        fail(re){
          
        }
      });
    },

    showMap(){
      this.ismap=true;
      this.pointarray=[];
      this.markers=[];
      this.polyline=[];
      this.getLocation();
    },

    setMyPoint(){
      var _this=this;
      var mapCtx = wx.createMapContext("map");
      mapCtx.getCenterLocation({
      type: 'gcj02', 
        success(res) {
           var point={};
           point.latitude = res.latitude;
           point.longitude = res.longitude;
          
           _this.addPoint(point);
         },
        fail(re){
          
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

    addPoint(point){
       
          this.markers[0].latitude=point.latitude;
         this.markers[0].longitude=point.longitude+0.0005;
         this.centpoint.latitude=point.latitude;
         this.centpoint.longitude=point.longitude+0.0005;

       this.pointarray.push(point);
        this.polyline= [{
            points: this.pointarray,
            color:"#FF0000DD",
            width: 2,
            dottedLine: true
        }];
      
          var marker={
          iconPath: "/static/img/view.png", 
          id: this.pointarray.length+1,
          latitude:point.latitude,
          longitude: point.longitude,
          width:30,
          height:30
        };


        this.markers.push(marker);

       
       
       
    },
    save(){
        if(this.addForm.projectName==''){
          wx.showToast({
            title: '请填写工程名称',
            duration: 2000
          });
          return false;
       };

       if(this.addForm.projectType==''){
          wx.showToast({
            title: '请选择工程类别',
            duration: 2000
          });
          return false;
       };

       if(this.addForm.projectStartDate==''){
          wx.showToast({
            title: '请选择施工时间',
            duration: 2000
          });
          return false;
       };

       if(this.addForm.projectAddren==''){
          wx.showToast({
            title: '请选择工程地点',
            duration: 2000
          });
          return false;
       };

        if(this.addForm.projectStartEnd==''){
          wx.showToast({
            title: '请填写工程起止点',
            duration: 2000
          });
          return false;
       };
        var jsonStr=JSON.stringify(this.pointarray);
        this.addForm.mapJson=jsonStr;
        saveApplayproject(this.addForm).then((res)=>{
          this.addForm={};
          this.files=[];
          this.goStep2();
        })
        
    },

    delMyPoint(){
      this.pointarray=[];
      this.markers.splice(1,this.markers.length-1)
      this.polyline=[];
    },

    regionchange(e){
      var _this=this;
    
  
  if(e.type == 'end'){
          var mapCtx = wx.createMapContext("map");
          mapCtx.getCenterLocation({
            success: function(res){
              
             mapCtx.translateMarker({
                markerId:0,
                destination:{latitude:res.latitude,longitude:res.longitude},
                autoRotate:true,
                rotate:0,
                success:function(){
                 
                }
              })
             
             
              
             /* var marker={
                iconPath: "/static/images/timg.jpg", 
                id: 0,
                latitude: 23.099994,
                longitude: 113.324520,
                width: 50,
                height: 50
              };
              marker.latitude= res.latitude;
              marker.longitude= res.longitude;
              _this.markers.push(marker);*/
             
        }})


      }

      if(e.type == 'begin'){
      
        
      }
 },

 

   
    
 },

  onUnload(){
      this.step1=true;
      this.step2=false;
      this.step3=false;
      this.step1class='link-on';
      this.step2class='link-none';
      this.step3class='link-none';
      this.ismap=false;
      this.addForm={
        projectName:'',
        projectType:'',
        projectStartDate:'',
        projectAddren:'',
        projectStartEnd:'',
        picId:'',
        mapJson:''
        };
  },

  onLoad() {
     this.goStep1();
  },



}

</script>

<style scoped>
  .step1{
    margin-top:50px;

  }
  .controls{
    position: relative;
    top: 82%;
    height: 120px;
    display: block;
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
    width:100px;
    display: inline-block;
}



</style>
