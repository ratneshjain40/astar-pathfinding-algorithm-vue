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

export default {
  props: {
    Rows          : Number,
    Cols          : Number,
    ButtonStatus  : Object,
  },
  data(){
    return {
    }
  },
  methods:{
    ToggleClick:function(event){
      if(this.ButtonStatus.isStartBtn){
        console.log("Start",event.target.id);
      }
      else if(this.ButtonStatus.isEndBtn){
        console.log("End",event.target.id);
      }
    },
    SetId:function(row,col){
      return row-1+'-'+Number(Number(col)-1);
    }
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
</style>
