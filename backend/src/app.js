const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
var morgan = require('morgan');
var helmet = require('helmet');
var createError = require('http-errors');
require('dotenv').config();

const severRoute = require('./api/index');

mongoose
  .connect(process.env.CONNECT_MONGODB)
  .then(() => {
    console.log('connected successfully');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(morgan('combined'));
app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

// app.use(cors());
app.use(
  cors({
    origin: '*',
  }),
);

app.use(require('./api', severRoute));

app.get('/', (req, res) => {
  res.send(data.products);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'Not found'));
});
app.use(function (req, res, next) {
  res.status(err.status || 500);
  res.render('error');
});

//import to sever
module.exports = app;
