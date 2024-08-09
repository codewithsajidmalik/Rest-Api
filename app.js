const express = require('express')
const app = express()
const path=require("path") 
const seed=require("./seed")
const studentRoutes = require('./student')
const facultyRoutes = require('./faculty')
const bodyParser = require('body-parser');

const userRoute = require('./routes/user')


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sm738875:sajidmalik@cluster0.9h3xpm4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
console.log("db connected")
})

.catch((err)=>{
console.log(err)
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
 
app.use('/student',studentRoutes);
app.use('/faculty',facultyRoutes);
app.use('/user',userRoute);

app.use((req,resp,next)=>{
    resp.status(404).json({
        error:'Bad request'
    })
})
app.set("view engin","ejs")
app.set("views",path.join(__dirname,"views"))//path views
seed()
app.listen(8080,()=>{
    console.log("8080")
})