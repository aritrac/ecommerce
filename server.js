var express = require('express');
var morgan = require('morgan');
var app = express();

//Middleware
app.use(morgan('dev'));



app.get("/",function(req,res){
    var name = "Aritra";
    res.json("My name is " + name);
});

app.get('/catname', function(req,res){
    res.json('batman');
});

//app.post();

//app.put();

//app.delete();

app.listen(process.env.PORT, process.env.IP, function(err){
    if(err)
        throw err;
    console.log("Server is up");
});