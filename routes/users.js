var express = require('express');
var router = express.Router();

/* 用户注册*/
router.get('/reg', function(req, res, next) {
  res.render('users/reg',{title:'用户注册'});
});
router.post('/reg', function(req, res, next) {
  res.redirect('/');
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
  res.redirect('/');
});

module.exports = router;
