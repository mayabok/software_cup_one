const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log('数据库连接成功')
})

mongoose.connection.on('disconnected', () => {
  console.log('数据库断开')
})

mongoose.connection.on('error', () => {
  console.log('数据库连接异常')
})

module.exports = mongoose
