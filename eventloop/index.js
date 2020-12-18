const eventloop = {
  queue: [],
  timeoutQueue: [],
  fsqueue: [],
  // 程序运行时 就会一致轮询
  loop() {
    console.log('轮询了一次')
    console.log(this.queue)
    while(this.queue.length) {
      var callBack = this.queue.shift()
      callBack && callBack()
    }
    while(this.timeoutQueue.length) {

    }
    fsqueue.forEach(item=>{
      if(item.done) {
        // ****
      }
    })

    setTimeout(this.loop.bind(this),500)
  },
  add(callBack) {
    this.queue.push(callBack)
    console.log(this.queue)
  }
}

eventloop.loop()

setTimeout(()=>{
  eventloop.add(function(){
    console.log('添加了一个事件')
  })
},1000)

setTimeout(()=>{
  eventloop.add(function(){
    console.log('添加了第二个事件')
  })
},2000)