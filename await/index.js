const test = async function() {
  try {
    await interview(1)
    await interview(2)
    await interview(3)
    console.log('bingo!三轮面试过关')
  } catch(e) {
    console.log('cry at' + e.round)
  }
}

test()

const test2 = async function() {
  try {
    await Promise.all([mulCompanyInterview('baidu'),mulCompanyInterview('ali'),mulCompanyInterview('tencent')])
    console.log('niuniuniu')
  } catch(e) {
    console.log('cry at' + e.name)
  }
}

test2()

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
    })
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