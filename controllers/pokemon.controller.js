const asyncHandler = require('express-async-handler');
const { Pokemon } = require('../models');

const postPokemon = asyncHandler(async (req, res) => {
  const pokemon = req.body;
  pokemon.UserId = req.user.id;
  const data = await Pokemon.create(pokemon);
  return res.status(200).json(data);
});

const updatePokemon = asyncHandler(async (req, res) => {
  const pokemon = req.body;
  const id = req.params.id;
  const [data, created] = await Pokemon.upsert({
    id: id,
    ...pokemon,
  });
  return res.status(200).json(data);
});

const getPokemonByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const pokemons = await Pokemon.findAll({ where: { UserId: userId } });
  res.status(200).json(pokemons);
});

module.exports = { postPokemon, getPokemonByUser, updatePokemon };
