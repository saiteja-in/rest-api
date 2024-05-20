const express = require("express");
const app = express();
const port = 8000;
const userRouter=require('./routes/user')
const connectMongoose=require('./connection')
const logReqRes=require('./middlewares');


//connect mongo
connectMongoose('mongodb://0.0.0.0:27017/saiteja')

//middleware or plugin
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes)

app.use('/users',userRouter)

app.listen(port, () => {
  console.log("is it working");
});
