var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/add', function(req, res, next) {
  res.render('article/add',{title:'发表文章'});
});

router.post('/add', function(req, res, next) {
  res.redirect('/');
});



module.exports = router;
