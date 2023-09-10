const fs = require('fs');
const Tour = require('../models/toursModel');

const tourTest = new Tour({
  name: 'The Park Camper',
  price: 997,
});

tourTest
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(`error saving tour🐱‍🐉`, err.message);
  });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);
//400 ==>bad request
exports.checkBody = (req, res, next) => {
  if (!(req.body.name && req.body.price)) {
    return res.status(400).json({
      status: 'failed',
      message: 'please enter tour name and price',
    });
  }
  next();
};
//404 ==>not found
exports.checkId = (req, res, next, val) => {
  if (val > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invaild Id',
    });
  }
  next();
};

exports.handleGetTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
};

exports.handleGetOneTour = (req, res) => {
  const id = req.params.id * 1; // converting it from string to number
  const tour = tours.find((ele) => ele.id === id); // return elemnt that matches the codition
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
// 201 status code means created

exports.handlePostTours = (req, res) => {
  const newId = tours.length !== 0 ? tours[tours.length - 1].id + 1 : 0;
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const newTour = { id: newId, ...req.body };
  tours.push(newTour);
  fs.writeFile(
    `./dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) return console.log(err);
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};

exports.handlePatchTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  const tourIndex = tours.findIndex((el) => el.id === id);
  const modifiedTour = Object.assign(tour, req.body);

  tours.splice(tourIndex, 1, modifiedTour);

  fs.writeFile(
    `./dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(404).json({
          status: 'fail',
          message: 'sth wrong',
        });
      }

      res.status(200).json({
        status: 'success',
        data: {
          tour: modifiedTour,
        },
      });
    },
  );
};
//204 ==> null
exports.handleDeleteTour = (req, res) => {
  const id = req.params.id * 1;
  const toBeDeletedTourIndex = tours.findIndex((el) => el.id === id);
  tours.splice(toBeDeletedTourIndex, 1);

  fs.writeFile(
    `./dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) return console.log(err);
      res.status(204).json({
        status: 'success',
        data: null,
      });
    },
  );
};
