var settings = require('../settings');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connection.openUri(settings.dburl);
mongoose.model('User',new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    passwd:{type:String,required:true},
    avatar:{type:String,required:true}
}));
mongoose.model('Article',new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    createAt:{type:String,default:Date.now},
    user:{type:ObjectId,ref:'User'}
}));
global.Model = function(type){
    return mongoose.model(type);
}
