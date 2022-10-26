// mockjs作用:
// 1.mockjs是用于拦截ajax请求，模拟服务器返回数据 mockjs的实现原理是对XHR对象的拦截，属于js拦截，所以浏览器并没有发出请求
// 2.添加相关接口地址，

// 3.拦截发送请求以及请求信息，

// 4.按照模板生成随机数据，

// 5.返回请求源生成信息

// 一：本地mock的使用
import Mock from "mockjs";
import homeApi from "./mockData/home.js";
import userApi from "./mockData/user.js";
import permissionApi from "./mockData/permission.js";
// 拦截请求(将对服务器的请求拦截转向本地请求，模拟异步请求操作)
// 将请求路径进行拦截，并返回第二个参数的数据
Mock.mock("/home/getData", homeApi.getHomeData);

// 本地获取user的数据(正则) 注意：params参数传递需要以对象形式{params：data}
Mock.mock(/user\/getUser/, "get", userApi.getUserList);
// 拦截用户登录(使用字符串写的地址会被写死携带参数无法识别拦截，利用正则即可拦截此字段发出的请求)
Mock.mock(/permission\/getMenu/, "post", permissionApi.getMenu);
// 在操作过程中古一直报错或者请求失败原因
// 1.请求失败:没有返回状态码200
// 2.报错原因,当方法为post时,在request中的index.js文件中配置request时的options.method多拼写了一个s导致无法识别post请求的method

// 二，我们可以利用mock官网进行异步请求，模拟向服务器发送请求，数据需要自己进行编辑
