const http = require("http")
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')
const game = require('../commonjs/lib')

let count = 0

let playerLastAction = null
let playerCount = 0

http
  .createServer(function (request, response) {
    const parseUrl = url.parse(request.url)
    if( parseUrl.pathname === '/favicon.ico' ) {
      response.writeHead(200)
      response.end()
      return
    }

    if(parseUrl.pathname === '/api/game') {
      const query = querystring.parse(parseUrl.query)
      const playerAction = query.action

      if(playerAction === playerLastAction) {
        playerCount++
      }
      playerLastAction = playerAction

      if(playerCount >= 3) {
        response.writeHead(400)
        response.end(JSON.stringify({time: new Date(),result: '你作弊'}))
        return
      }

      const result = game(playerAction)
      if(count >= 3) {
        response.writeHead(500)
        response.end(JSON.stringify({time: new Date(),result: '你赢得太多了，不玩了！'}))
        return
      }
      response.writeHead(200)
      if(result === 1) {
        count++
        response.end(JSON.stringify({time: new Date(),result: '你赢了'}))
      } else if (result === -1) {
        response.end(JSON.stringify({time: new Date(),result: '你输了'}))
      } else {
         response.end(JSON.stringify({time: new Date(),result: '平局'}))
      }
    }

    if(parseUrl.pathname === '/') {
      playerLastAction = null
      playerCount = 0
      count = 0
      response.writeHead(200)
      fs.createReadStream(__dirname + '/index.html')
      .pipe(response)
    }
  })
  .listen(3000)