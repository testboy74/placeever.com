var db = require('mysql');

var pool = db.createPool({
  host: 'localhost',
  user: 'placeever',
  password: 'ghbznyj86',
  database: 'placeever',
  connectionLimit: 10
});

exports.getUser = function(uid, callback) {
  var sql = "select * from users where uid=?";
  pool.getConnection(function(err, connection){
    if(err) {callback(true); return;}
    connection.query(sql, [uid], function(err, result) {
      connection.release();
      if(err) {callback(true); return;}
      callback(false, result);
    });
  });
};

exports.addUser = function(uid, fullname, callback) {
  var sql = "insert into users (uid, name) values('" + uid +"', '" + fullname +"')";
  pool.getConnection(function(err, connection){
    if(err) {callback(true, err); return;}
    connection.query(sql, function(err, result) {
      if(err) {callback(true, err); return;}
    });
    connection.query("select LAST_INSERT_ID();", function(err, result) {
      connection.release();
      if(err) {callback(true, err); return;}
      callback(false, result);
    });
  });
};
