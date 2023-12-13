import React, { useEffect, useState } from "react";
import Types from "./types";
import PokemonRow from "./pokemonRow";

const Home = ({ user }) => {
  const [popularPokemon, setPopularPokemon] = useState([]);

  // gets 10 random pokemon from the API for now
  const fetchPokemon = async () => {
    const pokemonList = [];
    for (let i = 0; i < 10; i++) {
      const pokemon = Math.floor(Math.random() * 1000) + 1;
      pokemonList.push(pokemon);
    }
    setPopularPokemon(pokemonList);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="container-fluid">
      <div className="mb-5 p-2">
        <Types />
      </div>
      <div className="mb-5 pb-2">
        <PokemonRow category="Popular Pokemon!" pokemonList={popularPokemon} />
      </div>
      {user && (
        <div className="pb-5">
          <PokemonRow
            category="Last Searched Pokemon!"
            pokemonList={user.recentlyViewed.slice(0).reverse()}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
