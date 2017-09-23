const request = require('supertest');
const expect = require('expect');

const {app} = require('./../server');
const {Todo} = require('./../model/todo');
var dummy=[
  {
    text:"My first todo"
  },
  {
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
    expect(res.body.doc.length).toBe(2);    }).end(done);

  });
});
