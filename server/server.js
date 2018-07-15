const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const routes = require('./routes/index');

const PORT = 4000

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('*', cors({origin: 'https://nightlife-coordination-client.herokuapp.com', credentials: true}))
app.use(session ({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 24 * 7 },
    store: new MongoStore({ mongooseConnection: require('mongoose').connection })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);

// passport config
const Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect(process.env.MONGODB_CONNECT);

app.listen(process.env.PORT || PORT, () => {
  console.log('info', `Running server at port: ${process.env.PORT || PORT}`);
});
