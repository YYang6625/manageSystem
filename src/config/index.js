// 环境配置文件
// 开发环境
// 测试环境
// 线上环境

// import.meta.env.MODE: {string} 应用运行的模式。(vite官网)
// import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。他由base 配置项决定。
// import.meta.env.PROD: {boolean} 应用是否运行在生产环境。
// import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。
// import.meta.env.SSR: {boolean} 应用是否运行在 server 上。

// 当前环境(取不到默认为线上环境)
const env = import.meta.env.MODE || "prod";

const EnvConfig = {
  // 开发环境
  development: {
    baseApi: "/api",
    // 拦截请求地址
    mockApi:
      "https://www.fastmock.site/mock/9f511f427bc80b2ea1b1ae5388de1da9/api",
  },
  // 测试环境(随便写的)
  test: {
    baseApi: "//test.futurecom/api",
    mockApi:
      "https://www.fastmock.site/mock/9f511f427bc80b2ea1b1ae5388de1da9/api",
  },
  // 生产环境
  pro: {
    baseApi: "//future.com/api",
    mockApi:
      "https://www.fastmock.site/mock/9f511f427bc80b2ea1b1ae5388de1da9/api",
  },
};

export default {
  // 导出当前环境
  env,
  // mock总开关
  mock: true,
  ...EnvConfig[env],
};

// 总结整个mock拦截请求并对请求进行处理的流程
// 1.配置环境,导出配置的环境设置一个基础URL,后面api则是具体的请求接口(具体如何配置看公司要求以及webpack/vite官网了解)
// 2.设置mock.js对要请求的地址进行拦截(后端数据暂未处理好时,模拟一些数据进行测试)
// 3.二次封装axios,axios.create创建axios实例,可以对请求前后进行拦截处理,处理数据或者请求头(或者设置mock是否要进行拦截处理)
// 4.创建一个api.js统一管理项目基于基本URL之后接口api的请求,调用接口就是发起异步请求
// 5.调用api中的方法也就是携带参数进入request中请求,最后根据参数发起对应请求,返回相关数据
