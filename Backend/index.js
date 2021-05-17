require("dotenv").config({
    path: `.env`,
})
const mongoose=require("mongoose");
const users=require("./router/users");
const authUser=require("./router/auth")
const {Users} =require("./modules/users")
const express=require("express");
const app=express();
mongoose.connect(process.env.database).then(()=>{
    console.log("Connected to Mongodb")}).catch(er=>{
        console.log("Could not connect to mongodb...",er)
});
app.use(express.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    next();
  });
app.use("/api/users",users)
app.use("/api/auth",authUser)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));