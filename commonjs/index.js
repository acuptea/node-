// 用户操作行为
const playerAction = process.argv[process.argv.length -1]
const game = require('./lib')

let count = 0
process.stdin.on('data',e=>{
  const playerAction = e.toString().trim()
  const result = game(playerAction)
  if(result === -1) {
    count++
  }

  if(count === 3) {
    console.log('输了3局了，不玩了！')
    process.exit()
  }
})
