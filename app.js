
/**
 * Module dependencies.
 */

var express = require('express');
var engine = require('ejs-locals');
var routes = require('./routes');
var task = require('./routes/tasks');
var login = require('./routes/login');
var about = require('./routes/about');
var http = require('http');
var path = require('path');
var config = require('./config/config');

var app = express();

// loggers
express.logger.format('detailed', function(token, req, res){
    return req.method + ': ' + req.path + ' -> ' + res.statusCode + '\n';
});
app.use(express.logger('detailed'));

// all environments
app.set('port', process.env.PORT || config.process_port);
app.set('views', path.join(__dirname, 'views'));

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs'); // so you can render('index')

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routes
app.get('/', routes.index);
app.get('/login', login.login);
app.get('/tasks', task.list);
app.get('/about', about.display);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
