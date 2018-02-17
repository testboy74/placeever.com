var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.auth) {
    res.render('index', {user: {name: req.cookies.name, isAuth: true}});
  } else {
    res.render('index', {user: {isAuth: false}});
  }
});

module.exports = router;
