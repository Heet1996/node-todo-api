const request = require('supertest');
const expect = require('expect');

const {app} = require('./../server');
const {Todo} = require('./../model/todo');
beforeEach((done)=>{
  Todo.remove({}).then(()=>done());
  console.log("it is running");
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
    Todo.find().then((todos)=>{
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
        
        expect(todos.length).toBe(0);
        done();
      }).catch((e)=>done(e));


});
});
});
