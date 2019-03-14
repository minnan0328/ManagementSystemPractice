var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var moment = require('moment')
var d = moment()
var year = d.get('year')
var month = d.get('month') + 1
var day = d.get('date')
var hours = d.get('hours')
var minutes = d.get('minutes')
var seconds = d.get('seconds')
var datatime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'minnan'
})

/* 取得管理者資料 */
router.get('/administrant', function (req, res) {
  var queryadmin = new Promise((resolve, reject) => {
    connection.query('select * from administrant', (err, rows, fields) => {
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

/* 新增管理者 */
router.post('/administrant/add', function (req, res) {
  var payload = {
    account: req.body.account,
    password: req.body.password,
    name: req.body.name,
    createtime: datatime
  }
  var queryadmin = new Promise((resolve, reject) => {
    connection.query(`select * from administrant where account = "${payload.account}"`, (err, rows, fields) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
  queryadmin.then((result) => {
    var data = {}
    if (result.length === 1) {
      data = {
        success: false,
        message: '註冊帳號重複'
      }
    } else {
      connection.query('INSERT INTO administrant SET ?', payload, (err, rows, fields) => {
        console.log(rows)
        console.log(err)
      })
      data = {
        success: true,
        message: '註冊成功'
      }
    }

    res.send(data)
  }, function (err) {
    console.log(err)
  })
})

/* 修改密碼 */
router.post('/administrant/updatepassword', function (req, res) {
  var payload = {
    account: req.body.account,
    password: req.body.password,
    name: req.body.name
  }
  var queryadmin = new Promise((resolve, reject) => {
    connection.query(`select * from administrant where password = "${payload.password}"`, (err, rows, fields) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
  queryadmin.then((result) => {
    var data = {}
    console.log(result.length)
    if (result.length === 1) {
      data = {
        success: false,
        message: '修改密碼不能相同'
      }
    } else {
      connection.query(`UPDATE administrant SET password = "${payload.password}" where account = "${payload.account}" and name = "${payload.name}"`, (err, rows, fields) => {
        console.log(rows)
        console.log(err)
      })
      data = {
        success: true,
        message: '密碼修改成功'
      }
    }

    res.send(data)
  }, function (err) {
    console.log(err)
  })
})
/* 登入驗證管理者資料 */
router.post('/administrant', function (req, res) {
  var admin = req.body
  var queryadmin = new Promise((resolve, reject) => {
    connection.query(`select * from administrant where account = "${admin.account}" and password = "${admin.password}"`, (err, rows, fields) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
  queryadmin.then((result) => {
    var data = {}
    if (result.length === 1) {
      data = {
        success: true
      }
    } else {
      data = {
        success: false
      }
    }
    res.send(data)
  }, function (err) {
    console.log(err)
  })
})

/* 刪除全部管理者資料 */
router.delete('/administrant/AllDelete', function (req, res) {
  var queryDeleteAdmin = new Promise((resolve, reject) => {
    connection.query('DELETE FROM administrant', (err, rows, fields) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })

  queryDeleteAdmin.then((result) => {
    res.send(result)
  }, function (err) {
    console.log(err)
  })
})

module.exports = router
