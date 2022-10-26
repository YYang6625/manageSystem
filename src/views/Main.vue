<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <!-- 侧边栏组件 -->
      <CommonAside />
      <el-container>
        <!-- 头部组件 -->
        <CommonHeader />
        <CommonTag/>
        <!-- 展示不同的子组件 -->
        <router-view />
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CommonHeader from "../components/CommonHearder.vue";
import CommonAside from "../components/CommonAside.vue";
import CommonTag from "../components/CommonTag.vue";
export default defineComponent({
  components: {
    CommonHeader,
    CommonAside,
    CommonTag
  },
});
</script>
<style lang="less">
.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
    flex-wrap: wrap;
    // 因为这个属性找了半天错误(最后在浏览器检测中查出错误，利用浏览器提供发flex预览设置了正确的align-content: flex-start;
    align-content: flex-start;
  }
  // 设置左边的container不换行防止内容被挤下去
  .lay-container {
    flex-wrap: nowrap;
    height: 100%;
  }
  // &表示当前父级元素
  & > .el-container {
    height: 100%;
    & > .el-aside {
      height: 100%;
      background-color: tomato;
    }
  }
}
</style>
