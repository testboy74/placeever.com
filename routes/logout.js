var express = require('express');
var router = express.Router();

router.get("/", function (req, res, next) {
   res.clearCookie("name");
   res.clearCookie("auth");
   res.redirect("..")
});

module.exports = router;