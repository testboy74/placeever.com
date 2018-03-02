var express = require('express');
var router = express.Router();
var net = require('superagent');
var db = require('../models/db');

router.post("/", function(req, res, next) {
    net.get("http://ulogin.ru/token.php?token="+req.body.token+"&host=http://localhost:3000").then(function(resp) {
        db.getUser(resp.body.uid, function(err, rows) {
            if(err) throw err
            if(rows.length == 0) {
                db.addUser(resp.body.uid, resp.body.first_name + " " + resp.body.last_name, function(err, rows) {
                  if(err) throw err
                  req.session.id = rows[0];
                  req.session.anon = 'false';
                  req.session.name = resp.body.first_name + " " + resp.body.last_name;
                  res.redirect('..');
                });
            } else {
                req.session.anon = 'false';
                req.session.name = rows[0].name;
                req.session.id = rows[0].id;
                res.redirect('..');
            }
        });
    });
});

module.exports = router;
