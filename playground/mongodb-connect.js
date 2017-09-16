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
  db.collection('ToDo').insertOne({text:"To do something",completed:"false"},(err,res)=>
{
  if(err)
  {
    return console.log("Unable to insert into Collection"+err);
  }
  console.log("Inserted in collection",JSON.stringify(res.ops,undefined,2));
});
db.collection("User").insertOne({name:"Heet",age:21,location:"Mumbai"},(err,res)=>{
  if(err)
  {
    return console.log("Unable to insert :",err);
  }
  console.log(res.ops);
});

  db.close();
});
