/**
 *
 */

var common = require('../public/javascripts/common.js');
var app = require('../app.js');

var express = require('express');
var router = express.Router();

// On connection the user will have their secret updated
common.updateSecret();


router.get('/', function (req, res, next) {

    common.createUser('username', '1234', 'Max', function(stat, msg) {
        console.log('Gi: ' + stat + msg);
        // common.signIn(req.session, 'Gephery', '1234', function(stat, msg) {
        //     console.log('this ' + stat + msg);
        //     console.log(req.session.username);
        // });
    });
    res.render('index', {title: 'This'});
});

module.exports = router;
