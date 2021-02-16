/* 
OregonDB
*/

var express = require('express');
var mysql = require('mysql');

/* // setup pool for database
var pool = mysql.createPool({
  host  : 'classmysql.engr.oregonstate.edu',
  // REPLACE with OSU ID and database name and password
  user  : 'cs340_USERNAME',
  password : '',
  database : 'cs340_USERNAME'
}); */

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

// include static files
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);


// INDEX
app.get('/',function(req,res){
    res.render('index');
});
app.get('/index',function(req,res){
    res.render('index');
});


// REPAIRS
// Initial Page Load
app.get('/repairs',function(req,res){
    res.render('repairs');
});
// Other Queries


// CUSTOMERS
// Initial Page Load
app.get('/customers',function(req,res){
    res.render('customers');
});
// Other Queries


// EMPLOYEES
// Initial Page Load
app.get('/employees',function(req,res){
    res.render('employees');
});
// Other Queries


// BIKES
// Initial Page Load
app.get('/bikes',function(req,res){
    res.render('bikes');
});
// Other Queries


// PARTS
// Initial Page Load
app.get('/parts',function(req,res){
    res.render('parts');
});
// Other Queries



app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started');
    console.log('if running locally, accessible at http://localhost:' + app.get('port'));
    console.log('otherwise accessible at server url with port - ' + app.get('port'));
    console.log('Press Ctrl-C to terminate.');
});