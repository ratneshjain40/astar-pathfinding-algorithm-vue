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
  background: rgb(167, 237, 255);
}
.Start {
  background: #ff9999;
}
.End {
  background: #baff92;
}
.Wall {
  background: #314149;
}
.Path {
  background: rgb(0, 255, 170);
  animation-name: fill;
  animation-duration: 0.3s; 
  animation-timing-function: ease-out; 
  animation-delay: 0;
  animation-iteration-count: 1;
  animation-fill-mode: none;
  animation-play-state: running;
}
.Visited {
  background: #1d92ff;
  animation-name: stretch;
  animation-duration: 0.5s; 
  animation-timing-function: ease-out; 
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: none;
  animation-play-state: running;
}


@keyframes stretch {
  0% {
    transform: scale(.5);
    background-color: rgb(0, 255, 170);
    border-radius: 100%;
  }
  50% {
    background-color: rgb(0, 195, 255);
  }
  100% {
    transform: scale(1);
    background-color: rgb(0, 132, 255);
  }
}

@keyframes fill {
  0% {
    background-color: rgb(0, 132, 255);;
  }
  50% {
    background-color: rgb(0, 195, 255);
  }
  100% {
    background-color: rgb(0, 255, 170);
  }
}

</style>
