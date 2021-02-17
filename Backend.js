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
app.get('/repairs',(req, res) => {
  pool.query('SELECT customerId from Customers  ', [], function (err, results) {
    pool.query('SELECT employeeId from Employees  ', [], function (err, result2) {
      pool.query('SELECT bikeId from BikeModels   ', [], function (err, result3) {
        pool.query('SELECT * from RepairJobs   ', [], function (err, result4) {
        return res.render('repairs', {
            results: results,
            result2: result2,
            result3: result3,
            result4: result4,
        });
        console.log(result1);
        console.log(result2);
    });
});
});
});
});

app.post('/insert-repairs', function(req,res){
  //console.log("THIS IS BODY " + req.body);
  //console.log(req.body.firstName);
  pool.query("INSERT into RepairJobs (repairType, doneDateDesired, customerId, bikeId, employeeId) values ('"+ req.body.repairType + "','" + req.body.doneDateDesired + "','" + req.body.customerId + "','" + req.body.bikeId + "','" +  req.body.employeeId +"')", function(err, result){
      console.log(err);
      console.log(result);
    })

})


// CUSTOMERS
// Initial Page Load
app.get('/customers',(req, res) => {
  let sql = "SELECT * FROM Customers";
  let query = pool.query(sql, (err, results) => {
    if(err) throw err;
    res.render('customers',{
      results: results

         });
  });
});
// Other Queries
app.post('/insert-customers', function(req,res){
  //console.log("THIS IS BODY " + req.body);
  //console.log(req.body.firstName);
  pool.query("INSERT into Customers (firstName, lastName, email) values ('"+ req.body.firstName + "','" + req.body.lastName + "','" +  req.body.email +"')", function(err, result){
      console.log(err);
      console.log(result);
    })

});


// EMPLOYEES
// Initial Page Load
app.get('/employees',(req, res) => {
  let sql = "SELECT * FROM Employees";
  let query = pool.query(sql, (err, results) => {
    if(err) throw err;
    res.render('employees',{
      results: results

         });
  });
});
// Other Queries
app.post('/insert-employees', function(req,res){
  //console.log("THIS IS BODY " + req.body);
  //console.log(req.body.firstName);
  pool.query("INSERT into Employees (employeeFirstName, employeeLastName) values ('"+ req.body.employeeFirstName + "','" + req.body.employeeLastName +"')", function(err, result){
      console.log(err);
      console.log(result);
    })

});


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
// insert bike  - UPDATE THIS QUERY IN DMQ.sql
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
// insert compatibility relationships for selected parts and bike id  - UPDATE THIS QUERY IN DMQ.sql
app.post('/bikeId-compatibility-insert', function(req,res,next){
    var context = {};
    var valArray = [];
    var queryText = "";
    // add an insert query for every partId sent, iterate over partId if array, else build single query
    if(Array.isArray(req.body.partId)){
      for(var part in req.body.partId){
        valArray.push(req.body.bikeId);
        valArray.push(req.body.partId[part]);
        queryText += 'INSERT INTO BikePartCompatibility SET bikeId = ?, partId = ?; ';
      }
    } else {
      valArray.push(req.body.bikeId);
      valArray.push(req.body.partId);
      queryText = 'INSERT INTO BikePartCompatibility SET bikeId = ?, partId = ?;';
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
// Select part by id
app.get('/select-part-by-id',function(req,res,next){
  var context = {};
  pool.query('SELECT * FROM Parts WHERE partId = ?;', [req.query.partId], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    // send selected content back to client
    res.send(context);
  });
});
// Select for compatible bikes based on part id - UPDATE THIS QUERY IN DMQ.sql
app.get('/select-compatible-bikes',function(req,res,next){
  var context = {};
  pool.query('SELECT bikeId FROM BikePartCompatibility WHERE partId = ?;' , [req.query.partId],function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    // send selected content back to client
    res.send(context);
  });
});
// insert part  - UPDATE THIS QUERY IN DMQ.sql
app.post('/insert-part',function(req,res,next){
  var context = {};
  pool.query('INSERT INTO Parts(`partName`) VALUES (?);', req.body.partName, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    // send selected content back to client
    res.send(context);
  });
});
// insert compatibility relationships for selected bikes and part id  - UPDATE THIS QUERY IN DMQ.sql
app.post('/partId-compatibility-insert', function(req,res,next){
  var context = {};
  var valArray = [];
  var queryText = "";
  // add an insert query for every bikeId sent, iterate over bikeId if array, else build single query
  if(Array.isArray(req.body.bikeId)){
    for(var bike in req.body.bikeId){
      valArray.push(req.body.partId);
      valArray.push(req.body.bikeId[bike]);
      queryText += 'INSERT INTO BikePartCompatibility SET partId = ?, bikeId = ?; ';
    }
  } else {
    valArray.push(req.body.partId);
    valArray.push(req.body.bikeId);
    queryText = 'INSERT INTO BikePartCompatibility SET partId = ?, bikeId = ?;';
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
// Delete part by id
app.get('/delete-part',function(req,res,next){
  var context = {};
  pool.query('DELETE FROM Parts WHERE partId = ?;', [req.query.partId], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    // send selected content back to client
    res.send(context);
  });
});
// delete all compatibility relationships with partId
app.post('/partId-compatibility-delete', function(req,res,next){
  var context = {};
  pool.query('DELETE FROM BikePartCompatibility WHERE partId = ?;', req.body.partId, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    // send selected content back to client
    res.send(context);
  });
});
// Update part by id
app.post('/update-part',function(req,res,next){
  var context = {};
  pool.query('UPDATE Parts SET partName = ? WHERE partId = ?;', [req.body.partName, req.body.partId], function(err, rows, fields){
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