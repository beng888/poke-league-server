const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  getTeams,
  postTeam,
  getTeamByUser,
  deleteTeam,
  updateTeam,
} = require('../controllers/team.controller');

router.route('/league/:leagueId').get(getTeams);
router.route('/user/:userId').get(getTeamByUser);
router.route('/').post(protect, postTeam);
router.route('/:id').delete(protect, deleteTeam).put(protect, updateTeam);

module.exports = router;
