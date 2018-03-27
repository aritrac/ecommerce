var express             = require('express');
var morgan              = require('morgan');
var mongoose            = require('mongoose');
var bodyParser          = require('body-parser');
var User                = require('./models/user');
var app = express();

mongoose.connect('mongodb://curly_braces:arit12345@ds247058.mlab.com:47058/ecommerce',function(err){
    if(err) {
        console.log(err);
    }else{
        console.log("Connected to the database");   
    }
});

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/create-user', function(req,res, next){
    var user =new User();
    console.log(req.body.name);
    console.log(req.body.password);
    console.log(req.body.email);
    user.profile.name = req.body.name;
    user.username     = req.body.name; //This is required and should be unique, maybe some internal mongo driver requirement...
    user.password     = req.body.password;
    user.email        = req.body.email;
    
    user.save(function(err){
        if(err) return next(err);
        
        res.json("Successfully created a new user");
    });
});

app.listen(process.env.PORT, process.env.IP, function(err){
    if(err)
        throw err;
    console.log("Server is up");
});