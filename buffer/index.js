const protobuf = require('protocol-buffers')
const fs = require('fs')

// buffer创建
const buffer1 = Buffer.from([1,2,3])
const buffer2 = Buffer.from('test')
// 指定buffer长度
const buffer3 = Buffer.alloc(20)

console.log(buffer1)
console.log(buffer2)
console.log(buffer3)

// buffer读取  BE与LE表示是高位放前面还是后面 BE是前面 不同模块与后台需要用不同的
// 第二个参数表示offset
buffer1.writeInt8(12,1)
console.log(buffer1)
buffer2.writeInt16LE(512,2)
console.log(buffer2)

// 使用protocal-buffers组装数据格式
const messages = protobuf(fs.readFileSync(__dirname +  '/test.proto','utf-8'))
console.log(messages)
// encode
const buf = messages.Column.encode({
  id: 42,
  name: 'hello world',
  price: 23.1
})
// decode
console.log(messages.Column.decode(buf))