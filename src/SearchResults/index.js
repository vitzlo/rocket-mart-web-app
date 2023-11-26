import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchPokemonBySubstring } from "../Utils/client";
import SmallPokemon from "../Pokemon/SmallView";

function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const { search } = useParams();

  useEffect(() => {
    searchPokemonBySubstring(search).then((results) => {
      setSearchResults(results);
    });
  }, [search]);
  return (
    <div className="container-fluid">
      <div className="row">
        {searchResults.map((pokemon, index) => (
          <div className="col-auto">
            <SmallPokemon key={index} pokemonName={pokemon} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default SearchResults;
