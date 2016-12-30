/**
 *
 */

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'vergil.u.washington.edu',
    user: 'root',
    password: 'dataisforreal',
    database: 'guide'
});

/**
 * Sets up a user session and returns weather the login was successful.
 * @param sess Session acquired form doing req.session.
 * @param username The raw user username.
 * @param password The raw user password.
 * @param cb Callback function params (stat, msg).
 */
function signIn(sess, username, password, cb) {
    username = mysql.escape(username);
    username = username.toLowerCase();
    password = mysql.escape(password);
    password = password.toLowerCase();

    var status = 400;
    var msg = "";

    // Getting the password of the user by the username specified
    connection.query('SELECT DISTINCT u.password ' +
                     'FROM users u ' +
                     'WHERE u.username = ' + username, function(err, rows) {

        var isUser = !rows || rows.length > 0;
        if (isUser) {

            sess.username = username;

            // Sending back success
            status = 200;
            msg = 'Sign in successful!';
            cb(status, msg);
        } else {
            status = 400;
            msg = 'Invalid password or username';
            cb(status, msg);
        }
    });
}

/**
 * Creates a user by the given username, password, and name. The username must be unique.
 * @param username Unique username of the account.
 * @param password Password for the account.
 * @param name Name of the account, does not need to be unique.
 * @param cb Callback function that
 */
function createUser(username, password, name, cb) {
    username = mysql.escape(username);
    username = username.toLowerCase();
    password = mysql.escape(password);
    password = password.toLowerCase();
    name = mysql.escape(name);
    name = name.toLowerCase();

    var status = 400;
    var msg = 'Mis fire, try your luck with another!';

    connection.connect(function(err){
        if(!err) {
            console.log("Database is connected ... nn");
        } else {
            console.log("Error connecting database ... nn");
        }
    });

    // Getting the user if there is a user with the username wanted by the user
    connection.query('SELECT * ' +
                     'FROM users u ' +
                     'WHERE u.username = ' + username + ';', function(err, rows) {
        var isFree = !rows || rows.length == 0;
        if (isFree) {
            status = 200;
            msg = 'New user created!';
            // Trying to add a user with name, username, password, and a default slevel of 0
            connection.query('INSERT INTO users (username, password, name) ' +
                             'VALUES (' + username + ', ' + password + ', ' + name + ');',
                             function(err, rows) { console.log(err.message + err.statusCode); connection.end(); });
            cb(status, msg);
        } else {
            status = 400;
            msg = 'Username is taken';
            cb(status, msg);
            connection.end();
        }
    });

}

/**
 * Exports a secret hashed code to the secret field. To be used before any routing
 * happens. Many common functions are depended on this being called early.
 */
function updateSecret() {
    // Schedule the next update for 1 day from access.
    setTimeout(updateSecret, 86400000);

    var magic = 4;
    var date = new Date();
    var masher = date.getDay();
    var day = date.toDateString();
    var hash = magic; // Magic number
    for (var i = 0; i < day.length; i++) {
        var charCoded = String(day.charCodeAt(i) << masher);
        hash += charCoded;
        if (i % 2 == 0) {
            hash += charCoded << masher + magic;
        }
    }
    // Update outer
    module.exports.secret = hash;
}

module.exports.updateSecret = updateSecret;
module.exports.createUser = createUser;
module.exports.signIn = signIn;