var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var fs = require('fs')
var moment = require('moment')
// var uploadModel = require('./../model/upload-model') // 上传model
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
  var img = req.body.img
  // console.log(img)
  // console.log(req)
  // uploadModel.uploadPhoto(req, 'img', function (err, fields, uploadPath) {
  //   console.log('uploadModel')
  //   console.log('err', err)
  //   console.log('uploadPath', uploadPath)
  // })
  const filename = `./../static/img/${datatime}.png`
  fs.readFileSync(filename, img, 'base64', function (err) {
    if (err) return
    console.log('图片保存成功')
  })
  const imgs = fs.readFileSync(filename)
  console.log(imgs)
  res.send('OK')

  // var payload = {
  //   title: req.body.title,
  //   announce: req.body.announce,
  //   img: req.body.img,
  //   revisetime: datatime
  // }
  // console.log(payload)
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

// /* get minnan db id */
// router.get('/test/:id', function (req, res) {
//   var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'minnan'
//   });
//   var id = req.params.id;
//   console.log(id);

//   /* es6 */
//   var queryUserByCity = new Promise((resolve, reject) => {
//     connection.query('select * from user where id =' + id, (err, rows, fields) => {
//       if (err) reject(err);
//       else resolve(rows);
//     })
//   });

//   queryUserByCity.then((result) => {
//     res.send(result);
//   }, function (err) {
//     console.log(err);
//   });
// })

// /* get minnan db */
router.get('/v1/users', function (req, res) {
  /* es6 */
  var queryUsersData = new Promise((resolve, reject) => {
    connection.query('select * from user', (err, rows, fields) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })

  queryUsersData.then((result) => {
    var str = JSON.stringify(result)
    var data = JSON.parse(str)
    var userdata = {
      user_id: data[0].user_id,
      username: data[0].username,
      password: data[0].password,
      sex: data[0].sex,
      birthday: data[0].birthday
    }
    res.send(userdata)
  }, function (err) {
    console.log(err)
  })
})

function stringToBoolean (string) {
  switch (string.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true
    case 'false':
    case 'no':
    case '0':
    case null:
      return false
    default:
      return Boolean(string)
  }
}

var d = new Date()
var yaer = d.getFullYear()
var month = d.getMonth() + 1
var day = d.getDate()
var hours = d.getHours()
var minutes = d.getMinutes()
var seconds = d.getSeconds()
var datetime = yaer + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds

/* get minnan users db 註冊會員 */
router.post('/api/v1/users', function (req, res) {
  var paylad = {
    username: req.body.username,
    password: req.body.password,
    birthday: req.body.birthday,
    sex: stringToBoolean(req.body.sex),
    createtime: datetime
  }

  var queryUsers = new Promise((resolve, reject) => {
    // connection.query(`INSERT INTO user (username,password,b_time,sex) VALUES ("${paylad.username}","${paylad.password}","${paylad.b_time}",${paylad.sex})`, (err, rows, fields) => {
    connection.query('INSERT INTO user SET ?', paylad, (err, rows, fields) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })

  queryUsers.then((result) => {
    res.send(result)
  }, function (err) {
    console.log(err)
  })
})

/* 刪除全部會員資料 */
router.delete('/v1/users/AllDelete', function (req, res) {
  var queryDeleteUsers = new Promise((resolve, reject) => {
    connection.query('DELETE FROM user', (err, rows, fields) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })

  queryDeleteUsers.then((result) => {
    res.send(result)
  }, function (err) {
    console.log(err)
  })
})

module.exports = router
