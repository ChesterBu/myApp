//检查必须登录，不登录就调到登录也
exports.mustLogin = function (req,res,next) {
    if(req.session.user){
        next();
    } else{
        req.flash('error','你尚未登录，请登录');
        res.redirect('user/login');
    }
};

//必须未登陆
exports.mustNotLogin = function (req,res,next) {
    if(req.session.user){
        req.flash('error','你已登录');
        res.redirect('/');
        }else{
        next()
    }
};