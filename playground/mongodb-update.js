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
  db.collection("User")
  .findOneAndUpdate({_id:new ObjectID("59bd512f37cfaa1f601fc769")},{$inc:{age:1},$set:{name:"Rike"}},{returnOriginal:false})
  .then((res)=>{
    console.log(res);
  });
  db.close();
});
