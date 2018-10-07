<template>
   <div class="text-box ">
        <input  type="text" @focus="handlefocus()" @blur="handleblur()" :class="inputClass" v-bind:value="value"
      			v-on:input="handleinput"/>
            {{typeof(value)}}
        <label :class="labelClass">{{labelName}}</label>
        
        <slot></slot> 
    </div>
</template>

<script>
export default {
 	name: 'formitem',
    props: {
     labelName:String,
     value:{type:String},
     itemName:String
    },


 data () {
    return {
      inputClass:'',
      labelClass:'',
      inputVal:'', 

    }
  },

  

  methods: {
  	 handleinput(event){
  	 	this.inputVal=event.target.value;
  	 	this.$emit('inputvalue', {name:this.itemName,value:this.inputVal}); 
    },

    handlefocus(){
    	console.log("focus");
    	this.inputClass="inputfocus";
    	this.labelClass="lablefocus";
    },

     handleblur(){
     	console.log("blur=="+this.inputVal);
    	this.inputClass="";
    	if(this.inputVal==""){
    		this.labelClass="";
    	}else{
    		this.labelClass="lablefocus";
    	}	
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
