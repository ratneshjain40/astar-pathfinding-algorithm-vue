<template>
  <div class="main-block">
    <div class="grid">
      <div class="row" v-for="row in Rows" :key="row">
        <div class="box" v-for="col in Cols" :key="col">
          <Node :row="row" :col="col" :NodeData="GetNodeData(row,col)"></Node>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ButtonBus } from "../main";
import Node from "./VizualizeNode";

export default {
  props: {
    Rows: Number,
    Cols: Number
  },
  components: {
    Node: Node
  },
  data() {
    return {
      ButtonBusData: {},
      NodeData:{},
    };
  },
  methods: {

    SetNodeData: function(row, col) {
      console.log("This is setter",row,col)
    },

    GetNodeData: function(row, col) {
      return this.NodeData[row-1][col-1]
    }
  },
  created() {
    ButtonBus.$on("ChangedButtonStatus", data => {
      this.ButtonBusData = data;
    });

    class VizualizeNode {
      constructor(i, j) {
        this.ID = ''+i+'-'+j
        this.isStart = false;
        this.isEnd = false;
        this.isWall = false;
      }
    }
    let NodeDataTemp = [];
    for (let i = 0; i < this.Rows; i++) {
      NodeDataTemp.push([]);
    }
    for (let i = 0; i < this.Rows; i++) {
      for (let j = 0; j < this.Cols; j++) {
        NodeDataTemp[i][j] = new VizualizeNode(i, j);
      }
    }
    this.NodeData = NodeDataTemp;
  }
};
</script>

<style>

</style>
