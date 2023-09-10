const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const toursRouter = require('./routers/toursRouter');
const userRouter = require('./routers/usersRouter');

const app = express();

//1) middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); //middleware body-parser
app.use(express.static(`${__dirname}/public`));

//2)routes
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', userRouter);
app.use('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `can't find the ${req.originalUrl} on this server!`,
  // });
  // const err = new Error(`can't find the ${req.originalUrl} on this server!`);

  next(new AppError(`can't find the ${req.originalUrl} on this server!`, 404));
});

//error handling middlemware
app.use(globalErrorHandler);
//3) start server
module.exports = app;
