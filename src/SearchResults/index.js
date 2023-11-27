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
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FS0dlRVeqjpoTC%2Fgiphy.gif&f=1&nofb=1&ipt=1fcd67f50a18eb323cb536b60a98d4543333c563cdea04fae3c1a499bbb24f4e&ipo=images"
              alt="loading"
              className="w-50"
            />
          </div>
        ) : (
          <div className="text-center">
            <h1>Sorry... theres no pokemon named {search.replace("-", " ")}</h1>
            <img
              src="https://i0.wp.com/media1.giphy.com/media/dJYoOVAWf2QkU/giphy.gif?resize=640%2C640&ssl=1&crop=1"
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
