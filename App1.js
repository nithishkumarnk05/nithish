var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gfg');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/sign_up', function(req,res){
    var Firstname = req.body.firstname;
    var Lastname = req.body.lastname;
    var Email =req.body.email;
    var Password = req.body.password;
    var Conformpassword = req.body.conformpassword;
    var data = {
        "firstname": Firstname,
        "lastname":Lastname,
        "email":Email,
        "password":Password,
        "Conformpassword":Conformpassword,
    }
db.collection('login').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");       
    });
     return res.redirect('./loginsuc.html');
})
app.listen(5500);
console.log("server listening at port 5500");