const mongoClient=require('mongodb').MongoClient;
// var {ObjectID}=require('mongodb');  //#### Creating var of ObjectID same as const ObjectID=require('mongodb').ObjectID;
// var id =new ObjectID();
// console.log(id);
mongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{
  if(err)
  {
    return console.log("Unable to connect to MongoDB server");

  }
  console.log('Connected to the server');
  // db.collection('ToDo')
  // .find()
  // .toArray()
  // .then((res)=>{console.log(JSON.stringify(res,undefined,2));},(err)=>{console.log(err);});
  // db.close();
  db.collection("User")
    .find({name:"Jon"})
    .count()
    .then((res)=>{console.log(res);},(err)=>{console.log("Error");});
  db.close();  

});
