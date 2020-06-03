<template>
  <div id="my-app">
    <Buttons :ButtonStatus="ButtonStatus"></Buttons>
    <Grid :Rows = "11" :Cols = "31" :ButtonStatus="ButtonStatus"></Grid>
  </div>
</template>

<script>
import Buttons from './components/Buttons'
import Grid from './components/Grid'

export default {
  components:{
    'Buttons' : Buttons,
    'Grid'    : Grid
  },
  data(){
    return {
      ButtonStatus:{
        isStartBtn      :  false,
        isEndBtn        :  false,
        isWallBtn       :  false,
        isFindPathBtn   :  false
      }
    }
  }
}
</script>

<style>
#my-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
