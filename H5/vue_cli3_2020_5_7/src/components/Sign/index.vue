<template>
  <div class="components_sign_item" ref="canvasHW">
    <div class="title">
      <span>{{ title }}</span>
      <span class="right" @click="resetSignatureEvent"
        ><img :src="iconSrc" alt="" class="reset_icon" />{{ resetText }}</span
      >
    </div>

    <div class="signature_area" ref="canvasBox">
      <canvas
        ref="canvasF"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
      >
      </canvas>

      <div class="place_holder">签名区</div>
    </div>
  </div>
</template>
<script>
import defaultIconSrc from "./img/reset_icon.png";
export default {
  name: "sign-item",
  props: {
    title: {
      // 标题
      type: String,
      require: false,
      default: "请用正楷字体在以下区域内签名"
    },
    resetText: {
      // 重签文案
      type: String,
      require: false,
      default: "重签"
    },
    iconSrc: {
      // 重签icon
      type: String,
      require: false,
      default: defaultIconSrc
    },
    pointsName: {
      //父级对应points的变量名
      type: String,
      require: false,
      default: "points"
    }
  },
  data() {
    return {
      //签名相关（canvas）
      blob: {
        before: 0,
        last: 0
      },
      points: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false
    };
  },
  watch: {
    // 监听变化，通知父级改变
    points(val) {
      this.$parent[this.pointsName] = val;
    }
  },
  mounted() {
    setTimeout(() => {
      // canvas相关
      let canvas = this.$refs.canvasF;

      canvas.height = this.$refs.canvasBox.offsetHeight;
      canvas.width = this.$refs.canvasBox.offsetWidth;
      this.canvasTxt = canvas.getContext("2d");
      canvas.toBlob(blob => {
        this.blob.before = blob.size;
      });
    });
  },
  methods: {
    // 组件-提交签名数据
    submitSign() {
      let response = {
        points: this.points,
        sign: this.$refs.canvasF.toDataURL("image/png") //这里转成的是base64的地址，直接用到img标签的src是可以显示图片的
      };
      return response;
    },
    // 重置签名
    resetSignatureEvent() {
      this.canvasTxt.clearRect(
        0,
        0,
        this.$refs.canvasF.width,
        this.$refs.canvasF.height
      );
      this.points = [];
    },
    //电脑设备事件
    mouseDown(ev) {
      let dom = this.$refs.canvasF;
      let marginTop = dom.getBoundingClientRect().top;
      let marginLeft = dom.getBoundingClientRect().left || 0;

      ev = ev || event;
      if (ev.cancelable) {
        ev.preventDefault();
      }
      // console.log(ev);
      let obj = {
        x: ev.clientX - marginLeft,
        y: ev.clientY - marginTop,
      };
      // console.log(obj);
      this.startX = obj.x;
      this.startY = obj.y;
      this.canvasTxt.beginPath();
      this.canvasTxt.moveTo(this.startX, this.startY);
      this.canvasTxt.lineTo(obj.x, obj.y);
      this.canvasTxt.stroke();
      this.canvasTxt.closePath();
      this.points.push(obj);
      this.isDown = true;
    },
    //移动设备事件
    touchStart(ev) {
      let dom = this.$refs.canvasF;
      let marginTop = dom.getBoundingClientRect().top;
      let marginLeft = dom.getBoundingClientRect().left || 0;

      ev = ev || event;
      if (ev.cancelable) {
        ev.preventDefault();
      }

      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - marginLeft,
          y: ev.targetTouches[0].clientY - marginTop,
        };
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
      }
    },
    //电脑设备事件
    mouseMove(ev) {
      let dom = this.$refs.canvasF;
      let marginTop = dom.getBoundingClientRect().top;
      let marginLeft = dom.getBoundingClientRect().left || 0;

      ev = ev || event;
      if (ev.cancelable) {
        ev.preventDefault();
      }

      if (this.isDown) {
        let obj = {
          x: ev.clientX - marginLeft,
          y: ev.clientY - marginTop,
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    },
    //移动设备事件
    touchMove(ev) {
      let dom = this.$refs.canvasF;
      let marginTop = dom.getBoundingClientRect().top;
      let marginLeft = dom.getBoundingClientRect().left || 0;

      ev = ev || event;
      if (ev.cancelable) {
        ev.preventDefault();
      }

      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - marginLeft,
          y: ev.targetTouches[0].clientY - marginTop,
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    },
    //电脑设备事件
    mouseUp(ev) {
      let dom = this.$refs.canvasF;
      let marginTop = dom.getBoundingClientRect().top;
      let marginLeft = dom.getBoundingClientRect().left || 0;

      ev = ev || event;
      if (ev.cancelable) {
        ev.preventDefault();
      }

      let obj = {
        x: ev.clientX - marginLeft,
        y: ev.clientY - marginTop,
      };
      this.canvasTxt.beginPath();
      this.canvasTxt.moveTo(this.startX, this.startY);
      this.canvasTxt.lineTo(obj.x, obj.y);
      this.canvasTxt.stroke();
      this.canvasTxt.closePath();
      this.points.push(obj);
      this.points.push({ x: -1, y: -1 });
      this.isDown = false;
    },
    //移动设备事件
    touchEnd(ev) {
      let dom = this.$refs.canvasF;
      let marginTop = dom.getBoundingClientRect().top;
      let marginLeft = dom.getBoundingClientRect().left || 0;

      ev = ev || event;
      if (ev.cancelable) {
        ev.preventDefault();
      }
      // console.log(ev);
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - marginLeft,
          y: ev.targetTouches[0].clientY - marginTop,
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.points.push({ x: -1, y: -1 });
      }
    }
  }
};
</script>
<style lang="less" scoped>
div {
  box-sizing: border-box;
}

.components_sign_item {
  width: 100%;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;

  // 标题
  .title {
    height: 88px;
    line-height: 88px;
    padding-left: 34px;
    padding-right: 32px;
    font-size: 28px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid #eff4f4;
    .right {
      float: right;
      .reset_icon {
        display: inline-block;
        vertical-align: middle;
        width: 28px;
        height: 28px;
        margin-right: 10px;
      }
    }
  }

  // 签名区
  .signature_area {
    position: relative;
    flex: 1;
    background: #cccccc;
    canvas {
      height: 100%;
      width: 100%;
      position: absolute;
      z-index: 2;
    }

    .place_holder {
      position: absolute;
      width: 410px;
      text-align: center;
      font-size: 136px;

      color: #333333;
      opacity: 0.1;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>



