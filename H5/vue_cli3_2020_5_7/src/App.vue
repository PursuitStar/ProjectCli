<template>
  <div id="app" v-cloak :style="{ height: appHeight + 'px' }">
    <transition :name="transitionClass">
      <router-view class="body"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "APP",
  data() {
    return {
      routerPathList: [], //已访问路由列表
      transitionClass: "",

      appHeight: ""
    };
  },
  watch: {
    // 监听路由变化
    $route(to) {
      let routerPathList = JSON.parse(JSON.stringify(this.routerPathList));
      let len = routerPathList.length;
      let prePath = routerPathList[len - 2] || undefined;
      let currentPath = routerPathList[len - 1];

      if (to.path === currentPath) {
        this.transitionClass = "";
      } else if (to.path === prePath) {
        routerPathList.splice(-1);
        this.transitionClass = "slide-out";
      } else {
        routerPathList.push(to.path);
        this.transitionClass = "slide-in";
      }
      this.routerPathList = routerPathList;
    }
  },
  mounted() {
    this.appHeight = window.innerHeight;

    // 记录当前路由
    this.routerPathList = [this.$route.path];

    // 禁止滚动事件
    document.body.addEventListener(
      "touchmove",
      function(evt) {
        if (!evt._isScroller) {
          evt.preventDefault();
        }
      },
      { passive: false }
    );
  }
};
</script>

<style lang="less">
@import "~@/assets/style/default.less";
@import "~@/assets/style/animate.less";

#app[v-cloak] {
  display: none;
}

#app {
  position: relative;
  // height: 100vh;
  width: 100%;
}

.body {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

// 滚动元素 - 样式
.scroll {
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
