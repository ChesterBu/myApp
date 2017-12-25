var settings = require('../settings');
var mongoose = require('mongoose');
mongoose.connection.openUri(settings.dburl);
mongoose.model('User',new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    passwd:{type:String,required:true},
    avatar:{type:String,required:true}
}));
global.Model = function(type){
    return mongoose.model(type);
}
