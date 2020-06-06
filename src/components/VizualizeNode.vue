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
  background: #a56e78;
}
.End {
  background: #7da870;
}
.Wall {
  background: #314149;
}
.Path {
  background: #694f5d;
}
.Visited {
  background: #e6a156;
}

</style>
