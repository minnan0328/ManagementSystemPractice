var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var moment = require('moment')
var uploadModel = require('./../model/upload-model') // 上传model
// var d = moment().format()
var year = moment().format('YYYY')
var month = moment().format('M')
var day = moment().format('DD')
var hours = moment().format('HH')
var minutes = moment().format('mm')
var seconds = moment().format('ss')
var datatime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'minnan'
})

/* 取得首頁資料 */
router.get('/v1/index', function (req, res) {
  var queryadmin = new Promise((resolve, reject) => {
    connection.query('select * from indexInfo', (err, rows, fields) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
  queryadmin.then((result) => {
    var str = JSON.stringify(result)
    var data = JSON.parse(str)
    res.send(data)
  }, function (err) {
    console.log(err)
  })
})
/* 修改首頁內容 */
router.post('/v1/index', function (req, res) {
  uploadModel.uploadPhoto(req, 'img', function (err, fields, uploadPath) {
    console.log(err)
    console.log(uploadPath)
  })
  var payload = {
    title: req.body.title,
    announce: req.body.announce,
    img: req.body.imgs,
    revisetime: datatime
  }
  console.log(payload)
  // var queryadmin = new Promise((resolve, reject) => {
  //   connection.query(`INSERT INTO administrant SET ?`, payload, (err, rows, fields) => {
  //     if (err) reject(err)
  //     else resolve(rows)
  //   })
  // })
  // queryadmin.then((result) => {
  //   res.send(result)
  // }, function (err) {
  //   console.log(err)
  // })
})
