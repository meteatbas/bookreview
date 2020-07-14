const express=require('express');
const {getBook,getBooks,createBook}=require('../controllers/books');


//Include other resource routers
// const userRouter=require('./users');
// const reviewRouter=require('./reviews');

const router=express.Router();

//Re-route into other resource routers
// router.use('/return/:bookId',userRouter);
// router.use('/:bookId/reviews',reviewRouter);

router.route('/').get(getBooks).post(createBook);
router.route('/:id').get(getBook);

module.exports=router;
