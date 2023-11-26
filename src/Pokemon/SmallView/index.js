import { prunePokemon, findPokemon } from "../../Utils/client";
import { useNavigate } from "react-router-dom";

function SmallPokemon({ pokemon, pokemonName }) {
  const navigate = useNavigate();
  // might not need to prune or even need this if we want to make it 
  // so it always is by name but i wanted to save some API requests
  // actually... findPokemon doesnt work so uhhhh
  // TODO: fix findPokemon by name, example can be found in LargeView
  pokemon = pokemon ? prunePokemon(pokemon) : findPokemon(pokemonName);
  const redirect = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };
  return (
    <div className="rm-small-pokemon" onClick={redirect}>
      <img
        src={pokemon.sprites.large}
        alt={pokemon.name}
        className="rm-pokemon-image"
      />
      <div className="rm-pokemon-name-container"></div>
      <div className="rm-pokemon-name">{pokemon.name}</div>
    </div>
  );
}
export default SmallPokemon;
