const mongoose=require('mongoose')
const Schema=mongoose.Schema


const TaskSchema=new Schema({
    title:{
        type:String
    },
    description:{
        type:String,
    },
    finishDate:{
        type:String
    }
})


module.exports=mongoose.model('Task', TaskSchema)