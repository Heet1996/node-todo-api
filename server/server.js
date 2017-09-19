var {mongoose} = require('./db/mongoose');
var {Todo}=require('./model/todo');
var {user}=require('./model/user');

const express = require('express');
const bodyParser = require('body-parser');

var app=express();
app.use(bodyParser.json());
app.post('/todos',(req,res)=>{

   var todo=new Todo({
     text: req.body.text
   });

   todo.save().then((doc)=>{
     res.status(200).send(doc);}
     ,(err)=>{console.log("unable to save"+err);
   });
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
app.listen(3000,()=>{
  console.log("Server is active");
});
