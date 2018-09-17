<template>
  
  <div>
    <div class="my">
     
       <div class="weui-cells weui-cells_form" >
         <div class="weui-cell  ">
                    <div class="weui-cell__hd">
                        <label class="weui-label" :class="error_personName">事故名称</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input "   placeholder="请输入事故名称" v-model="addForm.personName">
                    </div>
                    
        </div>
        <div class="weui-cell ">
              <div class="weui-cell__hd">
                  <label class="weui-label " :class="error_userCode" >事故地点</label>
              </div>
              <div class="weui-cell__bd">
                  <input class="weui-input" placeholder="事故地点" v-model="addForm.userCode">
              </div>
             
        </div>
      
         <div class="weui-cell ">
              <div class="weui-cell__hd">
                  <label class="weui-label">事故时间</label>
              </div>
              <div class="weui-cell__bd">
                 <input class="weui-input"   placeholder="请输入事故时间" v-model="addForm.enterpriseName">
              </div>
              
         </div>
         <div class="weui-cell ">
              <div class="weui-cell__hd">
                  <label class="weui-label">事故描述</label>
              </div>
             
              
         </div>
          <div class="weui-cell ">
             
              <div class="weui-cell__bd">
               <textarea class="weui-textarea" placeholder="请输入事故描述" rows="1" style="height:100px"></textarea>
              </div>
              
         </div>

        <div class="weui-cell ">
              <div class="weui-cell__hd">
                  <label class="weui-label">事故图片</label>
              </div>
        </div>
       <div class="weui-uploader__bd th-backwhite clearfix">
        <div class="weui-uploader__files" id="uploaderFiles">
          <block v-for="(item,index) in files" :key="index">
            <div class="weui-uploader__file posi-rela" @click="predivImage" :id="item">
              <icon type="cancel" size="20" class="th-icon-cancel" @click.stop="deletImg(index,item.fileInfoId)"/>
              <image class="weui-uploader__file" :src="item.webPath" mode="aspectFill" />
            </div>
          </block>
        </div>
        <div class="weui-uploader__input-box">
          <div class="weui-uploader__input" @click="chooseImage"></div>
        </div>
     </div>

     <div class="weui-cell ">
              <div class="weui-cell__hd">
                  <label class="weui-label">事故视频</label>
              </div>
        </div>
       <div class="weui-uploader__bd th-backwhite clearfix">
       
         <block v-for="(item,index) in viedoFiles" :key="index">
            <video   :src="item.webPath" controls />
            <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin:20px" @click="delVideo(index,item.fileInfoId)" >删除</a> 
        </block>
        
        <div class="weui-uploader__input-box">
          <div class="weui-uploader__input" @click="chooseVideo"></div>
        </div>
     </div>

   </div>
       

     
           
      <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="savePerson" >保存</a> 
      
     
     </div>

   
 </div>
 

</template>

<script>


import {addAccidentinfo,saveAccidentinfo,deleteFile,url} from '../../api/api';


export default {
  data () {
    return {
       files: [],
       viedoFiles:[],
      
       addForm:{
         accidentPicId:'',
         accidentVideoId:'',
         openid:''
       }
    }
     
  },


  methods: {

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
      this.files.splice(index,1);
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
             var file=JSON.parse(res.data);
              var fileJson={};
              fileJson.webPath=url+"/"+file.retData.fileWebPath
              fileJson.fileInfoId=file.retData.fileInfoId
              _this.viedoFiles = _this.viedoFiles.concat(fileJson);
            }
          })
          
          
        }
      });
    },

    delVideo(index,fileInfoId){
      deleteFile({'fileInfoId':fileInfoId,'openIdMd5':this.addForm.openid}).then((res)=>{
        this.viedoFiles.splice(index,1)
     })
       
    }




    
  },

  onShow() {
    addAccidentinfo() .then((res)=>{
        this.addForm.accidentPicId=res.retData.accidentPicId;
        this.addForm.accidentVideoId=res.retData.accidentVideoId;
         this.addForm.openid=wx.getStorageSync('openid');
      })
   }
}

</script>

<style scoped>
  .my{
    margin-top:5px;
    text-align: center;
   
  }
  .my-head{
     background-color: #fff;
  }
  .my img{
    width: 100px;
    height: 100px;
    border-radius:50%;
    -webkit-border-radius:50%;
    -moz-border-radius:50%
   }
  .my .my-name{
    font-size: 16px;
    margin: 0px 10px;
    padding:10px 10px;
  /*  border-bottom:1px solid #ccc;*/
  }
  .my-reg{
    margin-top:10px; 
    background-color: #fff;
  }


  .th-icon-cancel{
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  right: -14rpx;
  top: -14rpx;
}
.weui-uploader__input-box{
  margin-right: 0;
}
.weui-uploader__bd{
  margin-bottom: 0;
}
.posi-rela{
  position: relative;
  overflow: visible;
}
.weui-uploader__file:nth-child(4n){
  margin-right: 0;
}
.th-backwhite{
  width: 750rpx;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom:4rpx solid #f5f5f5;
}
/* 绿色贯穿按钮 */
.th-submit-btn{
  width: 690rpx;
  height: 90rpx;
  line-height: 90rpx;
  background-color: #18c136;
  margin: 50rpx auto;
  color: #fff;
  font-size: 34rpx;
  text-align: center;
  border-radius: 6rpx;
}


</style>
