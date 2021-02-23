<template>
  <div class="main-block">
    <div class="grid">
      <div class="row" v-for="row in Rows" :key="row">
        <div class="box" v-for="col in Cols" :key="col">
          <Node
            :row="row"
            :col="col"
            :NodeData="NodeDataList[row - 1][col - 1]"
          ></Node>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Node from "./VizualizeNode";
import { EventBus } from "../main";

export default {
  props: {
    Rows: Number,
    Cols: Number,
  },
  components: {
    Node: Node,
  },
  data() {
    return {
      NodeDataList: {},
      NodeProps: {
        CurrStart: {},
        CurrEnd: {},
        CurrWallList: [],
        CurrActiveList: [],
      },
      WallInteracion: {
        isMouseDown: false,
        isMouseOver: false,
      },
    };
  },

  methods: {},

  created() {
    
    EventBus.$on("StartNode", (StartNode) => {
      if (this.NodeProps.CurrStart != undefined) {
        this.NodeProps.CurrStart.class = "Empty";
      }
      this.NodeProps.CurrStart = StartNode;
      StartNode.isStart = true;
      StartNode.class = "Start";
    });

    EventBus.$on("EndNode", (EndNode) => {
      if (this.NodeProps.CurrEnd != undefined) {
        this.NodeProps.CurrEnd.class = "Empty";
      }
      this.NodeProps.CurrEnd = EndNode;
      EndNode.isStart = true;
      EndNode.class = "End";
    });

    EventBus.$on("WallNode_OnMouseDown", (WallNode) => {
      this.WallInteracion.isMouseDown = true;
      AddWall(WallNode);
      EventBus.$on("WallNode_OnMouseOver", (WallNode) => {
        AddWall(WallNode);
      });
    });

    const AddWall = (WallNode) => {
      if (!this.NodeProps.CurrWallList.includes(WallNode)) {
        WallNode.class = "Wall";
        this.NodeProps.CurrWallList.push(WallNode);
      }
    };

    EventBus.$on("ResetNode", () => {
      this.NodeProps.CurrStart.class = "Empty";
      this.NodeProps.CurrEnd.class = "Empty";
      this.NodeProps.CurrWallList.forEach((node) => {
        node.class = "Empty";
      });
      this.NodeProps.CurrActiveList.forEach((node) => {
        node.class = "Empty";
      });

      this.NodeProps.CurrStart = {};
      this.NodeProps.CurrEnd = {};
      this.NodeProps.CurrWallList = [];
      this.NodeProps.CurrActiveList = [];
    });

    EventBus.$on("FindPath", () => {
      // Data is recived from API
      const wallsList = this.NodeProps.CurrWallList;
      let wall_list = [];
      wallsList.forEach((wallID) => {
        wallID = wallID.ID.split(/-/);
        let parsed_id = [parseInt(wallID[0]), parseInt(wallID[1])];
        wall_list.push(parsed_id);
      });

      const startPos = this.NodeProps.CurrStart.ID.split(/-/);
      const endPos = this.NodeProps.CurrEnd.ID.split(/-/);
      let grid_size = [parseInt(this.Rows), parseInt(this.Cols)];

      let data = {
        grid_size: [[grid_size][0]],
        start_pos: [[parseInt(startPos[0]), parseInt(startPos[1])]],
        end_pos: [[parseInt(endPos[0]), parseInt(endPos[1])]],
        wall_list: [wall_list],
      };

      async function fetch_path(data) {
        let api_response = await fetch("http://127.0.0.1:5000/", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
          },
        });

        let api_data = await api_response.json();

        return api_data;
      }
      // Data is used for animations
      let api_data = fetch_path(data);
      api_data.then((data) => {
        let visting_animation_time = data.visited.length * 250;
        visting_animation_time += 100;

        data.visited.forEach((NodeID_group, i) => {
          setTimeout(() => {
            NodeID_group.forEach((NodeID) => {
              let i = NodeID[0];
              let j = NodeID[1];
              if (
                !(
                  (i == startPos[0] && j == startPos[1]) ||
                  (i == endPos[0] && j == endPos[1])
                )
              ) {
                this.NodeDataList[i][j].class = "Visited";
                this.NodeProps.CurrActiveList.push(this.NodeDataList[i][j]);
              }
            });
          }, i * 250);
        });
        data.path.forEach((NodeID, i) => {
          setTimeout(() => {
            let i = NodeID[0];
            let j = NodeID[1];
            if (!(i == startPos[0] && j == startPos[1])) {
              this.NodeDataList[i][j].class = "Path";
              this.NodeProps.CurrActiveList.push(this.NodeDataList[i][j]);
            }
          }, i * 150 + visting_animation_time);
        });
        
      });
    });
    // Initialize NODE objects
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
  },
};
</script>