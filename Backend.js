/* 
OregonDB
*/

var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setup pool for database
var pool = mysql.createPool({
  host  : 'classmysql.engr.oregonstate.edu',
  // REPLACE with OSU ID and database name and password
  user  : 'cs340_USER',
  password : '',
  database : 'cs340_USER',
  multipleStatements : true
});
// setup handlebars
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

// include static files
app.use(express.static('public'));


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
// Bikes Table Select
app.get('/select-bikes',function(req,res,next){
    var context = {};
    pool.query('SELECT * FROM BikeModels', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      // send selected content back to client
      res.send(context);
    });
});
// Select bike by id
app.get('/select-bike-by-id',function(req,res,next){
    var context = {};
    pool.query('SELECT * FROM BikeModels WHERE bikeId = ?;', [req.query.bikeId], function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      // send selected content back to client
      res.send(context);
    });
});
// Select for compatible parts based on bike id
app.get('/select-compatible-parts',function(req,res,next){
    var context = {};
    pool.query('SELECT partName FROM Parts WHERE partId IN (SELECT partId FROM BikePartCompatibility WHERE bikeId = ?);', [req.query.bikeId],function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      // send selected content back to client
      res.send(context);
    });
});
// insert bike
app.post('/insert-bike',function(req,res,next){
    var context = {};
    var valArray = [req.body.make, req.body.model, req.body.year];
    pool.query('INSERT INTO BikeModels(`make`, `model`, `year`) VALUES (?, ?, ?);', valArray, function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      // send selected content back to client
      res.send(context);
    });
});
// insert compatibility relationships for selected parts and bike id
app.post('/bikeId-compatibility-insert', function(req,res,next){
    var context = {};
    var valArray = [];
    var queryText = "";
    // add an insert query for every partId sent
    for(var part in req.body.partId){
        valArray.push(req.body.bikeId);
        valArray.push(req.body.partId[part]);
        queryText += 'INSERT INTO BikePartCompatibility SET bikeId = ?, partId = ?; ';
    }
    pool.query(queryText, valArray, function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      // send selected content back to client
      res.send(context);
    });
});


// PARTS
// Initial Page Load
app.get('/parts',function(req,res){
    res.render('parts');
});
// Other Queries
// Parts Table Select
app.get('/select-parts',function(req,res,next){
    var context = {};
    pool.query('SELECT * FROM Parts', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      // send selected content back to client
      res.send(context);
    });
});


// pages to handle server errors
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

// port setup
app.listen(app.get('port'), function(){
    console.log('Express started');
    console.log('if running locally, accessible at http://localhost:' + app.get('port'));
    console.log('otherwise accessible at server url with port - ' + app.get('port'));
    console.log('Press Ctrl-C to terminate.');
});