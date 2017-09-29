const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../model/todo');
var dummy=[
  { _id:new ObjectID(),
    text:"My first todo"
  },
  { _id:new ObjectID(),
    text:"My second todo"
  }
]
beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(dummy);
  }).then(()=>done());

});
describe("Post/Todos",()=>{

  it("should create new todo",(done)=>{
     var text='T';
     request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);

    })
    .end((err,res)=>{
    if(err)
    return done(err);
    Todo.find({text}).then((todos)=>{
      expect(todos.length).toBe(1);
      expect(todos[0].text).toBe(text);
      done();
    }).catch((err)=>done(err));
  });
  }) ;
  it("it should not create text in DB",(done)=>{
    request(app)
    .post("/todos")
    .send({})
    .expect(400)
    .end((err,res)=>{
      if(err){
      return done(err);}
      Todo.find().then((todos)=>{

        expect(todos.length).toBe(2);
        done();
      }).catch((e)=>done(e));


});
});
});
describe("To get all todos",()=>{
  it("should get all todos",(done)=>{
    request(app)
    .get("/todos")
    .expect(200)
    .expect((res)=>{
      expect(res.body.doc.length).toBe(2);
  }).end(done);

  });
});

describe("To get single todo",()=>{
  it("should get a particular todo",(done)=>{
    request(app)
    .get(`/todos/${dummy[0]._id.toHexString()}`)

    .expect((res)=>{
      expect(res.body.todo.text).toBe(dummy[0].text)

    })
    .end(done);
  });
  it("should return 404 on todo not found",(done)=>{
    var hexId=new ObjectID()
    hexId=hexId.toHexString();
    request(app)
    .get(`/todos/${hexId}`)
    .expect(404)
    .end(done)
  }
);
it("should return 404 for invalid ID",(done)=>{
  var id=123;
  request(app)
  .get(`/todos/${id}`)
  .expect(404)
  .end(done)
});
});
describe("todo delete",()=>{
  it("should delete todo",(done)=>{
    request(app)
    .delete(`/todos/${dummy[1]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo._id).toBe(dummy[1]._id.toHexString());

      })
    .end(done)
  });
  it("should return 404 on todo not found",(done)=>{
    var hexId=new ObjectID()
    hexId=hexId.toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(404)
    .end(done)
  }
);
it("should return 404 for invalid ID",(done)=>{
  var id=123;
  request(app)
  .get(`/todos/${id}`)
  .expect(404)
  .end(done)
});
});
