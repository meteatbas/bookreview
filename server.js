const express=require('express');
const dotenv=require('dotenv');
const errorHandler=require('./middleware/error');
 const connectDB=require('./config/db');

 //Load env vars
dotenv.config({path:'./config/config.env'});

const morgan=require('morgan');

//Connect to database
connectDB();



//Route files
const books=require('./routes/books');
const users=require('./routes/users');

const app=express();
 
//Body parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV==='development') {
    app.use(morgan('dev'));
}

//Mount routers
app.use('/books',books);
app.use('/users',users);

app.use(errorHandler);



const PORT=process.env.PORT || 3000;

const server=app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}` ));

//Handle unhandled promise rejections

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server and exit process
    server.close(()=>{process.exit(1)});
});