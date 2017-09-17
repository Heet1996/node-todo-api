const mongoClient=require('mongodb').MongoClient;
 var {ObjectID}=require('mongodb');  //#### Creating var of ObjectID same as const ObjectID=require('mongodb').ObjectID;
// var id =new ObjectID();
// console.log(id);
mongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{
  if(err)
  {
    return console.log("Unable to connect to MongoDB server");

  }
  console.log('Connected to the server');
  //deleteMany
  // db.collection("ToDo").deleteMany({text:"To do something"}).then((res)=>{
  //   console.log(res);
  // });
  //deleteOne

  //findOneAndDelete
  db.collection("User")
  .findOneAndDelete({_id:ObjectID("59bd7162536675e1eca53add")})
  .then((res)=>{console.log(res);},(err)=>{console.log("Cannot delete",err);});
  db.close();

});
