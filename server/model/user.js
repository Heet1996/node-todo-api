const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var Schema = mongoose.Schema;

var UserSchema=new Schema({
  email:{
    type:String,
    trim:true,
    required:true,
    minlength:1,
    unique:true,
    validate:{
      validator:(value)=>{
        return validator.isEmail(value);

    },
    message:'{VALUE} is not valid email'
  }
},
  password:{
    type:String,
    minlength:6,
    require:true
  },
  tokens:[ {
    token :{
      type:String,
      require:true
    },
    access:{
      type:String,
      require:true
    }
  }
  ]
});
//instance method
UserSchema.methods.toJSON = function(){
  var user=this;
  var userObject=user.toObject();
  return _.pick(userObject,['_id','email']);

}
UserSchema.methods.generateAuthToken = function (){

  var user=this;
  var access='auth';
  var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
  user.tokens.push({token,access});
  return user.save().then(()=>{return token; });
};
//creating model
var User=mongoose.model("users",UserSchema);
module.exports={User};
