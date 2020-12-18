// const promise = new Promise(function(resolve,reject) {
//   setTimeout(()=>{
//     resolve()
//   },300)
// }).then(res=>{
//   console.log('resolve之后立即执行')
// }).catch(err=>{
//   console.log(err)
// })

// 第几轮面试
var promise = interview(1).then(()=>{
  return interview(2)
}).then(()=>{
  return interview(3)
}).then(()=>{
  console.log('恭喜，通过了三轮面试')
}).catch((error)=>{
  console.log(`cry 第${error.round}面试失败`)
})

function interview(round) {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(Math.random() < 0.5) {
        resolve('success')
      } else {
        const error = new Error('fail')
        error.round = round
        reject(error)
      }
    },500)
  })
}

// 多家公司面试
function mulCompanyInterview(compantName) {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(Math.random() < 0.8) {
        resolve('success')
      } else {
        const error = new Error('fail')
        error.name = compantName
        reject(error)
      }
    })
  })
}

Promise.
  all([
    mulCompanyInterview('ali'),
    mulCompanyInterview('baidu'),
    mulCompanyInterview('tencent')
  ])
  .then(()=>{
    console.log('牛逼，BAT在你手中')
  })
  .catch(err=>{
    // 只能捕捉到第一个错误 无法知道全部的结果
    console.log(`在${err.name}手上失败了~~~`)
  })