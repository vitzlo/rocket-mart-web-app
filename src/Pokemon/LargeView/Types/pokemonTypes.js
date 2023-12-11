import Badge from "./pokemonTypeBadge";

function PokemonTypes({ types }) {
  return (
    <div className="row">
      {types.map((type, index) => (
        <div className="col p-0">
          <Badge key={index} type={type} />
        </div>
      ))}
    </div>
  );
}

export default PokemonTypes;
