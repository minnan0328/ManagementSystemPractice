var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'minnan'
});

var adminAccount = '';
var adminPassword = '';

/* GET home page. */
router.get('/admin/login', function (req, res, next) {
  res.clearCookie('authorized');
  res.render('login', {
    title: 'ejs',
    flag: 0
  })
  var queryadmin = new Promise((resolve, reject) => {
    connection.query('select * from administrant', (err, rows, fields) => {
      if (err) reject(err);
      else resolve(rows);

    })
  });
  queryadmin.then((result) => {
    var str = JSON.stringify(result);
    var data = JSON.parse(str);
    adminAccount = data[0].account;
    adminPassword = data[0].password;
  }, function (err) {
    console.log(err);
  });
});

/* 登入請求 */
router.post('/admin/login', function (req, res) {
  console.log(req.body)
  if (req.body.account == adminAccount && req.body.password == adminPassword) {
    res.cookie('authorized', req.body.account);
    res.redirect('/admin');
  } else {
    res.render('login', {
      flag: 1
    });
  }
})
router.get('/admin', function (req, res, next) {
  if (req.cookies.authorized) {
    res.render('admin', {
      content: '登入成功！'
    })
  } else {
    res.redirect('/admin/login');
  }
});

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
router.get('/api/v1/users', function (req, res) {
  /* es6 */
  var queryUsersData = new Promise((resolve, reject) => {
    connection.query('select * from user', (err, rows, fields) => {
      if (err) reject(err);
      else resolve(rows);
    })
  });

  queryUsersData.then((result) => {
    var str = JSON.stringify(result);
    var data = JSON.parse(str);
    var userdata = {
      user_id: data[0].user_id,
      username: data[0].username,
      password: data[0].password,
      sex: data[0].sex,
      birthday: data[0].birthday
    }
    res.send(userdata);
  }, function (err) {
    console.log(err);
  });
})


function stringToBoolean(string) {
  switch (string.toLowerCase().trim()) {
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
    case null:
      return false;
    default:
      return Boolean(string);
  }
}

var d = new Date();
var yaer = d.getFullYear();
var month = d.getMonth() + 1;
var day = d.getDate();
var hours = d.getHours();
var minutes = d.getMinutes();
var seconds = d.getSeconds();
var datetime = yaer + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds

/* get minnan users db 註冊會員*/
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
      if (err) reject(err);
      else resolve(rows);
    })
  });

  queryUsers.then((result) => {
    res.send(result);
  }, function (err) {
    console.log(err);
  });
})

/* 刪除全部會員資料 */
router.delete('api/v1/users/AllDelete', function (req, res) {
  var queryDeleteUsers = new Promise((resolve, reject) => {
    connection.query('DELETE FROM user', (err, rows, fields) => {
      if (err) reject(err);
      else resolve(rows);
    })
  });

  queryDeleteUsers.then((result) => {
    res.send(result);
  }, function (err) {
    console.log(err);
  });
})


module.exports = router;