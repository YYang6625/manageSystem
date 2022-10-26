<template>
  <div class="tags">
    <!-- 参数可查看elementui官网设置 -->
    <!-- effect时表示当前按键颜色 这里出错啦 注意是当前路由的名字route 而不是router -->
    <el-tag
      type="success"
      :key="tag.name"
      v-for="(tag, index) in tags"
      :closable="tag.name != 'home'"
      :disable-transition="false"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { useTransit } from "../store/index.js";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const Transit = useTransit();
    const router = useRouter();
    const route = useRoute();
    // 获取所有路由信息进行渲染
    const tags = Transit.tabList;
    // 利用tag跳转
    const changeMenu = (item) => {
      // 利用存在的路由信息之间进行条状即可
      router.push({ name: item.name });
    };
    // 删除tag
    const handleClose = (tag, index) => {
      // 利用index去删除对应下标的路由数据即可,并跳转至后一个
      let length = tags.length - 1;
      //  处理store中的数据尽量在store中进行，我们调用其中函数即可
      Transit.closeTag(tag);
      //  删除之后再进行跳转
      if (tag.name !== route.name) {
        // 删除的不是当前的路由组件就不做操作
        return;
      }
      if (index === length) {
        // 删除的是当前组件且是最后一个就跳转至前一个
        router.push({
          name: tags[index - 1].name,
        });
      } else {
        // 删除的是当前组件，且不是最后一个，就跳转至原本组件的索引也就是后一个
        router.push({
          name: tags[index].name,
        });
      }
    };
    return {
      tags,
      changeMenu,
      handleClose,
    };
  },
};
</script>

<style lang="less" scoped>
.tags {
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 0.2rem;
  padding-left: 0.2rem;
  .el-tag {
    margin-right: 0.1rem;
    cursor: pointer;
  }
}
</style>
