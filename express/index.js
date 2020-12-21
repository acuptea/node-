const fs = require('fs')
const querystring = require('querystring')
const game = require('../commonjs/lib')
const express = require('express')
const url = require('url')

let count = 0

let playerLastAction = null
let playerCount = 0

const app = express()

app.get('/favicon.ico',function(request, response){
  response.writeHead(200)
  response.end()
  // response.statsu(200)
  return
})

app.get('/api/game', function(request, response) {
  const playerAction = request.query.action

  if(playerAction === playerLastAction) {
    playerCount++
  }
  playerLastAction = playerAction

  if(playerCount >= 3) {
    response.status(400)
    response.send({time: new Date(),result: '你作弊'})
    return
  }

  const result = game(playerAction)
  if(count >= 3) {
    response.status(500)
    response.send(JSON.stringify({time: new Date(),result: '你赢得太多了，不玩了！'}))
    return
  }
  response.status(200)
  if(result === 1) {
    count++
    response.send(JSON.stringify({time: new Date(),result: '你赢了'}))
  } else if (result === -1) {
    response.send(JSON.stringify({time: new Date(),result: '你输了'}))
  } else {
    response.send(JSON.stringify({time: new Date(),result: '平局'}))
  }
})

app.get('/', function(request, response) {
  playerLastAction = null
  playerCount = 0
  count = 0
  //  这样是下载一个文件
  // response.send(fs.readFileSync(__dirname + '/index.html'))
  // response.status(200)
  // response.send(fs.readFileSync(__dirname + '/index.html'),'utf-8')
  
  response.writeHead(200)
  fs.createReadStream(__dirname + '/index.html')
  .pipe(response)
})

app.listen(3000)