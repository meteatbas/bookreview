const mongoose=require('mongoose');
const slugify=require('slugify');

const BookSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,'Please add a name'],
        unique:true,
        trim:true,
        maxlength:[50,'Name cannot be longer than 50 characters']
    },
    slug:String,
    averageRating:{
        type:Number,
        min:[1,'Rating must be at least 1'],
        max:[10,'Rating cant be more than 10']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


//Create book slug from the name
BookSchema.pre('save',function(next){
    this.slug=slugify(this.name,{lower:true});
    next();
});

module.exports=mongoose.model('Book',BookSchema);