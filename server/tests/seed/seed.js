const {ObjectID} = require('mongodb');
const {Todo} = require('./../../model/todo');
const jwt = require('jsonwebtoken');
const {User} = require('./../../model/user');

var user1=new ObjectID();
var user2=new ObjectID();
var dummy=[
  { _id:new ObjectID(),
    text:"My first todo",
    _creator:user1
  },
  { _id:new ObjectID(),
    text:"My second todo",
    _creator:user2
  }
];
var dummyUser=[
  { _id:user1,
    email:"heet1@live.com",
    password:"123456!",
    tokens:[
      {
        token:jwt.sign({_id:user1,access:"auth"},process.env.JWT_token).toString(),
        access:"auth"
      }
    ]
  },
  { _id:user2,
    email:"heet2@live.com",
    password:"123456!123"
  }
];
var populateData=(done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(dummy);
  }).then(()=>done());

}
var populateUser=(done)=>{
User.remove({}).then(()=>{

var user1=new User(dummyUser[0]).save();
var user2=new User(dummyUser[1]).save();
return Promise.all([user1,user2]);
}).then(()=>done());

}
module.exports={dummy,populateData,dummyUser,populateUser};
