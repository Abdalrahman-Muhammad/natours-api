const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../../config.env' });
const Tour = require('../../models/toursModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log(`DB connection successful`));

//read json file

const tours = JSON.parse(fs.readFileSync('./tours-simple.json', 'utf8'));
console.log(tours);
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log(`data imported succefully`);
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log(`deleted done successfully`);
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
