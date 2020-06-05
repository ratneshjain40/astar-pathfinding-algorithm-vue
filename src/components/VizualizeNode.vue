<template>
  <div
    class="inner"
    :id="NodeData.ID"
    :class="NodeData.class"
    @mousedown="ToggleClick"
    @mousemove="MoveWall"
    @mouseup="NodeData.WallInteracion.isMouseDown = false"
  ></div>
</template>

<script>
import { EventBus } from "../main";

export default {
  props: {
    row: Number,
    col: Number,
    NodeData: Object
  },
  data() {
    return {
      ButtonBusData: {}
    };
  },
  methods: {
    ToggleClick: function() {
      if (this.ButtonBusData.isStartBtn) {
        EventBus.$emit("StartNode", this.NodeData);
      } else if (this.ButtonBusData.isEndBtn) {
        EventBus.$emit("EndNode", this.NodeData);
      } else if (this.ButtonBusData.isWallBtn) {
        EventBus.$emit("WallNode_OnMouseDown", this.NodeData);
      }
    },
    MoveWall: function() {
      if (this.NodeData.WallInteracion.isMouseDown) {
        EventBus.$emit("WallNode_OnMouseOver", this.NodeData);
      }
    }
  },
  created() {
    EventBus.$on("ChangedButtonStatus", data => {
      this.ButtonBusData = data;
    });
  },
  updated() {
    console.log("Updated =>", this.NodeData.ID);
  }
};
</script>

<style>
.Empty {
  background: rgb(255, 255, 255);
}
.Start {
  background: rgb(170, 47, 16);
}
.End {
  background: rgb(167, 221, 142);
}
.Wall {
  background: rgb(20, 59, 187);
}
</style>
