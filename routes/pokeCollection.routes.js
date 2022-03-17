const router = require("express").Router();
const { default: axios } = require("axios");
const isLoggedIn = require("../middleware/isLoggedIn");
const PokeCollection = require("../models/PokeCollection.model");

router.use(isLoggedIn);
router.post("/create", async (req, res) => {
  console.log(req.body);
  console.log(req.session.user.username);

  try {
    await axios.get(
      `https://pokeapi.glitch.me/v1/pokemon/${req.body.pokemonName}`
    );
  } catch (err) {
    return res.render("all-pokemon", { error: "Pokemon Name not Found" });
  }

  try {
    const userCollection = await PokeCollection.findOne({
      owner: req.session.user.username,
    });
    console.log(userCollection);

    userCollection.pokemons.push(req.body.pokemonName);
    console.log(userCollection.pokemons);

    await userCollection.save();
    res.redirect("/pokemon");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
