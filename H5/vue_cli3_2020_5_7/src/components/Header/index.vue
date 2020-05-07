<template>
  <div class="components_header" v-if="visiable">
    <div
      class="header_left return_icon fll"
      @click="returnClick"
      v-if="!leftTest && !leftHide"
    >
      <img
        src="@/assets/img/nav_icon_return2.png"
        alt=""
        v-if="!leftContent && !type"
      />
      <img
        src="@/assets/img/nav_icon_return1.png"
        alt=""
        v-if="!leftContent && type"
      />
      <img :src="leftContent" alt="" v-if="leftContent" />
    </div>

    <div
      class="header_left left_icon"
      @click="returnClick"
      v-if="leftTest && !leftHide"
    >
      <span v-if="!leftContent">关闭</span>
      <span v-if="leftContent">{{ leftContent }}</span>
    </div>

    <span>{{ titleText }}</span>

    <!-- 右侧按钮 -->
    <div class="header_right">
      <slot name="right"></slot>
    </div>
  </div>
</template>


<script>
import { hasOrigin } from "@/utils/tool";

export default {
  name: "agent_header",
  props: [
    "type", //类型 默认0 【0：黑色 1：白色】
    "titleText",
    "leftTest", //左侧类型（默认为icon, 值存在即为test）
    "leftContent", //左侧内容（icon：内容即为图片路径； test:内容即为文本）
    "leftFunc", //左侧回调
    "leftHide" //左侧显隐
  ],
  data() {
    return {
      visiable: true
    };
  },
  mounted() {
    this.visiable = !hasOrigin();
  },
  methods: {
    returnClick() {
      if (this.leftFunc) {
        this.$emit(this.leftFunc);
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.components_header {
  .fll {
    float: left;
  }
  position: relative;
  width: 100%;
  height: 90px;
  line-height: 90px;

  padding: 0 240px;
  background: #fff;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  .header_left {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
  }
  .return_icon {
    width: 38px;
    height: 38px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .left_icon {
    span {
      font-size: 32px;
      color: #0e3a28;
    }
  }
  span {
    font-size: 36px;
    /*color: #fff;*/
    font-weight: 500;
    white-space: nowrap;
  }

  .header_right {
    position: absolute;
    right: 30px;
  }
}
</style>
