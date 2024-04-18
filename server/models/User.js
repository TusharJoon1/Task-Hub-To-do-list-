const mongoose = require('mongoose');
const emailvalidator=require('email-validator');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, 
        validator:function(){
            return emailvalidator.validate(this.email);
        }},
    password: { type: String, required: true , minLength:8},
    cpassword: { type: String, required: true , minLength:8,
        validate:function(){
            return this.confirmPassword=this.password
        }}

});

//use of HOOKS to do some work before or after save in database
//with the help of .pre and .post
// this se hum pura schema mil jayega

// UserSchema.pre('save',function(){
//     this.cpassword=undefined
//   });
  
//User in
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;


// {name,email,password,cpassword}