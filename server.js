// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log(`UNHANDELED Exception!! SHUTTING DOWN...🤢🤢`);
  process.exit(1);
});

const app = require('./app');

const portNum = process.env.PORT_NUM;
const hostName = process.env.HOST_NAME;
// console.log(process.env); //get us env enviroment variable
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log(`DB connection successful ✔✔✔`));

const server = app.listen(portNum, hostName, (err) => {
  if (err) console.log(`error on running the server 🤦‍♂️🤦‍♂️🤦‍♂️`);
  console.log(
    `server is running in port ${portNum} and host ${hostName} ✔✔✔`,
  );
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log(`UNHANDELED REJECTION!! SHUTTING DOWN...🤢🤢`);
  server.close(() => {
    process.exit(1);
  });
});
