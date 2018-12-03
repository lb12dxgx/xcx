<template>
  
<div class="frome-box">
  <div class="tab-list">
        <ul>
          <li style="width:48%">
            <a   :class="step1 ?'link-on' : 'link-none' " @click="goStep1">事故上报</a>
          </li>
           <li style="width:48%">
            <a   :class="step2 ?'link-on' : 'link-none' " @click="goStep2">我的事故</a>
          </li>
        </ul>  
  </div>
  <div class="clear"></div>
  <div v-if="step1" class="frome-content">
    <div class="text-box ">
      <input  type="text" v-model="addForm.accidentName"/>
      <label class="lablefocus">事故名称</label>
    </div>
    <div class="text-box ">
      <input  type="text" v-model="addForm.accidentPlace" />
      <label class="lablefocus">事故地点</label>
    </div>
    <div class="text-box ">
      <picker mode="date" :value="addForm.accidentDate"  @change="dateChange">  <input  type="text" v-model="addForm.accidentDate" disabled="true"/>
      </picker>
      <label class="lablefocus">事故时间</label>
    </div>
    <div class="text-box ">
      <textarea   v-model="addForm.accidentDesc" />
      <label class="lablefocus">事故描述</label>
    </div>
    <div class="weui-uploader__bd th-backwhite clearfix" v-if="files.length!=0">
      <div class="weui-cells__title"  >事故图片</div>
      <div class="weui-uploader__files" id="uploaderFiles">
        <block v-for="(item,index) in files" :key="index">
          <div class="weui-uploader__file posi-rela" @click="predivImage" :id="item">
            <icon type="cancel" size="20" class="th-icon-cancel" @click.stop="deletImg(index,item.fileInfoId)"/>
                <image class="weui-uploader__file" :src="item.webPath" mode="aspectFill" />
          </div>
        </block>
      </div>
    </div>

    <div class="weui-cells__title" v-if="viedoFiles.length!=0">事故视频</div>
    <div class="weui-uploader__files">
         <block v-for="(item,index) in viedoFiles" :key="index">
              <video   :src="item.webPath" controls />
              <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin:20px" @click="delVideo(index,item.fileInfoId)" >删除</a> 
          </block>
     </div>

    <div class="weui-cells__title">现场情况</div>
    <div class="weui-cells ">
      <a  class="weui-cell weui-cell_access" @click="chooseImage()">
        <div class="weui-cell__bd">
           <p>照片</p>
         </div>
        <div class="weui-cell__ft">
        </div>
      </a>
      <a  class="weui-cell weui-cell_access" @click="chooseVideo()">
         <div class="weui-cell__bd">
           <p>视频</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </a>
    </div>
      <input type="button" value="提交" class="tj-btn" @click="save()">
 </div>
 <div v-if="step2">
   <div>
    <div class="liebiao-box" v-for="(item,index) in list" :key="index">
      <a  @click="handle(item.accidentInfoId)">
         <p class="gcmc-text">{{item.accidentName}}</p>
         <ul class="list-box-xx">
           <li class="left-box left">事故地点</li>
           <li class="right-box right">{{item.accidentPlace}}</li>
         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">事故时间</li>
           <li class="right-box right">{{item.accidentDate}}</li>
         </ul>
         <ul class="list-box-xx">
           <li class="left-box left">是否采用</li>
           <li class="right-box right">{{stateMap[item.state]}}</li>
         </ul>
      </a>
    </div>
  </div>
</div>
  
</div>

  </template>

<script>


import {addAccidentinfo,saveAccidentinfo,deleteFile,url,accidentinfoList} from '../../../api/api';


