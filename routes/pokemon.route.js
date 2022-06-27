const express = require('express');
const {
  postPokemon,
  getPokemonByUser,
  updatePokemon,
} = require('../controllers/pokemon.controller');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').post(protect, postPokemon);
router.route('/:id').post(protect, postPokemon).put(protect, updatePokemon);
router.route('/user/:userId').get(getPokemonByUser);

module.exports = router;
