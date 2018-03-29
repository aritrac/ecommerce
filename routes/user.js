var router              = require('express').Router();
var User                = require('../models/user');

router.get("/signup", function(req,res,err){
    res.json("User already exists");
});

router.post('/signup', function(req,res,next){
    var user = new User();
    
    user.profile.name   = req.body.name;
    user.email          = req.body.email;
    user.password       = req.body.password;
    user.username       = req.body.name;
    
    User.findOne({email: req.body.email}, function(err, existingUser){
        if(err) return next(err);
        if(existingUser){
            console.log(req.body.email + "already exists");
            return res.redirect('/signup');
        }else{
            user.save(function(err, user){
                if(err) {
                    console.log("Problem saving!!");
                    return next(err);
                }
                res.json("New user has been created");
            });
        }
    });
});

module.exports = router;