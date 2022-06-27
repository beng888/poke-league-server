const asyncHandler = require('express-async-handler');
const { Team } = require('../models');

const getTeams = asyncHandler(async (req, res) => {
  const leagueId = req.params.leagueId;
  const teams = await Team.findAll({ where: { LeagueId: leagueId } });
  res.status(200).json(teams);
});

const getTeamByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const teams = await Team.findAll({ where: { UserId: userId } });
  res.status(200).json(teams);
});

const postTeam = asyncHandler(async (req, res) => {
  const team = req.body;
  team.UserId = req.user.id;
  const data = await Team.create(team);
  return res.status(200).json(data);
});

const deleteTeam = asyncHandler(async (req, res) => {
  const teamId = req.params.id;
  await Team.destroy({
    where: {
      id: teamId,
    },
  });
  res.json('Team deleted Successfully!');
});

const updateTeam = asyncHandler(async (req, res) => {
  const team = req.body;
  const id = req.params.id;
  const [data, created] = await Team.upsert({
    id: id,
    ...team,
  });
  return res.status(200).json(data);
});

module.exports = { getTeams, postTeam, getTeamByUser, deleteTeam, updateTeam };
