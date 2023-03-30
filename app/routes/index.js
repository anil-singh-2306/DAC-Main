const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', require('./authRouter'));
app.use('/image', require('./imageRouter'));
app.use('/companies', require('./companyRouter'));
app.use('/menus', require('./menuRouter'));
app.use('/places', require('./placeRouter'));
app.use('/users', require('./userRouter'));
app.use('/businesses', require('./businessRouter'));
app.use('/awb', require('./awbRouter'));
app.use('/book', require('./bookingRouter'));
app.use('/manifest', require('./manifestRouter'));

module.exports = app