import "./App.css";
import React, { useEffect, useState } from "react";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Home from "./Home";
import Profile from "./Profile";
import SearchResults from "./SearchResults";
import LargePokemon from "./Pokemon/LargeView";
import NavigationBar from "./NavigationBar";
import { account } from "./Utils/Users/client";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await account();
      setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <HashRouter>
      <div>
        <NavigationBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="home" element={<Home user={user} />} />
          {/* use the URL */}
          <Route
            path="profile"
            element={<Profile user={user} setUser={setUser} />}
          />
          <Route
            path="profile/:username"
            element={<Profile user={user} setUser={setUser} />}
          />
          {/* needs to take a parameter, or use the URL */}
          <Route path="results/:search" element={<SearchResults />} />
          <Route
            path="results/type/:type"
            element={<SearchResults />}
          />
          {/* needs to take a parameter, or use the URL */}
          <Route
            path="pokemon/:pokemonId"
            element={<LargePokemon user={user} setUser={setUser} />}
          />
          <Route
            path="pokemon/transaction/:transactionId"
            element={<LargePokemon user={user} setUser={setUser} />}
          />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
