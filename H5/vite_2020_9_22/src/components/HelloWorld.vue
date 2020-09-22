<template>
  <div>当前用户信息</div>
  <div>=======================================</div>
  <div>用户信息-账户：{{ $user_info.account }}</div>
  <div>用户信息-昵称：{{ $user_info.name }}</div>
  <div>用户信息-年龄：{{ $user_info.age }}</div>

  <div>=======================================</div>
  <div>
    对象参数：{{ objParams.num }} 对象参数-儿子参数：{{ objParams.child.num }}
  </div>
  <div>数字参数：{{ numParams }}</div>

  <button class="red" @click="addUserAge">增加用户年龄</button>
  <div></div>
</template>

<script>
import { reactive, inject } from "vue";

export default {
  name: "HelloWorld",
  props: ["objParams", "numParams"],
  setup(props) {
    console.log(props);
    const $user_info = inject("$user_info");
    const $Api = inject("$Api");

    $Api.CommonApi.login({
      url: "/login",
    });

    const addUserAge = () => {
      $user_info.age++;
    };

    return {
      $user_info,
      addUserAge,
    };
  },
};
</script>

<style lang="less" scoped>
.red {
  color: red;
}
</style>

