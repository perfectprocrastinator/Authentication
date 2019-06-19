var mongoose=require('mongoose');
var passportLocalMongoose=require("passport-local-mongoose");

var userSchema=mongoose.Schema({
    username:String,
    password:String
});
//Takes passport local mongoose package and adds bunch of methods
//that come with package to userSchema
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);