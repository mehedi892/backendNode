const express = require('express');
const userRouter = require('./router/user.router')
const app = express();


app.use(express.json())
app.use('/user',userRouter);


app.use('*',(req,res,next)=>{
    res.status(404).json({
        message:'Path not found'
    });
    
});

app.use((error,req,res,next)=>{
    res.status(500).json({
        message:'Server error'
    });
    process.exit(1);
});
module.exports = app;