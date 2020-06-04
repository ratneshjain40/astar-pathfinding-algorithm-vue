<template>
  <div class="inner" :id="SetId(row,col)" v-on:click="ToggleClick"></div>
</template>

<script>
export default {
  props: {
    row: Number,
    col: Number,
    NodeData: Object
  },
  data() {
    return {};
  },
  methods: {
    SetId: function(row, col) {
      return row - 1 + "-" + Number(Number(col) - 1);
    },

    ToggleClick: function(event) {
      console.log("Click is on Node"+event.target.id)
    },
  }
};
</script>

<style>
.Empty {
  background: rgb(255, 255, 255);
}

.Start {
  background: rgb(82, 73, 68);
}

.End {
  background: rgb(221, 169, 142);
}
</style>
