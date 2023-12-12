import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchPokemonBySubstring, searchPokemonByType } from "../Utils/client";
import SmallPokemon from "../Pokemon/SmallView/smallPokemon";

function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search, type } = useParams();

  useEffect(() => {
    setLoading(true);
    setSearchResults([]);
    if (search) {
      searchPokemonBySubstring(search).then((results) => {
        setSearchResults(results);
        setLoading(false);
      });
    } else {
      searchPokemonByType(type).then((results) => {
        setSearchResults(results);
        setLoading(false);
      });
    }
  }, [search, type]);
  return (
    <div className="container-fluid">
      <div className="row">
        {searchResults.length > 0 ? (
          searchResults.map((pokemonId, index) => (
            <div className="col-auto">
              <SmallPokemon key={index} pokemonId={pokemonId} />
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
            {search && (
              <h1>
                Sorry... there's no pokemon named {search.replace("-", " ")}
              </h1>
            )}
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
