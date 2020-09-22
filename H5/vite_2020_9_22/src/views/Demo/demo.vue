<template>
  <div>我是demo页</div>
  <HelloWorld :objParams="objParams" :numParams="numParams" />
  <button @click="changeObjParams">改变对象参数</button>
  <button @click="changeNumParams">改变数字参数</button>
  <div>
    对象参数：{{ objParams.num }} 对象参数-儿子参数：{{ objParams.child.num }}
  </div>
  <div>数字参数：{{ numParams }}</div>

  <div class="box">对对对</div>
</template>

<script>
import { reactive, ref, getCurrentInstance } from "vue";
import HelloWorld from "../../components/HelloWorld.vue";

export default {
  name: "Demo",
  components: {
    HelloWorld,
  },
  setup(props) {
    const { ctx } = getCurrentInstance();

    console.log("props:", props);
    console.log("ctx:", ctx);
    console.log("ctx.$router:", ctx.$router);

    const objParams = reactive({ num: 1, child: { num: 2 } });
    const numParams = ref(1);

    const changeObjParams = () => {
      objParams.num++;
      objParams.child.num++;
    };

    const changeNumParams = () => {
      numParams.value++;
    };

    return {
      objParams,
      numParams,
      changeObjParams,
      changeNumParams,
    };
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 600px;
  height: 200px;
  background: lightgray;
  margin: 0 auto;
  font-size: 20px;
}
</style>