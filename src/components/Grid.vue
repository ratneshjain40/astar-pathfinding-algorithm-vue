<template>
  <div class="main-block">
    <div class="grid" >
      <div class="row" v-for="row in Rows" :key="row" >
        <div class='box' v-for="col in Cols" :key="col"><div class='inner' :id="SetId(row,col)" v-on:click = "ToggleClick"></div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ButtonBus } from "../main";

export default {
  props: {
    Rows          : Number,
    Cols          : Number,
  },
  data(){
    return {
      ButtonBusData:{},
      DivStates:{ 
        Start : undefined,
        End : undefined
      }
    }
  },
  methods:{

    SetId:function(row,col){
      return row-1+'-'+Number(Number(col)-1);
    },

    ToggleClick:function(event){
      if(this.ButtonBusData.isStartBtn){
        console.log("Start",event.target.id);
        this.ToggleStartClass(event);
        
      }
      else if(this.ButtonBusData.isEndBtn){
        console.log("End",event.target.id);
        this.ToggleEndClass(event);
      }
    },

    ToggleStartClass:function(event){
      let previous = this.DivStates.Start;
      if(!(typeof (previous) == 'undefined')){
          previous.target.classList.toggle('Start');
        }
        this.DivStates.Start = event
        event.target.classList.toggle('Start');
    },

    ToggleEndClass:function(event){
      let previous = this.DivStates.End;
      if(!(typeof (previous) == 'undefined')){
          previous.target.classList.toggle('End');
        }
        this.DivStates.End = event
        event.target.classList.toggle('End');
    }
    
    
  },
  created(){
    ButtonBus.$on('ChangedButtonStatus',(data)=>{
      this.ButtonBusData = data;
    })
  }
}
</script>

<style>
.main-block {
  display: block;
  width: 95%;
  margin: 4% auto 0;
}

.grid {
  margin: 0px auto;
  border-top: 1px solid rgba(0, 0, 0, 0.6);
  border-left: 1px solid rgba(0, 0, 0, 0.6);
  width: 90vw;
  height: auto;
  max-height: 40vw;
  font-size: 1rem;
}

.row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.box {
  background: rgba(110, 110, 110, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.6);
  border-right: 1px solid rgba(0, 0, 0, 0.6);
  color: black;
  font-weight: bold;
  -webkit-box-flex: 1;
      -ms-flex: 1 0 auto;
          flex: 1 0 auto;
  position: relative;
}

.box:after {
  content: "";
  float: left;
  display: block;
  padding-top: 100%;
}

.box:hover {
  background: rgba(110, 110, 110, 0.3);
}

.box .inner {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}

.Empty {
  background: rgb(255, 255, 255);
}

.Start {
  background: rgb(82, 73, 68);
}

.End {
  background: rgb(221, 169, 142);
}
</style>
