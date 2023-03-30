const express = require('express');
const cors = require('cors');
const routes=require('./routes');
const { setCommonHeaders } = require('./middlewares/commonHeaders');
const session = require('express-session');

var whitelist = ['http://localhost:4200', 'http://dacoding.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials:true
}

const app = express();

app.use(setCommonHeaders);

app.use(cors(corsOptions));
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:oneDay,secure:false,httpOnly:true } // Set to true if using HTTPS
}));
  
app.use('/api', routes);

module.exports = app;