

const ErrorResponse=require('../utils/errorResponse');
const asyncHandler=require('../middleware/async');
const Book=require('../models/Book');
const User=require('../models/User');
const Review=require('../models/Review');



//@desc Get all users
//@route GET /users
//@access Public

exports.getUsers=asyncHandler(async(req,res,next)=>{

    const users=await User.find();

    res.status(200).json({success:true,data:users});
})

//@desc Get single user
//@route GET /users/:id
//@access Public

exports.getUser=asyncHandler(async(req,res,next)=>{

    const user=await User.findById(req.params.id);

    if (!user) {
        return  next(new ErrorResponse(`User not found with id of ${req.params.id}`,404));
     }

     res.status(200).json({success:true,data:user})
})

//@desc Create user
//@route POST /users
//@access Public

exports.createUser=asyncHandler(async(req,res,next)=>{

    const {name}=req.body;

    //Create user
    const user=await User.create({
        name
    });

    res.status(200).json({success:true});
});

//@desc borrow book
//@route POST /users/:id/borrow/:bookId
//@access Public

exports.borrowBook=asyncHandler(async(req,res,next)=>{
    
    if (req.params.bookId && req.params.id) {
        bookId=req.params._id;
        userId=req.params.id;
        console.log("userid:"+userId);
        const bookName=req.params.bookId;
        // if (req.body.userId===req.params.id) {
            User.findByIdAndUpdate( userId,{ "$push": { history: {"name":bookName} } },{new:true}).exec();
        // }

        
    }

    // const{name}=req.body;

    res.status(200).json({success:true,msg:'borrow book'});
})

//@desc return book
//@route POST /users/:id/return/:bookId
//@access Public

exports.returnBook=asyncHandler(async(req,res,next)=>{

    

    if (req.params.bookId || req.params.id) {
        const reviews=await Review.find({book:req.params.bookId})
        // const reviews=await Review.find({book:req.params.bookId,user:req.params.id})

    req.body.book=req.params.bookId;
    

        const review=await Review.create(req.body);

    return res.status(201).json({
        success:true,
        count:reviews.length,
        data:reviews
    })
    }

    else{
        res.status(200).json(res.advancedResults)
    }
    
})

