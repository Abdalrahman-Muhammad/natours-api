const express = require('express');
const {
  handleGetTours,
  handlePostTours,
  handleGetOneTour,
  handlePatchTour,
  handleDeleteTour,
  checkId,
  checkBody,
} = require('../controllers/toursController');

const router = express.Router();

router.param('id', checkId); //middleware to check on the id

router.route('/').get(handleGetTours).post(checkBody, handlePostTours);

router
  .route('/:id')
  .get(handleGetOneTour)
  .patch(handlePatchTour)
  .delete(handleDeleteTour);
module.exports = router;
