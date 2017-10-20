// var env=process.env.NODE_ENV || 'development';
// console.log('env *********',env);
// if(env==='development')
// {process.env.PORT=3000;
//
//
// }
// else if(env==='test')
// {
//   process.env.PORT=3000;
// }
var {mongoose} = require('./db/mongoose');
var {Todo}=require('./model/todo');
var {User}=require('./model/user');
var {authenticate}=require('./middleware/authenticates');
var _=require('lodash');
var port=process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var app=express();
app.use(bodyParser.json());
app.post('/todos',(req,res)=>{

   var todo=new Todo({
     text: req.body.text
   });

   todo.save().then((doc)=>{
     res.status(200).send(doc);}
     ,(err)=>{res.status(400).send(err);
   });
});
app.get('/todos',(req,res)=>{
  Todo.find().then((doc)=>{
    res.status(200).send({doc});
  });
});
app.get('/todos/:id',(req,res)=>
{
  var id=req.params.id;

  if(!(ObjectID.isValid(id)))
  return res.status(404).send();
  Todo.findById(id).then((todo)=>{
          if(todo)
          return res.send({todo});
          res.status(404).send();
  },(err)=>{ res.status(400).send()});
}
);
app.delete('/todos/:id',(req,res)=>{

    var id=req.params.id;

    if(!(ObjectID.isValid(id)))
    return res.status(404).send();
    Todo.findByIdAndRemove(id).then((todo)=>{
            if(todo)
            return res.send({todo});
            return res.status(404).send();

    },(err)=>{ res.status(400).send()});

});
app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!(ObjectID.isValid(id)))
  return res.status(404).send();
  var body= _.pick(req.body,['text','completed']);
  if(_.isBoolean(body.completed) && body.completed)
  body.completionTime=new Date().getTime();
  else {
    body.completed=false;
    body.completionTime=null;

  }
  Todo.findByIdAndUpdate(id,{$set:body},{new:true})
  .then((todo)=>{ if(!todo)
                    {
                      res.status(404).send();
                    }
                  res.send({todo})

                })
  .catch((err)=>{res.status(400).send()})

});
//authentication
var authenticate=(req,res,next)=>{
  var token=req.header('x-auth');

  User.findByToken(token).then((user)=>{
    if(!user)
    {
      return Promise.reject("User not found");
    }
    req.user=user;
    req.token=token;
    next();
  }).catch((err)=>{res.status(401).send(err)});
};

app.get('/user/me',authenticate,(req,res)=>{

res.status(200).send(req.user);
});
//User
app.post('/users',(req,res)=>{
  var body=_.pick(req.body,['email','password']);
  var user=new User(body);
   user.save()
  .then(()=>{return user.generateAuthToken();})
  .then((token)=>{res.header('x-auth',token).send(user);})
  .catch((err)=>{res.status(400).send(err)});

});
//creating Model
// var Todo=mongoose.model("Todo",{
//   text:{
//     type:String
//   }
//   ,completed:{
//     type:Boolean
//   }
//   ,completionTime:{
//     type:Number}
// });
// //save the Model
// var todo=new Todo({
//   text:"Something to be done",
//   completionTime:123
// });
// todo.save().then((doc)=>{console.log("save todo",doc);},(err)=>{console.log("unable to save"+err);});

// newUser.save().then((doc)=>{console.log(doc);},(err)=>{console.log(err);});
app.listen(port,()=>{
  console.log("Server is active",port);
});
module.exports={app};
