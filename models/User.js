const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true,'Please add a name']
    },
    history:[
        {
            name:[{type:String,required:false}]
        }
    ]
})

module.exports=mongoose.model('User',UserSchema);