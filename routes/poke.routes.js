const router = require("express").Router();
const axios = require("axios");
const requireLogin = require("../middleware/isLoggedIn");

router.use(requireLogin);
router.get("/", (req, res) => {
  const starters = [
    {
      src: "https://cdn.traction.one/pokedex/pokemon/1.png",
      name: "Bulbasaur",
    },
    {
      src: "https://cdn.traction.one/pokedex/pokemon/4.png",
      name: "Charmander",
    },
    {
      src: "https://cdn.traction.one/pokedex/pokemon/7.png",
      name: "Squirtle",
    },
  ];
  res.render("all-pokemon", { starters, doctitle: "The 3 Starter Pokemon" });
});

router.get("/random", async (req, res) => {
  const random = Math.floor(Math.random() * 400) + 1;
  const url = `https://pokeapi.glitch.me/v1/pokemon/${random}`;
  const {
    data: [{ name, sprite: src }],
  } = await axios.get(url);

  console.log(name, src);
  res.render("random-pokemon", { name, src, doctitle: "Random Pokemon" });
});

module.exports = router;
