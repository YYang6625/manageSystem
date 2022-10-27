<script setup></script>

<template>
  <router-view />
</template>
<script>
import Cookie from "js-cookie";
export default {
  // beforeCreate() {
  //   Cookie.remove("token");
  // },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
  font-size: 50px;
}
body {
  height: 100%;
  min-width: 1280px;
}
#app {
  height: 100%;
}
</style>
