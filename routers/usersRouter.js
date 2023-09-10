const express = require('express');
const {
  getAllusers,
  getUser,
  addNewUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();
router.route('/').get(getAllusers).post(addNewUser);
router.route('/:id').patch(updateUser).get(getUser).delete(deleteUser);
module.exports = router;
