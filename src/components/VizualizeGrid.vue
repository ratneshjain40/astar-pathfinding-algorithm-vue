<template>
  <div class="main-block">
    <div class="grid">
      <div class="row" v-for="row in Rows" :key="row">
        <div class="box" v-for="col in Cols" :key="col">
          <Node :row="row" :col="col" :NodeData="NodeDataList[row-1][col-1]"></Node>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Node from "./VizualizeNode";
import { EventBus } from "../main";
import {Algorithm }from "../algorithm/algorithm"

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
      NodeDataList: {},
      NodeProps: {
        CurrStart: {},
        CurrEnd: {},
        CurrWallList: []
      },
      WallInteracion: {
        isMouseDown: false,
        isMouseOver: false
      }
    };
  },

  methods: {},

  created() {
    EventBus.$on("StartNode", StartNode => {
      if (this.NodeProps.CurrStart != undefined) {
        this.NodeProps.CurrStart.class = "Empty";
      }
      this.NodeProps.CurrStart = StartNode;
      StartNode.isStart = true;
      StartNode.class = "Start";
    });

    EventBus.$on("EndNode", EndNode => {
      if (this.NodeProps.CurrEnd != undefined) {
        this.NodeProps.CurrEnd.class = "Empty";
      }
      this.NodeProps.CurrEnd = EndNode;
      EndNode.isStart = true;
      EndNode.class = "End";
    });

    EventBus.$on("WallNode_OnMouseDown", WallNode => {
      this.WallInteracion.isMouseDown = true;
      AddWall(WallNode);
      EventBus.$on("WallNode_OnMouseOver", WallNode => {
        AddWall(WallNode);
      });
    });

    EventBus.$on("ResetNode", () => {
      this.NodeProps.CurrStart.class = "Empty";
      this.NodeProps.CurrEnd.class = "Empty";
      this.NodeProps.CurrWallList.forEach(node => {
        node.class = "Empty";
      });

      this.NodeProps.CurrStart = {};
      this.NodeProps.CurrEnd = {};
      this.NodeProps.CurrWallList = [];
    });

    EventBus.$on("FindPathNode", () => {





    /*----------------------------CODE HERE*---------------------------*/





    });

    const AddWall = WallNode => {
      if (!this.NodeProps.CurrWallList.includes(WallNode)) {
        WallNode.class = "Wall";
        this.NodeProps.CurrWallList.push(WallNode);
      }
    };

    let WallInteracion = this.WallInteracion;
    class VizualizeNode {
      constructor(i, j) {
        this.ID = "" + i + "-" + j;
        this.class = "Empty";
        this.isStart = false;
        this.isEnd = false;
        this.isWall = false;
        this.WallInteracion = WallInteracion;
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
    this.NodeDataList = NodeDataTemp;
  }
};
</script>

<style>
</style>
