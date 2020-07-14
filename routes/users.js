const express=require('express');

const {getUser,getUsers,createUser,borrowBook,returnBook }=require('../controllers/users');
const { route } = require('./users');
const User=require('../models/User');

//Include other resource routers
// const bookRouter=require('./books');
// const reviewRouter=require('./reviews');

const router=express.Router({mergeParams:true});

//Re-route into other resource routers
// router.use('/:id/return/:bookId',bookRouter);
// router.use('/:bookId/reviews',reviewRouter);

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser);
router.route('/:id/borrow/:bookId').post(borrowBook);
router.route('/:id/return/:bookId').post(returnBook);


module.exports=router;