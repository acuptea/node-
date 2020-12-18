module.exports = function (playerAction) {
  // 电脑随机 小于1 石头 1-2 剪刀 大于2 布
  let compterAction = null
  const random = Math.random() * 3
  if(random < 1) {
    compterAction = 'rock'
  } else if (random < 2) {
    compterAction = 'scissor'
  } else {
    compterAction = 'paper'
  }
  // 比较用户与电脑的操作
  function compare(a,b) {
    if(a === b) {
      return 'equal'
    } else if ( a === 'rock' && b === 'scissor' || a === 'scissor' && b === 'paper' || a === 'paper' && b === 'rock') {
      return a
    } else {
      return b
    }
  }

  const res = compare(playerAction,compterAction)
  let resText = `我出:${compterAction}`
  if(res === 'equal') {
    resText+= '——平局'
    console.log(resText)
    return 0
  } else if (res === playerAction) {
    resText+= '——你赢了'
    console.log(resText)
    return -1
  } else if (res === compterAction) {
    resText+= '——你输了'
    console.log(resText)
    return 1
  } else {
    resText+= '——程序出错了'
  }
  console.log(resText)
}