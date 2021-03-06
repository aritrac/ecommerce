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
var Category            = require('./models/category');
var cartLength          = require('./middleware/middlewares');
var app = express();

var mainRoutes          = require("./routes/main");
var userRoutes          = require("./routes/user");
var adminRoutes         = require("./routes/admin");
var apiRoutes           = require("./api/api");

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
app.use(function(req,res,next){
    Category.find({},function(err,categories){
        if(err) return next(err);
        res.locals.categories = categories;
        next();
    });
});

app.use(cookieParser());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.user = req.user;
    next();
});
app.use(cartLength);

mongoose.connect(secret.database,function(err){
    if(err) {
        console.log(err);
    }else{
        console.log("Connected to the database");   
    }
});


app.use(mainRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use('/api',apiRoutes);


app.listen(process.env.PORT, process.env.IP, function(err){
    if(err)
        throw err;
    console.log("Server is up on " + process.env.PORT + " and IP is " + process.env.IP);
});