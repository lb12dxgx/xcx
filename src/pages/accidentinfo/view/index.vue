<template>
  
<div class="frome-box">
   <div  class="frome-content">
    <div class="text-box ">
      <input  type="text" v-model="addForm.accidentName" disabled="true" />
      <label class="lablefocus">事故名称</label>
    </div>
    <div class="text-box ">
      <input  type="text" v-model="addForm.accidentPlace" disabled="true" />
      <label class="lablefocus">事故地点</label>
    </div>
    <div class="text-box ">
      <input  type="text" v-model="addForm.accidentDate" disabled="true"/>
     <label class="lablefocus">事故时间</label>
    </div>
    <div class="text-box ">
      <textarea   v-model="addForm.accidentDesc" disabled="true"/>
      <label class="lablefocus">事故描述</label>
    </div>
    <div class="weui-uploader__bd th-backwhite clearfix" v-if="files.length!=0">
      <div class="weui-cells__title"  >事故图片</div>
      <div class="weui-uploader__files" id="uploaderFiles">
        <block v-for="(item,index) in files" :key="index">
          <div class="weui-uploader__file posi-rela" @click="predivImage" :id="item" :data-url="item.webPath">
            <image class="weui-uploader__file" :src="item.webPath" mode="aspectFill" />
          </div>
        </block>
      </div>
    </div>

    <div class="weui-cells__title" v-if="viedoFiles.length!=0">事故视频</div>
    <div class="weui-uploader__files">
         <block v-for="(item,index) in viedoFiles" :key="index">
              <video   :src="item.webPath" controls />
          </block>
     </div>

    
 </div>
 
  
</div>

  </template>

<script>


import {getAccidentinfo,getFileList,url} from '../../../api/api';


export default {
  data () {
    return {
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

       
    }
     
  },

  methods: {
    predivImage(e) {
      console.log(e);
      var imgUrls=[];
      for(var file of this.files){
        imgUrls.push(file.webPath);
      }
      wx.previewImage({
        current: e.currentTarget.dataset.url, // 当前显示图片的http链接
        urls: imgUrls // 需要预览的图片http链接列表
      })
    },
  },

  onUnload(){
    this.addForm={
        accidentPicId:'',
        accidentVideoId:'',
        openid:'',
        accidentName:'',
        accidentDesc:'',
        accidentPlace:'',
        accidentDate:''
       };
       this.files=[];
       this.viedoFiles=[];
  
  },

 onLoad() {
    let query=this.$root.$mp.query;
    var accidentInfoId=query.accidentInfoId;
    getAccidentinfo({'accidentInfoId':accidentInfoId}).then((res)=>{
      this.addForm=res.retData;
      getFileList({'bussinessId':this.addForm.accidentPicId}).then((res)=>{
          let fileJsonArray=[];
          var arry=[];
             for(var file of res.retData){
                var fileJson={};
                fileJson.webPath=url+"/"+file.fileWebPath
                fileJson.fileInfoId=file.fileInfoId
                arry.push(fileJson);
             }
             this.files=arry
      });

      getFileList({'bussinessId':this.addForm.accidentVideoId}).then((res)=>{
         
         let fileJsonArray=[];
         var arry=[];
             for(var file of res.retData){
                var fileJson={};
                fileJson.webPath=url+"/"+file.fileWebPath
                fileJson.fileInfoId=file.fileInfoId
                arry.push(fileJson);
            }

            this.viedoFiles=arry;

      });
    })
    
   }
}

</script>

<style scoped>
  


</style>
