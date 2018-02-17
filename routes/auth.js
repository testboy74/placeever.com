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
        conn.query("select * from users where uid="+resp.body.uid+";", function(err, rows, fields) {
            if(err) throw err
            if(rows.length == 0) {
                conn.query("insert into users (uid, name) values('" + resp.body.uid + "', '" + resp.body.first_name + " " + resp.body.last_name + "');");
                res.cookie("name", resp.body.first_name + " " + resp.body.last_name);
                res.cookie("auth", resp.body.uid);
                res.redirect('..');
            } else {
                res.cookie("name", rows[0].name);
                res.cookie("auth", rows[0].uid);
                res.redirect('..');
            }
        });
    });
});

module.exports = router;