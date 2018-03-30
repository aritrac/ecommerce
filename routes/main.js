var router = require('express').Router();

router.get('/',function(req,res){
    //Shows you the cookies which your browser passes to node server
    if(typeof req.cookies['connect.sid'] !== 'undefined'){
        console.log(req.cookies['connect.sid']);
        console.log(req.cookies);
    }
    res.render('main/home');
});

router.get('/about',function(req,res){
    res.render('main/about');
});

module.exports = router;