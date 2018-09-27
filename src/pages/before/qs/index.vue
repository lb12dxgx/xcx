<template>
  
  <div >
   <div class="js">
    <div class="weui-navbar">
        <div @click="goStep1()" class="weui-navbar__item" :class="step1 ?'weui-bar__item_on' : '' ">
             待反馈
        </div>
        <div @click="goStep2()" class="weui-navbar__item" :class="step2 ?'weui-bar__item_on' : '' ">
             已反馈 
        </div>
        <div @click="goStep3()" class="weui-navbar__item" :class="step3 ?'weui-bar__item_on' : '' ">
              挖据申请
        </div>
    </div>

    <div class="step1" v-if="step1">
      <div class="weui-media-box weui-media-box_text" @click="viewProject()">
        <h4 class="weui-media-box__title">工程名称1</h4>
        <p class="weui-media-box__desc">
          工程地点：北京市海淀区中关村南大街4号
        </p>
         <p class="weui-media-box__desc">
         工程起止点：农科院北门100米到300米。
        </p>
         <p class="weui-media-box__desc">
         工程时间：2018-09-27  工程类别：水利维修 
        </p>
         <p class="weui-media-box__desc">
          联系人：张三 联系电话：1372006345
        </p>
      </div>
      <div class="weui-media-box weui-media-box_text">
        <h4 class="weui-media-box__title">工程名称2</h4>
        <p class="weui-media-box__desc">
          工程地点：北京市海淀区中关村南大街4号
        </p>
         <p class="weui-media-box__desc">
         工程起止点：农科院北门100米到300米。
        </p>
         <p class="weui-media-box__desc">
         工程时间：2018-09-27  工程类别：水利维修 
        </p>
         <p class="weui-media-box__desc">
          联系人：张三 联系电话：1372006345
        </p>
      </div>
      <div class="weui-media-box weui-media-box_text">
        <h4 class="weui-media-box__title">工程名称3</h4>
        <p class="weui-media-box__desc">
          工程地点：北京市海淀区中关村南大街4号
        </p>
         <p class="weui-media-box__desc">
         工程起止点：农科院北门100米到300米。
        </p>
         <p class="weui-media-box__desc">
         工程时间：2018-09-27  工程类别：水利维修 
        </p>
         <p class="weui-media-box__desc">
          联系人：张三 联系电话：1372006345
        </p>
      </div>
      <div class="weui-media-box weui-media-box_text">
        <h4 class="weui-media-box__title">工程名称4</h4>
        <p class="weui-media-box__desc">
          工程地点：北京市海淀区中关村南大街4号
        </p>
         <p class="weui-media-box__desc">
         工程起止点：农科院北门100米到300米。
        </p>
         <p class="weui-media-box__desc">
         工程时间：2018-09-27  工程类别：水利维修 
        </p>
         <p class="weui-media-box__desc">
          联系人：张三 联系电话：1372006345
        </p>
      </div>
      <div class="weui-panel__ft">
                <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
                    <div class="weui-cell__bd">查看更多</div>
                    <span class="weui-cell__ft"></span>
                </a>    
    </div>
    </div>

    <div class="step3" v-if="step3">
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

            <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:70%;margin-top:20px" @click="showMap" >下一步</a> 

        </div>

          <div class="projectMap" v-if="ismap">

            <map id="map" :longitude="centpoint.longitude" :latitude="centpoint.latitude" scale="17"   :markers="markers"  :polyline="polyline"  show-location style="width: 100%; height: 70vh;"
            >
            </map>
              <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:40%;margin-top:20px" @click="setMyPoint">标注位置</a> 
              <a  class="weui-btn weui-btn_min weui-btn_primary" style="width:40%;margin-top:20px" @click="saveMyPoint">返回</a> 
          </div>

      </div>

    </div>


   </div>   

  </div>
 

</template>

<script>

import {getAddressByMap} from '../../../api/api';

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


    viewProject(){

       wx.navigateTo({
            url: '/pages/project/handle/main'
      })

    }

    

   
    
 },

  onLoad() {
    var _this=this;
    

   
      

  },



}

</script>

<style scoped>
  .step1{
    margin-top:50px;
    background-color: #FFF;

  }


</style>
