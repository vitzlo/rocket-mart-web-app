import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchPokemonBySubstring } from "../Utils/client";
import SmallPokemon from "../Pokemon/SmallView";

function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useParams();

  useEffect(() => {
    setLoading(true);
    setSearchResults([]);
    searchPokemonBySubstring(search).then((results) => {
      setSearchResults(results);
      setLoading(false);
    });
  }, [search]);
  return (
    <div className="container-fluid">
      <div className="row">
        {searchResults.length > 0 ? (
          searchResults.map((pokemon, index) => (
            <div className="col-auto">
              <SmallPokemon key={index} pokemonName={pokemon} />
            </div>
          ))
        ) : loading ? (
          <div className="text-center">
            <h1>Loading...</h1>
            <img
              src="https://media.giphy.com/media/S0dlRVeqjpoTC/giphy.gif"
              alt="loading"
              className="w-50"
            />
          </div>
        ) : (
          <div className="text-center">
            <h1>Sorry... theres no pokemon named {search.replace("-", " ")}</h1>
            <img
              src="https://media.giphy.com/media/12Bpme5pTzGmg8/giphy.gif"
              alt="no results"
              className="w-50"
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default SearchResults;
