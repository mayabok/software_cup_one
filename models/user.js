const mongoose = require('./database')

const Schema = mongoose.Schema

let userSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    required: true
  },
  academy: {
    type: String,
    require: true
  },
  major: {
    type: String,
    require: true
  },
  classNum: {
    type: String,
    require: true
  },
  user_num: {
    type: String,
    require: true
  },
  // 0为学生 1为老师
  profession: {
    type: Number,
    require: true
  },
  last_submit: {
    type: Date
  }
})

module.exports = mongoose.model('User', userSchema)
