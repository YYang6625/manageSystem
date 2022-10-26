<template>
  <el-aside :width="transit.collapse ? '64px' : '200px'">
    <!-- 一级菜单 -->
    <el-menu
      class="el-menu-vertical-demo"
      background-color="tomato"
      text-color="#fff"
      :collapse="transit.collapse"
      :collapse-transition="false"
    >
      <!-- 上面展开和收缩有跳转动画，需要取消 -->
      <el-menu-item
        :index="item.path"
        v-for="item in noChildren()"
        :key="item.path"
        @click="clickMenu(item)"
      >
        <el-icon>
          <component class="icons" :is="item.icon"></component>
        </el-icon>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <!-- 二级菜单 -->
      <el-sub-menu
        :index="item.label"
        v-for="item in hasChildren()"
        :key="item.path"
      >
        <template #title>
          <el-icon>
            <component class="icons" :is="item.icon"></component>
          </el-icon>
          <span>{{ item.label }}</span>
        </template>
        <!-- 二级菜单内部列表 -->
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, sunIndex) in item.children"
          :key="subItem.sunIndex"
          @click="clickMenu(subItem)"
        >
          <el-icon>
            <component class="icons" :is="subItem.icon"></component>
          </el-icon>
          <span>{{ subItem.label }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
import { useTransit } from "../store/index.js";
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";
export default {
  setup() {
    //引入仓库实例
    const transit = useTransit();
    // 定义使用的router(猜测这里应该是单独进行了模块化处理，需要另外引用，而不是像之前添加到vue2中增加了项目的体积，降低性能)
    // 可以看到这里是一个函数实例类似于pinia，所以应该也是单独的进行了模块化处理，并且优化了对属性的监听以及优化处理
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const list = [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "House",
        url: "Home/Home",
      },
      {
        path: "/mall",
        name: "mall",
        label: "商品管理",
        icon: "Management",
        url: "MallManage/MallManage",
      },
      {
        path: "/user",
        name: "user",
        label: "用户管理",
        icon: "user",
        url: "UserManage/UserManage",
      },
      {
        label: "其他",
        icon: "location",
        children: [
          {
            path: "/page1",
            name: "page1",
            label: "页面一",
            icon: "setting",
            url: "Other/PageOne",
          },
          {
            path: "/page2",
            name: "page2",
            label: "页面二",
            icon: "setting",
            url: "Other/PageTwo",
          },
        ],
      },
    ];
    // 如果有登录之后将原本的list进行更换
    // 刷新之后没有数据，登录前必定将数据存储到本地中l
    const asyncList = () => {
      if (transit.Menu.length === 0) {
        return JSON.parse(sessionStorage.getItem("menu"));
      } else if (transit.Menu) {
        return transit.Menu;
      }
    };
    // 判断是否有二级菜单
    const noChildren = () => {
      return asyncList().filter((item) => !item.children);
    };
    const hasChildren = () => {
      return asyncList().filter((item) => item.children);
    };
    // 跳转路由
    const clickMenu = (item) => {
      // vue2中是直接使用this.$router.push(),vue3则是需要引入使用
      router.push({
        name: item.name,
      });
      // 将路由信息传递给store
      transit.selectMenu(item);
    };
    return {
      noChildren,
      hasChildren,
      transit,
      clickMenu,
    };
  },
};
</script>

<style lang="less">
.el-menu {
  border-right: none;
}
</style>
