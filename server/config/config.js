// var env = process.env.NODE_ENV || 'development';
// if(env=="development" || env==="test")
// {
//   const config = require('./config.json');
//   var envconfig=config[env];
//   Object.keys(envconfig).forEach((key)=>{
//     process.env[key]=envconfig[key];
//   })
// }
module.exports = {
  secret: 'jsdhf'
};
// if (env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }