<template>
  <div id="my-app">
    <Buttons></Buttons>
    <VizualizeGrid :Rows="11" :Cols="31"></VizualizeGrid>
  </div>
</template>

<script>
import Buttons from "./components/Buttons";
import VizualizeGrid from "./components/VizualizeGrid";

export default {
  components: {
    Buttons: Buttons,
    VizualizeGrid: VizualizeGrid
  },
  data() {
    return {};
  }
};
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
