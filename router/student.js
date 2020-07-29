const express = require('express')
const moment = require('moment')

const router = express.Router()
const Formdata = require('../models/formdata')
const User = require('../models/user')
const formdata = require('../models/formdata')

const GLOBAL = require('../public/js/GLOBAL')

router.get('/', (req, res) => {
  // res.render('admin/home.html')
  let user = req.session.user
  if (!user) {
    res.redirect('/login')
  } else if (user.profession === 0) {
    res.redirect('/formpage')
  } else if (user.profession === 1) {
    res.redirect('/dashboard')
  }
})

// 渲染表单页面
router.get('/formpage', (req, res) => {
  let user = req.session.user
  if (!user) res.redirect('/login')
  
  let now = moment().format('YYYY-MM-DD')
  let last = moment(user.last_submit).format('YYYY-MM-DD')
  
  let issue_time = moment().format('MM月DD日')
  let cut_of_time = moment().format('YYYY-MM-DD')
  

  if (user.last_submit && now === last) {
    console.log('您已提交')
    

    return res.render('students/formed.html', {
      user: user,
      health_option: GLOBAL.health_option,
      issue_time,
      cut_of_time
    })
    
  }
    
  res.render('students/form.html', {
    user: user,
    health_option: GLOBAL.health_option,
    issue_time,
    cut_of_time
  })
})

// 提交表单数据

router.post('/formpage', (req, res) => {
  // console.log('测试：student.js')

  let date = new Date()
  let user = req.session.user
  let formData = req.body

  formData.submit_time = date
  formData.academy = user.academy
  formData.major = user.major
  formData.classNum = user.classNum
  formData.user_num = user.user_num
  formData.name = user.name
  formData.submit_time_format = moment(date).format('YYYY-MM-DD HH:mm')
  formData.submit_time_day = moment(date).format('YYYY-MM-DD')
  
  let last_submit_day = moment(user.last_submit).format('YYYY-MM-DD')

  // console.log(user)
  
  
  if (user.last_submit && last_submit_day === formData.submit_time_day) {
    return res.status(200).json({
      code: 1,
      message: 'already submit today'
    })
  }

  User.updateOne({
    user_num: user.user_num
  }, {
    $set: {
      last_submit: date
    }
  }, (err, res) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        message: 'Internal error.'
      })
    }
    user.last_submit = date
    console.log(res)
  })
  new Formdata(formData).save((err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        message: 'Internal error.'
      })
    }
    res.status(200).json({
      code: 0,
      message: 'OK'
    })
    console.log('提交成功')
  })
})


// 获取用户当天提交的数据
router.get('/lastFormdata', (req, res) => {
  let user = req.session.user
  let submit_time_day = moment().format('YYYY-MM-DD')

  Formdata.findOne({
    user_num: user.user_num,
    submit_time_day
  }, (err, formdata) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        message: err.message
      })
    }

    res.status(200).json({
      code: 200,
      message: 'ok',
      formdata: formdata
    })
    
  })
})

router.get('/submithistory', (req, res) => {
  let user = req.session.user
  if (!user) redirect('/login')

  Formdata.find({
    user_num: user.user_num
  }, (err, data) => {
    if (err) {
      return res.status(500).render('500.html')
    }

    res.render('students/submit_record.html', {
      user,
      data,
      health_option: GLOBAL.health_option
    })
  })
})

router.get('/update', (req, res) => {
  let user = req.session.user
  if (!user) res.redirect('/login')

  let issue_time = moment().format('MM月DD日')
  let cut_of_time = moment().format('YYYY-MM-DD')  

  res.render('students/update.html', {
    health_option: GLOBAL.health_option,
    user,
    issue_time,
    cut_of_time
  })
})

router.post('/update', (req, res) => {
  // console.log(req.body)
  let form = req.body
  let user = req.session.user
  let submit_time = new Date()
  let submit_time_day = moment(submit_time).format('YYYY-MM-DD')
  let submit_time_format = moment(submit_time).format('YYYY-MM-DD HH:mm')

  console.log(form)
  

  Formdata.updateOne({
    user_num: user.user_num,
    submit_time_day
  }, {
    $set: {
      province: form.province,
      city: form.city,
      area: form.area,
      unit: form.unit,
      health_condition: form.health_condition,
      submit_time,
      submit_time_format
    }
  }, (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        message: err.message
      })
    }

    res.status(200).json({
      code: 0,
      message: 'ok'
    })
  })
})

module.exports = router
