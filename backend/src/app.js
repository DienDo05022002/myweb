const express = require('express');
const app = express();

// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
var morgan = require('morgan');
var helmet = require('helmet');
var createError = require('http-errors');
var bodyParser = require('body-parser')
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
app.use(bodyParser.json())
app.use(morgan('combined'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));

// app.use(cors());
app.use(
  cors({
    origin: '*',
  }),
);

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/", (req, res) => {
//   res.json({message: 'Welcome'})
// })
app.use(require('./api', severRoute));

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, '/frontend/build')));
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
// );

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'Not found'));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;

  res.status(err.status || 500);
  res.send({ error: err.message });
  res.render('error');
});

//import to sever
module.exports = app;
