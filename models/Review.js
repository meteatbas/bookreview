const mongoose=require('mongoose');

const ReviewSchema=new mongoose.Schema({


score:{
    type:Number,
    min:1,
    max:10,
    required:[true,'Please add a score between 1 and 10']
},
createdAt:{
    type:Date,
    default:Date.now
},
book:{
    type:mongoose.Schema.ObjectId,
    ref:'Book',
    required:true
},
user:{
    type:mongoose.Schema.ObjectId,
    ref:'User'
}

});

//Static method to get avg rating and save 
ReviewSchema.statics.getAverageRating=async function(bookId){
    const obj=await this.aggregate([
        {
            $match:{book:bookId}
        },
        {
            $group:{
                _id:'$book',
                averageRating:{$avg:'$score'}
            }
        }
    
    ]);
    
        try {
            await this.model('Book').findByIdAndUpdate(bookId,{
                averageRating:obj[0].averageRating
            })
        } catch (err) {
            console.log(err);
            
        }
    }

   //Call getAverageCost after save
   ReviewSchema.post('save',function(){
    this.constructor.getAverageRating(this.book);
});

module.exports=mongoose.model('Review',ReviewSchema);

