const mongoose = require('./database')

const Schema = mongoose.Schema

let formSchema = new Schema({
  user_num: {
    type: String,
    require: true
  },
  // 省
  province: {
    type: String,
    require: true
  },
  // 市
  city: {
    type: String,
    require: true
  },
  // 区
  area: {
    type: String,
    require: true
  },
  // 所在单位
  unit: {
    type: String,
    require: true
  },
  health_condition: {
    type: Array,
    require: true
  },
  submit_time: {
    type: Date,
    require: true
  },
  submit_time_format: {
    type: String,
    require: true
  },
  submit_time_day: {
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
  name: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Formdata', formSchema)
