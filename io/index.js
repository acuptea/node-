const glob = require('glob')

// 阻塞的方式---即同步
var res = null
console.time('glob同步')
res = glob.sync(__dirname + '*/**/*')
console.timeEnd('glob同步')
console.log(res)

// 非阻塞 异步
console.time('glob异步')
glob(__dirname+'*/**/*',function(err,res){
  console.log(res)
})
console.timeEnd('glob异步')
console.log(1+2)
