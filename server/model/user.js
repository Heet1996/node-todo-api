const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
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
UserSchema.statics.findByToken=function(token){
  var User=this;
  var decode;

  try{
    decode=jwt.verify(token,"abc123");

  }
  catch(e)
  {
    return Promise.reject();
  }


return User.findOne({
    '_id':decode._id,
    'tokens.token':token,
    'tokens.access':'auth'
  });
}
UserSchema.statics.findUser=function(email,password){
  var User=this;
  return User.findOne({email})
  .then((user)=>{

    if(!user) return Promise.reject("User not found")

      return new Promise((resolve,reject)=>{
      bcrypt.compare(password,user.password).then((data)=>{
      if(data==true)
      {
        resolve(user);
}
      else{
        reject();
      }})
    }).catch((e)=>{res.status(400).send(e)})

  }).catch((err)=>{res.status(400).send(err);})
}
UserSchema.pre('save',function(next){
  var user=this;
  if(user.isModified('password'))
  {bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(user.password,salt,(err,hash)=>{
        user.password=hash;

        next();
    });
  });
  }
  else next();

});
UserSchema.methods.logoutUser=function(token){

  var user=this;
  return user.update({
    $pull:{
        tokens:{
        token:token
      }
    }
  })
}
//creating model
var User=mongoose.model("users",UserSchema);
module.exports={User};
