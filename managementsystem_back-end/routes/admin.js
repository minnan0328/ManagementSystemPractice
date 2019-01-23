var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/admin', function (req, res, next) {
  console.log(req.cookies.authorized)
  if (req.cookies.authorized) {
    res.render('admin', {
      content: '登入成功！'
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;