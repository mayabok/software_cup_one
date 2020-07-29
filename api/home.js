const express = require('express')
const moment = require('moment')

const router = express.Router()

const Formdata = require('../models/formdata')
const User = require('../models/user')

const GLOBAL = require('../public/js/GLOBAL')

router.get('/dashboard/data', (req, res) => {
  let user = req.session.user
  // 如果没有用户跳转到登录页面
  if (!user) {
    res.status(200).json({
      code: 1,
      message: 'user not login'
    })
  }
  
  let submit_time_day = moment().format('YYYY-MM-DD')

  Formdata.find({
      academy: user.academy,
      major: user.major,
      classNum: user.classNum,
      submit_time_day: submit_time_day
    },
    (err, data) => {
      if (err) {
        return res.status(500).json({
          code:500,
          message: 'internet err!'
        })
      }

      User.find({
        academy: user.academy,
        major: user.major,
        classNum: user.classNum,
        profession: 0
      }, (err, user_student) => {
        if (err) {
          return res.status(500).json({
            code: 500,
            message: 'internet err'
          })
        }

        let submited_num = data.length
        let user_students_num = user_student.length

        return res.status(200).json({
          code: 0,
          submited_num: submited_num,
          user_students_num: user_students_num,
          message: 'ok'
        })
      })
    }
  )

})

router.get('/dashboard/health', (req, res) => {
  let user = req.session.user
  // 如果没有用户跳转到登录页面
  if (!user) {
    res.status(200).json({
      code: 1,
      message: 'user not login'
    })
  }

  let submit_time_day = moment().format('YYYY-MM-DD')

  Formdata.find({
    academy: user.academy,
    major: user.major,
    classNum: user.classNum,
    submit_time_day: submit_time_day
  }, (err, forms) => {
    if (err) {
      return res.status(500).json({
        code:500,
        message: 'internet err!'
      })
    }

    res.status(200).json({
      code: 0, 
      forms,
      health_option: GLOBAL.health_option
    })

    // Formdata.find({
    //   academy: user.academy,
    //   major: user.major,
    //   classNum: user.classNum,
    //   submit_time_day: submit_time_day,
    //   health_condition: '健康'
    // }, (err, health) => {
    //   if (err) {
    //     return res.status(500).json({
    //       code:500,
    //       message: 'internet err!'
    //     })
    //   }
    //   let submited_num = submited.length
    //   let health_num = health.length
    //   res.status(200).json({
    //     code: 0,
    //     submited_num,
    //     health_num
    //   })
    // })
  })
})

module.exports = router
