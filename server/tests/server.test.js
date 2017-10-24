const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');
const {dummy,populateData,dummyUser,populateUser} = require('./seed/seed');
const {User} = require('./../model/user');
const {app} = require('./../server');
const {Todo} = require('./../model/todo');

beforeEach(populateData);
beforeEach(populateUser);
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
describe("Get valid Users",()=>{
  it("should return authenticate user",(done)=>{
    request(app)
    .get("/user/me")
    .set("x-auth",dummyUser[0].tokens[0].token)
    .expect(200)
    .expect((res)=>{
      expect(res.body.email).toBe(dummyUser[0].email);
      expect(res.body._id).toBe(dummyUser[0]._id.toHexString());
    })
    .end(done)
  });
  it("should not return authenticate",(done)=>{
    request(app)
    .get("/user/me")

    .expect(401)
    .expect((res)=>{
      expect(res.body).toEqual({});
    })
    .end(done)
  });
});
describe("POSt /users",()=>{
  it("should generate token for user",(done)=>{
    var email="example@gmail.com";
    var password="12345675";
    request(app)
    .post("/users")
    .send({email,password})
    .expect(200)
    .expect((res)=>{
      expect(res.body.email).toBe(email);

    }).end((err)=>{
      if(err)
      {
        return done(err);
      }
      User.findOne({email}).then((user)=>{

        expect(password).toNotBe(pass);


      });
      done();
    });
  })
  it("should return validation if request is invaid",(done)=>{
    var email="example.com";
    var password="12345675";
      request(app)
      .post("/users")
      .send({email,password})
      .expect(400)
      .end(done)
  });
  it("should return error for duplicate email",(done)=>{
    var email="heet1@live.com";
    var password="12345675";
      request(app)
      .post("/users")
      .send({email,password})
      .expect(400)
      .end(done)
  });
});
// describe("Login for users",()=>{
//   it("should return authenticate user",(done)=>{
//
//   });
//   it("should not return invalid user data",(done)=>{
//
//   });
// });
