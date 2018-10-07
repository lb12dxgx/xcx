<template>
  <div class="frome-box" >
    <formitem labelName="城市名称" itemName="cityName" @inputvalue="setFormValue" >
      
       
     
    </formitem>
    <formitem labelName="申请单位" itemName="company" @inputvalue="setFormValue">
       <a href="#" class="biaozhu-btn">标注</a>
    </formitem>
  </div>
      
</template>

<script>
import formitem from '../../../components/formitem.vue';

export default {
  components: {
      formitem
  }, 

  data () {
    return { 
      
      addForm:{
        cityName:'',
        company:'',

      }
      

    }
  },

  

  methods: {
    setFormValue(formJson){
      this.addForm[formJson.name]=formJson.value;
      console.log("cityName=="+this.addForm.cityName);
      console.log("company=="+this.addForm.company);
    }
    
   },

  created () {
    // 调用应用实例的方法获取全局数据
    
  }
}
</script>

<style scoped>
swiper{
  height: 165px;
}

</style>