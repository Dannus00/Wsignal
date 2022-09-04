const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlstore = require('express-mysql-session');
const passport =require('passport');

const {database} = require('./keys')
//inicializacion//
const app = express();
require('./lib/passport');

//settings//
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',exphbs.engine({

    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine','.hbs');

//Middlewares//
app.use(session({
    secret: 'danusmysql',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}));
app.use(morgan('dev'));
app.use(express.urlencoded({extends: false}));
app.use(express.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Global Variables //
app.use((req,res, next)=>{

    app.locals.Success = req.flash('Success')
    app.locals.message = req.flash('message')
    app.locals.user =req.user;
     next();
 })

 
//routes//
app.use(require('./routes/index'));
app.use(require('./routes/authenticatioin'));
app.use(require('./routes/links'));



// public //
app.use(express.static(path.join(__dirname, 'public')));



// start server //
app.listen(app.get('port'), ()=>{

    console.log('server on port', app.get('port'));

})