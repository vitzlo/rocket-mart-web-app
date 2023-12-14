import Badge from "./pokemonTypeBadge";

function PokemonTypes({ types }) {
  return (
    <div className="row rm-pokemon-type">
      {types.map((type, index) => (
        <Badge key={index} type={type} />
      ))}
    </div>
  );
}

export default PokemonTypes;
