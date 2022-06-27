const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  revalidateUser,
} = require('../controllers/auth.controller');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').post(registerUser).get(protect, revalidateUser);
router.route('/login').post(loginUser);
router.route('/logout').get(protect, logoutUser);

module.exports = router;
