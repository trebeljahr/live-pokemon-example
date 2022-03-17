const { Schema, model } = require("mongoose");

const dataShape = {
  owner: {
    type: String,
    required: true,
  },
  pokemons: {
    type: [String],
    required: true,
  },
};

const options = {
  timestamps: true,
};
const pokemonCollectionSchema = new Schema(dataShape, options);

const PokemonCollection = model("PokemonCollection", pokemonCollectionSchema);

module.exports = PokemonCollection;
