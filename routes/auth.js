var express = require('express');
var router = express.Router();
var net = require('superagent');
var db = require('mysql');

router.post("/", function(req, res, next) {
    var conn = db.createConnection({
       host: 'localhost',
       user: 'placeever',
       password: 'ghbznyj86',
       database: 'placeever'
    });
    conn.connect();
    net.get("http://ulogin.ru/token.php?token="+req.body.token+"&host=http://localhost:3000").then(function(resp) {
        conn.query("select * from users where uid="+resp.body.uid+";", function(err, rows) {
            if(err) throw err
            if(rows.length == 0) {
                conn.query("insert into users (uid, name) values('" + resp.body.uid + "', '" + resp.body.first_name + " " + resp.body.last_name + "');");
                conn.query("select LAST_INSERT_ID();", function(err, rows) {
                    req.session.id = rows[0];
                })
                req.session.anon = 'false';
                req.session.name = resp.body.first_name + " " + resp.body.last_name;
                res.redirect('..');
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