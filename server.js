var express             = require('express');
var bodyParser          = require('body-parser');
var morgan              = require('morgan');
var mongoose            = require('mongoose');
var ejs                 = require('ejs');
var ejsMate             = require('ejs-mate');
var session             = require('express-session');
var cookieParser        = require('cookie-parser');
var flash               = require('express-flash');
var secret              = require('./config/secret');
var MongoStore          = require('connect-mongo')(session);
var passport            = require('passport');
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
app.use(session({
    secret: secret.secretKey,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({url:secret.database, autoReconnect: true})
}));
app.use(cookieParser());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.user = req.user;
    next();
});

mongoose.connect(secret.database,function(err){
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
    console.log("Server is up on " + process.env.PORT + " and IP is " + process.env.IP);
});