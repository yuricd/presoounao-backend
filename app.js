const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

app.use('/static', express.static('public'));

mongoose.connect(`mongodb+srv://reader:${process.env.MONGO_PW}@preso-ou-nao-xxodz.mongodb.net/test?retryWrites=true`, {
  useNewUrlParser: true
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