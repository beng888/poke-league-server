const asyncHandler = require('express-async-handler');
const { League } = require('../models');

const getLeagues = asyncHandler(async (req, res) => {
  const leagues = await League.findAll();
  res.status(200).json(leagues);
});

const getLeagueByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const leagues = await League.findAll({ where: { UserId: userId } });
  res.status(200).json(leagues);
});

const getLeague = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const league = await League.findByPk(id);
  res.status(200).json(league);
});

const postLeague = asyncHandler(async (req, res) => {
  const league = req.body;
  league.owner = req.user;
  league.UserId = req.user.id;
  const data = await League.create(league);
  res.status(200).json(data);
});

const deleteLeague = asyncHandler(async (req, res) => {
  const leagueId = req.params.id;
  await League.destroy({
    where: {
      id: leagueId,
    },
  });
  res.json('League deleted Successfully!');
});

module.exports = { getLeagues, getLeague, postLeague, getLeagueByUser, deleteLeague };
