var {mongoose} = require('../db/mongoose');
var Todo=mongoose.model("todos",{
  text:{
      type:String,
      required:true,
      trim:true,
      min:1
    }
    ,completed:{
      type:Boolean,
      default:false
    }
    ,completionTime:{
      type:Number,
      default:null
    },
    _creator:{
      type:mongoose.Schema.Types.ObjectId,
      required:true
    }
});
module.exports={Todo};
