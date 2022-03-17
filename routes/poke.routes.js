const router = require("express").Router();
const axios = require("axios");
const requireLogin = require("../middleware/isLoggedIn");
const PokemonCollection = require("../models/PokeCollection.model");
const pokemonOptions = require("../models/data");

console.log(pokemonOptions);

router.use(requireLogin);
router.get("/", async (req, res) => {
  const collection = await PokemonCollection.findOne({
    owner: req.session.user.username,
  });
  console.log(collection);

  const arrayOfPromises = collection.pokemons.map((pokemonName) => {
    return axios.get(`https://pokeapi.glitch.me/v1/pokemon/${pokemonName}`);
  });

  const results = await Promise.all(arrayOfPromises);
  const pokemonCollectionWithImages = results.map((response, index) => {
    return {
      src: response.data[0].sprite,
      name: collection.pokemons[index],
    };
  });
  console.log(pokemonCollectionWithImages);

  // const starters = [
  //   {
  //     src: "https://cdn.traction.one/pokedex/pokemon/1.png",
  //     name: "Bulbasaur",
  //   },
  //   {
  //     src: "https://cdn.traction.one/pokedex/pokemon/4.png",
  //     name: "Charmander",
  //   },
  //   {
  //     src: "https://cdn.traction.one/pokedex/pokemon/7.png",
  //     name: "Squirtle",
  //   },
  // ];
  res.render("all-pokemon", {
    starters: pokemonCollectionWithImages,
    pokemonOptions,
    doctitle: "The 3 Starter Pokemon",
  });
});

router.get("/random", async (req, res) => {
  const random = Math.floor(Math.random() * 400) + 1;
  const url = `https://pokeapi.glitch.me/v1/pokemon/${random}`;
  const {
    data: [{ name, sprite: src }],
  } = await axios.get(url);

  console.log(name, src);
  res.render("random-pokemon", {
    name,
    src,
    doctitle: "Random Pokemon",
    pokemonOptions,
  });
});

module.exports = router;
