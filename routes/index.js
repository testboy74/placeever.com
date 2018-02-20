var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sessData = req.session;
  if(sessData.anon == 'false') {
    res.render('index', {user: {name: sessData.name, isAuth: true}});
  } else {
    res.render('index', {user: {isAuth: false}});
  }
});

module.exports = router;
