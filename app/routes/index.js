const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//console.log('Static files directory:', path.join(__dirname, '..', '..', 'images'));
app.use('/images', express.static(path.join(__dirname, '..', '..', 'images/')));

app.use('/auth', require('./authRouter'));
app.use('/image', require('./imageRouter'));
app.use('/companies', require('./companyRouter'));
app.use('/menus', require('./menuRouter'));
app.use('/places', require('./placeRouter'));
app.use('/users', require('./userRouter'));
app.use('/permissions', require('./permissionRouter'));
app.use('/businesses', require('./businessRouter'));
app.use('/awb', require('./awbRouter'));
app.use('/book', require('./bookingRouter'));
app.use('/manifest', require('./manifestRouter'));

module.exports = app