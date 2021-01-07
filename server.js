const AppRouter = require('./routes/AppRouter');
const express = require('express');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const connection = require('./db/connection');

const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');

dotenv.config();

// initailize  app
const PORT = process.env.PORT || 8000;
const app = express();

// middleware setup
app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.disable('X-Powered-By');
app.get('/', (req, res) => res.send('Server is running'));
app.use('/api', AppRouter);

// custom error message handler
app.use(notFound);
app.use(errorHandler);

// async port connection
app.listen(PORT, async () => {
  try {
    await connection;
    console.log('Database Connected');
    console.log(
      `Sever listening in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  } catch (error) {
    throw new Error('Error with Connection').red.underline.bold;
  }
});
