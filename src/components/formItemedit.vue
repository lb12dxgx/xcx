<template>
   <div class="text-box ">
        <input  type="text" @focus="handlefocus()" @blur="handleblur()" :class="inputClass" v-bind:value="value"
      			v-on:input="handleinput"/>
            
        <label class="lablefocus">{{labelName}}</label>
        
        <slot></slot> 
    </div>
</template>

<script>
export default {
 	name: 'formitemedit',
    props: {
     labelName:String,
     value:{type:String},
     itemName:String
    },


 data () {
    return {
      inputClass:'',
    }
  },

  

  methods: {
  	 handleinput(event){
  	 	
  	 	this.$emit('inputvalue', {name:this.itemName,value:this.inputVal}); 
    },

    handlefocus(){
    	
    	this.inputClass="inputfocus";
    	
    },

     handleblur(){
     
    	this.inputClass="";
    	
    },
    
   },

  

   mounted(){
   
   }


}
</script>

<style>
.card {
  padding: 10px;
}
</style>
