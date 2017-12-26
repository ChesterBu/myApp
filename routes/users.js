var express = require('express');
var auth = require('../auth');
var router = express.Router();

/* 用户注册*/
router.get('/reg',auth.mustNotLogin, function (req, res, next) {
    res.render('users/reg', {title: '用户注册'});
});
router.post('/reg',auth.mustNotLogin, function (req, res, next) {
    var user = req.body;
    if (user.passwd !== user.repasswd) {
        req.flash('error', '两次密码输入不一致');
        return res.redirect('back');
    }
    delete user.repasswd;
    user.passwd = blogUtil.md5(user.passwd);
    user.avatar = 'https://secure.gravatar.com/avatar/' + blogUtil.md5(user.email) + '?s=48';
    new Model('User')(user).save(function (err, doc) {
        if (err) {
            req.flash('error', '保存失败');
            return res.redirect('back');
        } else {
            req.session.user = doc;
            req.flash('success', '注册成功');
            req.flash('success', '欢迎光临');
            res.redirect('/');
        }
    })
});

/* 用户登录*/
router.get('/login',auth.mustNotLogin, function (req, res, next) {
    res.render('users/login', {title: '用户登录'});
});
router.post('/login',auth.mustNotLogin, function (req, res, next) {
    if (req.body) {
        var user = req.body;
        user.passwd = blogUtil.md5(user.passwd);
        Model('User').findOne(user, function (err, doc) {
            if (err) {
                req.flash('error', '登录查询失败');
                return res.redirect('back')
            } else {
                req.session.user = doc;
                req.flash('success', '登录成功');
                req.flash('success', '欢迎光临');
                res.redirect('/')
            }
        });
    } else {
        req.flash('error', '填写信息不完整');
        return res.redirect('back');
    }
});


    /* 用户退出*/
    router.get('/logout',auth.mustLogin, function (req, res, next) {
        req.session.user = null;
        res.redirect('/');
    });

    module.exports = router;
