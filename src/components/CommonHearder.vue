<template>
  <el-header style="height: 60px">
    <!-- 配合elementUi使用图标 -->
    <div class="l-content">
      <el-button size="small" @click="transit.updataCollapse()">
        <el-icon :size="20">
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <!-- 首页一定存在 -->
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- 利用store中接收的路由信息来判断是否渲染以及路由路径跳转 -->
        <el-breadcrumb-item :to="current.path" v-if="current">{{
          current.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 下拉菜单 -->
    <div class="r_content">
      <!-- elemnetUI直接引入 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          <!-- 动态引入，数据分离 -->
          <img class="user" :src="getImgSrc()" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { defineComponent, computed } from "@vue/runtime-core";
import { useTransit } from "../store/index.js";
import { useRouter } from 'vue-router';
import Cookie from "js-cookie";
export default defineComponent({
  setup() {
    const $router = useRouter();
    const transit = useTransit();
    // 静态资源处理(vite与webpack不一致)
    // const imgSrc = require("../assets/QQ图片20221002165355.jpg");
    const getImgSrc = () => {
      return new URL("../assets/QQ图片20221002165355.jpg", import.meta.url)
        .href;
    };
    // 利用计算属性存储当下组件的路径(缓存特性)
    const current = computed(() => {
      return transit.currentMenu;
    });
    // 退出登录
    const loginOut = () => {
      Cookie.remove("token");
      $router.push('/login')
    };
    return {
      getImgSrc,
      loginOut,
      transit,
      current,
    };
  },
});
</script>
<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #333;
}
.r_content {
  .user {
    padding-top: 0.15rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 10px;
  }
  h3 {
    color: #fff;
    font-size: 18px;
  }
}

// 这里利用穿透（深度选择器）需要和scoped配合使用才生效
:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>
