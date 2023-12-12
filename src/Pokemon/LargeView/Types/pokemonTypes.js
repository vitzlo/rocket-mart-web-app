import Badge from "./pokemonTypeBadge";

function PokemonTypes({ types }) {
  return (
    <div className="row">
      {types.map((type, index) => (
        <Badge key={index} type={type} />
      ))}
    </div>
  );
}

export default PokemonTypes;
