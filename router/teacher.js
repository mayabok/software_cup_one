const express = require('express')
const moment = require('moment')

const Formdata = require('../models/formdata')
const User = require('../models/user')

const router = express.Router()

const GLOBAL = require('../public/js/GLOBAL')

router.get('/dashboard', (req, res) => {
  let user = req.session.user
  let submit_time_day = moment().format('YYYY-MM-DD')

  // console.log(user)
  Formdata.find({
      academy: user.academy,
      major: user.major,
      classNum: user.classNum,
      submit_time_day: submit_time_day
    },
    (err, data) => {
      if (err) {
        return res.status(500).render('500.html')
      }

      User.find({
        academy: user.academy,
        major: user.major,
        classNum: user.classNum,
        profession: 0
      }, (err, user_student) => {
        if (err) {
          return res.status(500).render('500.html')
        }

        let submited_num = data.length
        let user_student_num = user_student.length
        
        res.render('admin/home.html', {
          user: user,
          data: data,
          submited_num: submited_num,
          user_student_num: user_student_num,
          health_option: GLOBAL.health_option
        })
      })
    }
  )
})

router.get('/history', (req, res) => {
  let user = req.session.user
  if (!user) res.redirect('/500')

  let submit_time_day = moment().format('YYYY-MM-DD')

  Formdata.find({
    academy: user.academy,
    major: user.major,
    classNum: user.classNum,
    submit_time_day: {
      $ne: submit_time_day
    }
  }, (err, data) => {
    if (err) {
      return console.log(err)
      
    } 
    // console.log(data)
    res.render('admin/history.html', {
      data,
      user,
      health_option: GLOBAL.health_option
    })
  })
})

router.post('/dashboard/search', (req, res) => {
  // console.log(req.body)
  let user = req.session.user
  let submit_time_day = moment().format('YYYY-MM-DD')

  let keyword =  req.body.search
  let option_condition = GLOBAL.health_option

  let reg_health_condition = new Array
  for (let i = 0; i < option_condition.length; i++) {
    if (fuzzyMatch(option_condition[i], keyword))
      reg_health_condition.push(i.toString())
  }
  console.log(reg_health_condition)
  

  const reg = new RegExp(keyword, 'i')
  // console.log(user)
  Formdata.find({
      academy: user.academy,
      major: user.major,
      classNum: user.classNum,
      submit_time_day: submit_time_day,
      $or: [
        {province: { $regex: reg }},
        {city: { $regex: reg }},
        {area: { $regex: reg }},
        {unit: { $regex: reg }},
        {health_condition: { $all: reg_health_condition} },
        {submit_time_format: { $regex: reg }},
        {name: { $regex: reg }}
      ]
    },
    (err, data) => {
      if (err) {
        console.log(err)
        
        return res.status(500).render('500.html')
      }

      User.find({
        academy: user.academy,
        major: user.major,
        classNum: user.classNum,
        profession: 0
      }, (err, user_student) => {
        if (err) {
          return res.status(500).render('500.html')
        }

        let submited_num = data.length
        let user_student_num = user_student.length
        
        res.render('admin/home.html', {
          user: user,
          data: data,
          submited_num: submited_num,
          user_student_num: user_student_num,
          health_option: GLOBAL.health_option
        })
      })
    }
  )
})

router.post('/history/search', (req, res) => {
  // console.log(req.body)
  let user = req.session.user
  if (!user) redirect('/500')
  let submit_time_day = moment().format('YYYY-MM-DD')

  let keyword =  req.body.search

  let option_condition = GLOBAL.health_option

  let reg_health_condition = new Array
  for (let i = 0; i < option_condition.length; i++) {
    if (fuzzyMatch(option_condition[i], keyword))
      reg_health_condition.push(i.toString())
  }

  const reg = new RegExp(keyword, 'i')
  // console.log(user)
  Formdata.find({
      academy: user.academy,
      major: user.major,
      classNum: user.classNum,
      submit_time_day: {
        $ne: submit_time_day
      },
      $or: [
        {province: { $regex: reg }},
        {city: { $regex: reg }},
        {area: { $regex: reg }},
        {unit: { $regex: reg }},
        {health_condition: { $all: reg_health_condition} },
        {submit_time_format: { $regex: reg }},
        {name: { $regex: reg }}
      ]
    },
    (err, data) => {
      if (err) {
        console.log(err)
        
        return res.status(500).render('500.html')
      }

      User.find({
        academy: user.academy,
        major: user.major,
        classNum: user.classNum,
        profession: 0
      }, (err, user_student) => {
        if (err) {
          return res.status(500).render('500.html')
        }

        let submited_num = data.length
        let user_student_num = user_student.length
        
        res.render('admin/history.html', {
          user: user,
          data: data,
          submited_num: submited_num,
          user_student_num: user_student_num,
          health_option: GLOBAL.health_option
        })
      })
    }
  )
})

function fuzzyMatch(str, key) {
  let index = -1, flag = false;
  for(let i = 0, arr = key.split(""); i < arr.length; i++ ){
      //有一个关键字都没匹配到，则没有匹配到数据
      if(str.indexOf(arr[i]) < 0){
          break;
      }else{
          let match = str.matchAll(arr[i]);
          let next = match.next();
          while (!next.done){
              if(next.value.index > index){
                  index = next.value.index;
                  if(i === arr.length - 1){
                      flag = true
                  }
                  break;
              }
              next = match.next();
          }

      }
  }
  return flag
}

module.exports = router
