var mongoose = require('mongoose');
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
    }
});
module.exports={Todo};
