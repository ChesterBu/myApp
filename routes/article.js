var express = require('express');
var auth = require('../auth');
var router = express.Router();

/* GET users listing. */
// 添加文章
router.get('/add',auth.mustLogin, function(req, res, next) {
  res.render('article/add',{title:'发表文章'});
});

router.post('/add',auth.mustLogin, function(req, res, next) {
  var article = req.body;
  var user = req.session.user;
  article.user = user._id;
  new Model('Article')(article).save(function (err,article) {
      if (err) {
          req.flash('error', '文章发表失败');
          return res.redirect('back');
      } else {
          req.flash('success', '文章发表成功');
          res.redirect('/')
      }
  })
});



module.exports = router;
