const mongoose=require("mongoose")


const vote=new mongoose.Schema({
    question:{
        type:String,
        require:true,
    },
    options:[String],
    closingDate: Date,
    createBy:{
        type:mongoose.Schema.Types.ObjectId,ref:"User"
    },
    votes:[
       { userId: {type:mongoose.Schema.Types.ObjectId , ref:"User"},
       selectedOption: String,
    
    }
    ],
    isClosed:{
        type:Boolean,
        default:false,
    }
})

module.exports=mongoose.model("Vote",vote)