export default {
  data () {
    return {
      step1:true,
      step2:false,
      list:[],
      files: [],
      viedoFiles:[],
      addForm:{
        accidentPicId:'',
        accidentVideoId:'',
        openid:'',
        accidentName:'',
        accidentDesc:'',
        accidentPlace:'',
        accidentDate:''
       },

       stateMap:{
          0:'待采用',
          1:'已采用',
          2:'不采用 '
       },
    }
     
  },


  methods: {

    goStep1(){
      this.step1=true;
      this.step2=false;
      this.files=[];
      this.viedoFiles=[];
      this.addForm={
        accidentPicId:'',
        accidentVideoId:'',
        openid:'',
        accidentName:'',
        accidentDesc:'',
        accidentPlace:'',
        accidentDate:''
       };
      addAccidentinfo().then((res)=>{
        this.addForm.accidentPicId=res.retData.accidentPicId;
        this.addForm.accidentVideoId=res.retData.accidentVideoId;
        this.addForm.openid=wx.getStorageSync('openid');
      });
    },

    goStep2(){
      this.step1=false;
      this.step2=true;
      accidentinfoList().then((res)=>{
        this.list=res.retData;
      });
    },
    dateChange: function (e) {
      this.addForm.accidentDate=e.mp.detail.value;
    },

    chooseImage(e) {
      var _this = this;
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
        wx.uploadFile({
            url: url+'/xcx/accidentinfo/uploadImg.xcx', //仅为示例，非真实的接口地址
            filePath: res.tempFilePaths[0],
            name: 'file',
            formData:{
              'openIdMd5': _this.addForm.openid,
              'accidentPicId':_this.addForm.accidentPicId
            },
            success: function(res){
             var fileArray=JSON.parse(res.data);
             var fileJsonArray=[];
             for(var file of fileArray.retData){
                var fileJson={};
                fileJson.webPath=url+"/"+file.fileWebPath
                fileJson.fileInfoId=file.fileInfoId
                fileJsonArray.push(fileJson);
                
            }

              _this.files=fileJsonArray;
            }
        })

          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
         // _this.files = _this.files.concat(res.tempFilePaths)



        },
        fail: function () {
          console.log('fail');
        },
        complete: function () {
          console.log('commplete');
        }
      })
    },
    predivImage(e) {
      console.log(e);
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      })
    },
    deletImg(index,fileInfoId){
     deleteFile({'fileInfoId':fileInfoId,'openIdMd5':this.addForm.openid}).then((res)=>{
              var fileJsonArray=[];
             for(var file of res.retData){
                var fileJson={};
                fileJson.webPath=url+"/"+file.fileWebPath
                fileJson.fileInfoId=file.fileInfoId
                fileJsonArray.push(fileJson);
              }
          this.files=fileJsonArray;
     })
      
    },

     chooseVideo(e) {
      var _this = this;

      wx.chooseVideo({
        sourceType: ['album','camera'],
        maxDuration: 60,
        camera: 'back',
        success(res) {

          wx.uploadFile({
            url: url+'/xcx/accidentinfo/uploadVideo.xcx', //仅为示例，非真实的接口地址
            filePath: res.tempFilePath,
            name: 'file',
            formData:{
              'openIdMd5': _this.addForm.openid,
              'accidentVideoId':_this.addForm.accidentVideoId
            },
            success: function(res){
             var fileArray=JSON.parse(res.data);
             var fileJsonArray=[];
             for(var file of fileArray.retData){
                var fileJson={};
                fileJson.webPath=url+"/"+file.fileWebPath
                fileJson.fileInfoId=file.fileInfoId
                fileJsonArray.push(fileJson);
             }
              _this.viedoFiles=fileJsonArray;
            }
          })
          
          
        }
      });
    },

    delVideo(index,fileInfoId){
      deleteFile({'fileInfoId':fileInfoId,'openIdMd5':this.addForm.openid}).then((res)=>{
         var fileJsonArray=[];
             for(var file of res.retData){
                var fileJson={};
                fileJson.webPath=url+"/"+file.fileWebPath
                fileJson.fileInfoId=file.fileInfoId
                fileJsonArray.push(fileJson);
              }
          this.viedoFiles=fileJsonArray;

     })
       
    },

    handle(accidentInfoId){
     wx.navigateTo({
            url: '/pages/accidentinfo/view/main?accidentInfoId='+accidentInfoId
      })

    },

    save(){
      if(this.addForm.accidentName==''){
          wx.showToast({
            title: '请填写事故名称',
            duration: 2000
          });
          return false;
       };

       if(this.addForm.accidentPlace==''){
          wx.showToast({
            title: '请填写事故地点',
            duration: 2000
          });
          return false;
       };


       if(this.addForm.accidentDate==''){
          wx.showToast({
            title: '请填写事故时间',
            duration: 2000
          });
          return false;
       };

       if(this.addForm.accidentDesc==''){
          wx.showToast({
            title: '请填写事故描述',
            duration: 2000
          });
          return false;
       };

      saveAccidentinfo(this.addForm).then((res)=>{
          this.addForm={};
          this.goStep2();
      })
     
    }




    
  },

  onReachBottom() {
   console.log("adddd");
},

 

  onLoad() {
    this.goStep1();
   }
}

</script>

<style scoped>
  


</style>
