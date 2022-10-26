// 二次封装axios请求(对接口请求前后进行一些处理)
import axios from "axios";
// 设置环境
import config from "../../config";
// 引入错误提示
import { ElMessage } from "element-plus";

// 定义网络请求异常常量模拟错误
const NETWORK_ERROR = "网络请求异常.请稍后尝试";

// 创建axios实例  设置基础路径
const service = axios.create({
  // 将基础路径设置为环境路径
  baseURL: config.baseApi,
});

// 利用axios拦截器对请求之前做一些处理
service.interceptors.request.use((request) => {
  // 自定义一些header(请求头)
  // jwt-token认知时
  return request;
});

// 请求之后处理
service.interceptors.response.use((response) => {
  // 对数据进行一些处理,这样请请求之后就是最直接的数据
  const { code, data, msg } = response.data;
  if (code == 200) {
    return data;
  } else {
    // 网络请求错误,有返回错误信息就返回没有就报网络异常
    ElMessage.error(data.msg || NETWORK_ERROR);
    //  返回错误状态的Promise回调
    return Promise.reject(data.msg || NETWORK_ERROR);
  }
});

// 封装的axios实例请求核心函数
function request(options) {
  // options就是请求地址的一些参数
  // console.log('request', options);
  // 设置options参数,有方法就使用方法,没有就使用get方法
  options.method = options.method || "get";
  // 将请求的字符串变成小写toLowerCase()
  if (options.method.toLowerCase() == "get") {
    //  将参数params的数据设置给data
    options.params = options.data;
  }

  // 单个接口对mock的处理,定义一个mock布尔值
  let isMock = config.mock;
  // 如果接口自带mock,则将原本总接口的mock覆盖做某个单独接口的mock(决定是否进行拦截处理,后端数据完成那也就没必要进行拦截了)
  if (typeof options.mock !== "undefined") {
    isMock = options.mock;
  }
  // 对线上环境做处理
  if (config.env == "prod") {
    // 不给使用mock的机会,如果是生产环境则转接到开发环境防止产生严重bug
    service.defaults.baseURL = config.baseApi;
  } else {
    // 不是生产环境就判断mock布尔值来确定是够需要进行拦截
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  }
  // 最后当api.js调用request时携带参数,根据参数发起相对应的请求返回数据
  return service(options);
}

// request就是返回了一个带有mock等数据的axios请求示例对象
export default request;
