var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var loger = require('morgan');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var Session = require('express-session');
var MemoryStore = require('connect-mongo')(Session);
var configs;
var connectOptions;
var sessionConfig;
var db;

require('./models/index');
process.env.NODE_ENV = process.env.NODE_ENV || 'develop';

configs = require('./config/' + process.env.NODE_ENV);
connectOptions = configs.mongoConfig;

app.use(express.static(__dirname + '/public'));
app.use(loger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

db = mongoose.createConnection(
    process.env.DB_HOST,
    process.env.DB_NAME,
    process.env.DB_PORT,
    connectOptions);

db.on('error', function (err) {
    throw err;
});

db.once('open', function callback() {
    console.log('Connected to DB success');
    sessionConfig = configs.sessionConfig(db);
    app.db = db;

    session = Session({
        name: 'js_courses',
        key: 'js_courses',
        secret: '0',
        resave: false,

        cookie: {
            maxAge: 365 * 24 * 60 * 1000 //One year
        },
        rolling: true,
        saveUninitialized: true,
        store: new MemoryStore(sessionConfig)
    });

    app.use(session);

    require('./routes')(app);

    app.listen(process.env.PORT, function () {
        console.log('Server successfully started on port ' + process.env.PORT);
    })
});