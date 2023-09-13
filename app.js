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
//global middlewares
app.use(express.json()); //body-parser
app.use(express.static(`${__dirname}/public`));

//2)routes
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', userRouter);

//route for not existing endpoint
app.use('*', (req, res, next) => {
  next(new AppError(`can't find the ${req.originalUrl} on this server!`, 404));
});

//error handling middlemware
app.use(globalErrorHandler);

//3) start server
module.exports = app;
