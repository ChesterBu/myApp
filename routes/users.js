var express = require('express');
var router = express.Router();

/* 用户注册*/
router.get('/reg', function(req, res, next) {
  res.render('users/reg',{title:'用户注册'});
});
router.post('/reg', function(req, res, next) {
  var user = req.body;
  if(user.passwd !== user.repasswd){
      req.flash('error','两次密码输入不一致');
      return res.redirect('back');
  }
  delete user.repasswd;
  user.passwd = blogUtil.md5(user.passwd);
  user.avatar = 'https://secure.gravatar.com/avatar/'+blogUtil.md5(user.email)+'?s=48';
  new Model('User')(user).save(function(err,doc){
      if(err){
          req.flash('error','保存失败');
          return res.redirect('back');
      } else {
          req.session.user = doc;
          req.flash('success','注册成功');
          req.flash('success','欢迎光临');
          res.redirect('/');
      }
  })
});

/* 用户登录*/
router.get('/login', function(req, res, next) {
  res.render('users/login',{title:'用户登录'});
});
router.post('/login', function(req, res, next) {
  res.redirect('/');
});

/* 用户退出*/
router.get('/logout', function(req, res, next) {
    req.session.user = null;
  res.redirect('/');
});

module.exports = router;
