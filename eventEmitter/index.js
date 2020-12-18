const geekTime = require('./lib')

geekTime.addListener('newlesson',(res)=>{
  if(res.price < 80) {
    console.log(`买它，pirce：${res.price}`)
  }
})