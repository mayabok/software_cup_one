const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

// 路由
const studentRouter = require('./router/student')
const sessionRouter = require('./router/session')
const teacherRouter = require('./router/teacher')

// 数据接口
const homeApi = require('./api/home')

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// 挂载路由
app.use(studentRouter)
app.use(sessionRouter)
app.use(teacherRouter)

// 挂载API
app.use(homeApi)

app.listen(3000, () => {
  console.log('server running on "http://localhost:3000"')
})
