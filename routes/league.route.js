const express = require('express');
const {
  getLeagues,
  deleteLeague,
  postLeague,
  getLeague,
  getLeagueByUser,
} = require('../controllers/league.controller');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get(getLeagues).post(protect, postLeague);
router.route('/:id').get(getLeague).delete(protect, deleteLeague);
router.route('/user/:userId').get(getLeagueByUser);

module.exports = router;
