var express             = require('express');
var bodyParser          = require('body-parser');
var morgan              = require('morgan');
var mongoose            = require('mongoose');
var ejs                 = require('ejs');
var ejsMate             = require('ejs-mate');
var app = express();

var mainRoutes          = require("./routes/main");
var userRoutes          = require("./routes/user");

//Middleware
app.use(express.static(__dirname + "/public"));
app.use(morgan('dev'));
app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://curly_braces:arit12345@ds247058.mlab.com:47058/ecommerce',function(err){
    if(err) {
        console.log(err);
    }else{
        console.log("Connected to the database");   
    }
});


app.use(mainRoutes);
app.use(userRoutes);

app.listen(process.env.PORT, process.env.IP, function(err){
    if(err)
        throw err;
    console.log("Server is up");
});