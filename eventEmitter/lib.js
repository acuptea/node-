const EventEmitter = require('events').EventEmitter

class GeekTime extends EventEmitter {
  constructor() {
    super()
    setInterval(()=>{
      this.emit('newlesson',{price: Math.random()*100})
    },3000)
  }
}

// const geekTime = new GeekTime()
// new 不需要传参时 可以不用加括号
const geekTime = new GeekTime

module.exports = geekTime