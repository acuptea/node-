/**
 * 1.node -v 查看版本
 *
 * 2.用node运行js文件  node index.js
 *
 * 3.node环境中有的全局变量  
 * （1）Date Math setTimeout setInterval
 * （2）没有的 requestAnimationFrame  可以用setImmediate替代
 * （3）特有的 __filename __dirname  当前运行脚本的文件名 当前运行脚本所在的目录地址
 *      process 进程对象  里面有 evn kill exit argv（用户输入的是什么）
 *
 * 4.nodejs模块规范——————commonJS
 *   传统资源用script标签加载js资源，为何会出现commonJS ?
 *   （1）脚本变多时，需要手动管理加载顺序
 *   （2）不同脚本之间逻辑调用，需要通过全局变量的方式
 *   （3）没有html怎么办
 *
 * 5.commonJS注意事项  
 * （1）exports可以挂载对象函数变量 exports导出的对象与require获取到的对象是同一个对象
 * （2）module.exports 会覆盖 exports.XXX
 *
 *  在同一层级运行 webpack --devtool none --mode development --target node index.js
 *
 * 6.nodejs内置模块  js<-->v8<--->os/nodeApi <---> eventloop
 *
 * 7.eventEmitter 观察者模式  addEventListener removeEventListener 
 *   解决两个对象之间的通信问题  既可以通过调用的方式 也可以通告抛事件的方式  
 *   选择调用还是抛事件（观察者模式）取决于：（1）不知道被通知者存在 （2）没有人听还能继续下去
 *   比如老板通知秘书 
 *
 *   抛事件也即观察者模式适用于：1.不需要知道被通知者有哪些 2.没有被监听（或者说没有接收人）也能继续下去
 *
 * 8.NODEJS非阻塞I/O
 * I Input O output i/o即一个系统的输入输出
 * 阻塞与非阻塞的区别在于系统接收输入到输出期间，是否能接收其他输入。
 *
 * 阻塞与非阻塞是系统底层机制  异步是编程方式
 * 
 * 9.异步解决方案： 把异步导致的不稳定解决为同步的稳定输入输出 
 * callback
 * 回调函数格式规范：（1）error-first callBack (2)node-style callBack 第一个参数是error 后面的参数是结果 
 * 
 * why error-first: 
 * node中每一个事件循环 都是一个单独的函数调用栈---和js一致, 
 * 直接在异步中throw error 回调函数catch不到错误(try catch 捕捉其调用栈上层的错误)，会抛到全局去导致程序崩掉
 * 所有在callBack中传参 callBack(throw error)
 * 这样 所有的函数都需要去判断 if(res instanceof Error)比较麻烦
 * 所以直接用第一个参数作为错误 如果有错误 if(err) {}
 * 
 * callback===> 存在的问题： （1）回调地狱（一轮面试二轮面试三轮面试） （2）异步并发（多家公司同时面试）
 *              解决方案： npm async.js(已过时) thunk
 *
 * 10.eventloop
 * 往一个系统中添加事件  隔一段事件轮询事件是否完成  完成就删除返回并删除这个事件
 *
 * 11.Promise 当前事件循环得不到结果 但未来事件循环会给到结果
 * 是一个状态机？？ pengding fulfilled/resolved  rejected
 * 
 *              ****error***  rejected
 * pengding ****
 *              ****value***  fulfilled
 * resolved与rejected都只能传递一个参数
 * resolved状态的promise调用回调后面的第一个then
 * rejected状态的promise调用回调后面的第一个catch
 * 任何一个rejected状态后面没有.catch的promise会造成浏览器/node环境的全局错误
 *
 * promise解决异步流程的控制问题 比如异步并发
 *
 * 执行then和catch会返回一个新的promise 该promise最终的状态根据then和catch的回调函数执行结果决定
 * 如果回调最终是throw 则promise是rejected状态
 * 如果是return 正常值 则是resloved状态
 * return 一个promise 该promise会和回调函数return的promise状态保持一致
 *
 * 12.异步编辑终极解决方案 async/await
 *
 * async函数返回的是一个promise  直接返回 return 4 也是包在promise中的
 * try catch可以捕获 await中的错误
 *
 * 13.http 应用层==>运输层==>网络层==>数据链路层==>物理层  http属于应用层
 * npm包 httpserver
 *
 * 14.express
 * (1)强壮的路由==>服务器应该去哪个文件 (2)快速组装http （3）模板引擎 （4）脚手架？？
 *
 * 15.koa
 * express门槛更低 封装多 开发速度更快
 * koa更强大优雅 res/req处理更方便 使用async function实现中间件 有暂停执行能力 在异步的情况下更符合洋葱模型 可定制性更高
 *
 * express适合做小型项目 koa适合需要高度维护的大型项目？？
 *
 * 16.RPC通信 remote procedure call 远程过程调用
 *  与ajax的相同之处：（1）都是两个计算机之间的远程通信 （2）需要双方约定一个数据格式
 *  与ajax的不同支出：（1）不一定使用DNS寻址（2）应用层协议一般不使用http（RPC通信一般是在内网中通信,一般使用二进制协议？） （3）基于TCP或者UDP协议
 *
 *  RPC调用
 *  （1）寻址/负载均衡：使用特有服务进行寻址
 *  （2）TCP通信： 单工通信 （永远只有一方向另外一方发送数据 client server 客户端 服务端）
 *                半双工通信 也叫轮番单工 (某一段时间内，只有一方向另外一方发送数据)
 *                全双工通信
 *                全双工通信时最方便的最好的  但是需要考虑实现的难度与成本
 *  （3）二进制协议： 更小的数据包体积（二进制不需要key） 更快的编译解码速率
 *
 * 17.buffer编解码二进制数据包
 *   BE与LE表示是高位放前面还是后面 BE是前面 不同模块与后台需要用不同的
 *   protocal-buffers npm包 
 *
 * 18.net搭建多路复用的RPC通道
 *    ajax的底层、http1.1的底层也就是半双工通信 http2的tcp是全双工通讯 http1.1的tcp是半双工通讯
 * 
 */
