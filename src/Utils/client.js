import axios from "axios";
const API_BASE = "https://pokeapi.co/api/v2";
const POKEMON_TOTAL = 1292; // setting limit for "all pokemon" query

/////////////
// HELPERS //
/////////////

/////////////
// PRUNING // (since we don't want thaaaat much data)
/////////////

const pruneTypes = (typesData) => {
  return typesData.map((t) => t.type.name);
};

const pruneSprites = (spritesData) => {
  const prunedData = {};

  // this field seemed suspect so this is a cautious measure
  if (spritesData["other"] && spritesData["other"]["official-artwork"]) {
    prunedData.large =
      spritesData["other"]["official-artwork"]["front_default"];
  }
  prunedData.small = spritesData["front_default"];

  return prunedData;
};

/////////////
// EXPORTS //
/////////////

export const prunePokemon = (pokemonData) => {
  const prunedData = {};
  prunedData.id = pokemonData.id;
  prunedData.name = pokemonData.name;
  prunedData.height = parseInt(pokemonData.height) / 10; // decimeters -> meters
  prunedData.weight = parseInt(pokemonData.weight) / 10; // hectograms -> kilograms
  prunedData.types = pruneTypes(pokemonData.types);
  prunedData.sprites = pruneSprites(pokemonData.sprites);

  return prunedData;
};

export const findPokemon = async (name) => {
  const response = await axios.get(`${API_BASE}/pokemon/${name}`);
  if (!response.data) {
    return undefined;
  }
  return prunePokemon(response.data);
};

export const findPokemonById = async (id) => {
  const response = await axios.get(`${API_BASE}/pokemon/${id}`);
  if (!response.data) {
    return undefined;
  }
  return prunePokemon(response.data);
};

// GET: list of Pokemon names (not full Pokemon data)
// not case-sensitive
export const searchPokemonBySubstring = async (substring) => {
  const response = await axios.get(
    `${API_BASE}/pokemon?limit=${POKEMON_TOTAL}`
  ); // all pokemon

  const allPokemon = response.data.results;
  const filteredPokemon = allPokemon
    .filter((pokemon) => pokemon.name.includes(substring.toLowerCase())) // has search query in name
    .map((pokemon) => pokemon.name);

  return filteredPokemon;
};

export const searchPokemonByType = async (type) => {
  const response = await axios.get(`${API_BASE}/type/${type}`); // all pokemon
  return response.data.pokemon.map((pokemon) => pokemon.pokemon.name);
};
