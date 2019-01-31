var express = require('express')
var fs = require('fs')
var path = require('path')
var createError = require('http-errors')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
// var bodyParser = require('body-parser')
var Admin = require('./api/admin')
var userRouter = require('./api/db_user')
// var indexInfo = require('./api/db_index')
var app = express()

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//   extended: false
// }))
app.use(logger('dev'))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
    limit: '50mb'
  })
)
app.use(cookieParser())

app.use('/admin', Admin)
app.use('/api', userRouter)
// app.use('/', indexInfo)
// // 訪問靜態資源
app.use(express.static(path.resolve(__dirname, '../dist')))
// 訪問單頁
app.get('*', function (req, res) {
  var html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  // res.json({
  //   message: err.message,
  //   error: err
  // })
  res.render('error')
})

// 監聽
app.listen(8081, function () {
  console.log('success listen...8081')
})

module.exports = app