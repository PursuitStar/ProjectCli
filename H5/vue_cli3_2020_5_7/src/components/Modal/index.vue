<template>
  <div class="components_modal" v-if="visiable">
    <transition name="fade" mode="in-out">
      <div class="mask" @click.self="closeModal" v-if="contentVisiable"></div>
    </transition>
    <transition :name="`modal-${direction}`">
      <slot v-if="contentVisiable" :close="closeModal"></slot>
    </transition>
  </div>
</template>


<script>
export default {
  name: "components_modal",
  props: {
    visiable: {
      // 控制模态框显隐
      type: Boolean,
      require: false,
      default: false
    },
    direction: {
      type: String, // 控制模态框进入方向 bottom | top | right | left
      require: false,
      default: "bottom"
    }
  },
  data() {
    return {
      contentVisiable: false
    };
  },
  watch: {
    visiable(val) {
      if (val) {
        setTimeout(() => {
          this.contentVisiable = true;
        });
      }
    }
  },

  mounted() {},
  methods: {
    // 模态框-关闭
    closeModal() {
      this.contentVisiable = false;
      setTimeout(() => {
        this.$emit("closeModal");
      }, 400);
    }
  }
};
</script>

<style lang="less" scoped>
.components_modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
}
</style>
