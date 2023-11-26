import React, { useEffect, useState } from "react";
import Types from "./types";
import PokemonRow from "./pokemonRow";
import axios from "axios";

const Home = () => {
  const API_BASE = "https://pokeapi.co/api/v2";
  // temp data, just thought fetching from API would be easier than adding manual pokemon
  const [popularPokemon, setPopularPokemon] = useState([]);
  const [recentPokemon, setRecentPokemon] = useState([]);

  // gets 5 random pokemon from the API for now
  const fetchPokemon = async () => {
    const pokemonList = [];
    for (let i = 0; i < 10; i++) {
      const pokemon = Math.floor(Math.random() * 500);
      const response = await axios.get(`${API_BASE}/pokemon/${pokemon}`);
      pokemonList.push(response.data);
    }
    setPopularPokemon(pokemonList);
  };
  const fetchRecentPokemon = async () => {
    const recentPokemon = [];
    for (let i = 0; i < 10; i++) {
      const pokemon = Math.floor(Math.random() * 500);
      const response = await axios.get(`${API_BASE}/pokemon/${pokemon}`);
      recentPokemon.push(response.data);
    }
    setRecentPokemon(recentPokemon);
  };

  useEffect(() => {
    fetchPokemon();
    fetchRecentPokemon();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row text-center mb-4">
        <h1>Welcome to Rocket Mart!</h1>
      </div>
      <div className="my-4">
        <Types />
      </div>
      <div className="my-4">
        <PokemonRow category="Popular Pokemon!" pokemonList={popularPokemon} />
      </div>
      <div className="my-4">
        <PokemonRow
          category="Last Searched Pokemon!"
          pokemonList={recentPokemon}
        />
      </div>
    </div>
  );
};

export default Home;
