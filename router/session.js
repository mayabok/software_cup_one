//* 注册 登录 退出
const express = require('express')
const session = require('express-session')
const md5 = require('blueimp-md5')

const User = require('../models/user')

const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login.html')
})

router.post('/login', (req, res) => {
  let user = req.body
  user.password = md5(user.password)
  // console.log(user)
  User.findOne({
    user_num: user.user_num,
    password: user.password
  }, (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        message: err.message
      })
    }
    if (!data) {
      return res.status(200).json({
        code: 1,
        message: 'user_num or password is invalid.'
      })
    }
    
    req.session.user = data
    res.status(200).json({
      code: 0,
      message: 'welcome user'
    })
  })
})

router.get('/register', (req, res) => {
  res.render('register.html')
})

// /**
//  * 1. 获取表单数据 req.body
//  * 2. 操作数据库 （判断用户是否存在）
//  * 3. 发送响应
//  */
router.post('/register', (req, res) => {
  let body = req.body
  // console.log(body)
  User.findOne({
    user_num: body.user_num
  }, (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        message: err.message
      })
    }
    if (data) {
      return res.status(200).json({
        code: 1,
        message: 'user number already exists.'
      })
    }

    body.password = md5(body.password)
    // console.log(body)
    
    new User(body).save((err, user) => {
      if (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal error.'
        })
      }

      req.session.user = user

      res.status(200).json({
        code: 0,
        message: 'OK'
      })
    })
  })
})

router.get('/logout', (req, res) => {
  req.session.user = null
  res.redirect('/')
})

module.exports = router
