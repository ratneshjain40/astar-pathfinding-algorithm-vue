<template>
  <div id="my-app">
    <Buttons></Buttons>
    <Grid :Rows = "11" :Cols = "31"></Grid>
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
