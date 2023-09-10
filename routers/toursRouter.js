const express = require('express');
const {
  handleGetTours,
  handlePostTours,
  handleGetOneTour,
  handlePatchTour,
  handleDeleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/toursController');

const router = express.Router();

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/top-5-cheap').get(aliasTopTours, handleGetTours);
router.route('/').get(handleGetTours).post(handlePostTours);

router
  .route('/:id')
  .get(handleGetOneTour)
  .patch(handlePatchTour)
  .delete(handleDeleteTour);
module.exports = router;
