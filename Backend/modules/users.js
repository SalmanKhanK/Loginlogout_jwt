const mongoose=require("mongoose");
const Joi=require("joi");
const jwt=require("jsonwebtoken")
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        unique:true,
        minlength:5,
        maxlength:255,
        require:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024
    }
});
UserSchema.methods.genAuthToken=function(){
    const token=jwt.sign({_id:this._id},"jwtPrivatekey");
    return token
}
const Users=mongoose.model("Users",UserSchema);

function ValidateUsers(user){
    const Schema={
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(1024).required()
    }
    return Joi.validate(user,Schema)
}

exports.Users=Users
exports.validate=ValidateUsers