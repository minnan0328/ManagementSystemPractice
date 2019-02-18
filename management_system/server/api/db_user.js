var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var fs = require('fs')
// var moment = require('moment')
// var year = moment().format('YYYY')
// var month = moment().format('M')
// var day = moment().format('DD')
// var hours = moment().format('HH')
// var minutes = moment().format('mm')
// var seconds = moment().format('ss')
// var dataTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'minnan'
})

/* 取得首頁最後一筆新增資料 */
router.post('/v1/index', function (req, res) {
  var queryindex = new Promise((resolve, reject) => {
    connection.query('select * from indexInfo', (err, rows, fields) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
  queryindex.then((result) => {
    var str = JSON.stringify(result)
    var data = JSON.parse(str)
    var url = data[data.length - 1].img
    var imgUrl = fs.readFileSync(url, {
      encoding: 'base64'
    })
    var indexInfo = {
      img: imgUrl,
      title: data[data.length - 1].title,
      announce: data[data.length - 1].announce,
      revisetime: data[data.length - 1].revisetime
    }
    res.send(indexInfo)
  }, function (err) {
    console.log(err)
  })
})
/* 取得首頁全部新增資料 */
router.post('/v1/index/all', function (req, res) {
  var queryindex = new Promise((resolve, reject) => {
    connection.query('select * from indexInfo', (err, rows, fields) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
  queryindex.then((result) => {
    var str = JSON.stringify(result)
    var data = JSON.parse(str)
    data.forEach(item => {
      item.img = fs.readFileSync(item.img, {
        encoding: 'base64'
      })
    })
    res.send(data)
  }, function (err) {
    console.log(err)
  })
})
/* 新增首頁內容 */
router.post('/v1/index/add', function (req, res) {
  var moment = require('moment')
  var year = moment().format('YYYY')
  var month = moment().format('M')
  var day = moment().format('DD')
  var hours = moment().format('HH')
  var minutes = moment().format('mm')
  var seconds = moment().format('ss')
  var dataTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  var imgsDataTime = year + month + day + hours + minutes + seconds
  var img = req.body.img
  let base64 = img.replace(/^data:image\/\w+;base64,/, '')
  let dataBuffer = new Buffer(base64, 'base64')
  let imgPath = `./server/static/img/${imgsDataTime}.png`
  fs.writeFileSync(imgPath, dataBuffer, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('保存圖片成功')
    }
  })

  var payload = {
    title: req.body.title,
    announce: req.body.announce,
    img: imgPath,
    revisetime: dataTime
  }
  console.log(imgPath)
  var queryaindex = new Promise((resolve, reject) => {
    connection.query(`INSERT INTO indexInfo SET ?`, payload, (err, rows, fields) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
  queryaindex.then((result) => {
    var data = {
      success: result.protocol41,
      message: result.message
    }
    res.send(data)
  }, function (err) {
    console.log(err)
  })
})
/* 根據ID刪除首頁資料 */
router.post('/v1/index/delete:id', function (req, res) {
  var id = req.body.id
  var queryDeleteUsers = new Promise((resolve, reject) => {
    connection.query(`DELETE FROM indexInfo where index_id = ${id}`, (err, rows, fields) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })

  queryDeleteUsers.then((result) => {
    var data = {
      success: result.protocol41,
      message: result.message
    }
    res.send(data)
  }, function (err) {
    console.log(err)
  })
})

/* 刪除全部會員資料 */
router.post('/v1/index', function (req, res) {
  var queryDeleteUsers = new Promise((resolve, reject) => {
    connection.query('DELETE FROM indexInfo', (err, rows, fields) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })

  queryDeleteUsers.then((result) => {
    var data = {
      success: result.protocol41,
      message: result.message
    }
    res.send(data)
  }, function (err) {
    console.log(err)
  })
})

/* 取得該ID資料 */
// /* get minnan db id */
// router.get('/users/:id', function (req, res) {
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

/* get minnan users db 註冊會員 */
router.post('/api/v1/users', function (req, res) {
  var moment = require('moment')
  var year = moment().format('YYYY')
  var month = moment().format('M')
  var day = moment().format('DD')
  var hours = moment().format('HH')
  var minutes = moment().format('mm')
  var seconds = moment().format('ss')
  var dataTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  var paylad = {
    username: req.body.username,
    password: req.body.password,
    birthday: req.body.birthday,
    sex: stringToBoolean(req.body.sex),
    createtime: dataTime
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
