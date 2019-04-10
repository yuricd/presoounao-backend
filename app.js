const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/static', express.static('public'));

mongoose.connect(`mongodb+srv://reader:${process.env.MONGO_PW}@preso-ou-nao-xxodz.mongodb.net/test?retryWrites=true`, {
  useNewUrlParser: true
});
   
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Acess-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT');
    res.status(200).json({});
  }
  next();
});

app.use('/politicians', require('./src/politician/routes'));

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message
  })
});

module.exports = app;