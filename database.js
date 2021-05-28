var mysql = require('mysql');
var connection = mysql.createPool({
 connectionLimit: 1000000000,
 user: 'xxxxxx',
 password: 'xxxx',
 database: 'xxx',
 port: 3306,
 debug: false,
 multipleStatements: true,
 queueLimit: 300000000000,
 acquireTimeout: 100000000,
});
    var connectionString
function connect() {
 return new Promise((resolve, reject) => {
 connection.getConnection((err, con) => {
 if (err) {
 reject(err)
 }
 connectionString = con
 con.release()
 resolve(con)
 })
 })
}
 
function disConnect() {
 if (connectionString) {
 // connectionString.release();
 // connectionString.destroy();
 }
}
module.exports = { connect, disConnect };