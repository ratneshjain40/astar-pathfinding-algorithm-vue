<template>
  <div class="menu-buttons">
    <button
      id="start-pos-btn"
      class="uk-button uk-button-primary single-btn"
      v-on:click="ToggleBtn('isStartBtn')"
    >Start</button> 
    <button
      id="end-pos-btn"
      class="uk-button uk-button-primary single-btn"
      v-on:click="ToggleBtn('isEndBtn')"
    >End</button>
    <div class="single-btn">
      <button
        id="make-walls-btn"
        class="uk-button uk-button-primary make-wall-btn"
        v-on:click="ToggleBtn('isWallBtn')"
      >
        Make Wall
        <span>
          <i id="wall-icon" class="fas fa-play"></i>
        </span>
      </button>
    </div>
    <button
      id="find-path-btn"
      class="uk-button uk-button-primary single-btn"
      v-on:click="ToggleBtn('isFindPathBtn')"
    >Find Path</button>
    <button id="reset-btn" class="uk-button uk-button-primary single-btn">Reset</button>
  </div>
</template>

<script>
import { ButtonBus } from "../main";

export default {

  data() {
    return {
      ButtonStatus: {
        isStartBtn: false,
        isEndBtn: false,
        isWallBtn: false,
        isFindPathBtn: false
      }
    };
  },
  methods: {
    ToggleBtn: function(Btn) {
      Object.keys(this.ButtonStatus).forEach(key => {
        this.ButtonStatus[key] = false;
      });
      this.ButtonStatus[Btn] = true;
      ButtonBus.$emit('ChangedButtonStatus',this.ButtonStatus);
    }
  }
};
</script>
