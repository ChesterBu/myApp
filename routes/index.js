var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Model('Article').find({}).populate('user').exec(function (err,articles) {
      res.render('index',{title:'欢迎光临我的博客',article:articles})
  });
});

module.exports = router;
