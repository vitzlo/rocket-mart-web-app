import "./App.css";
import React, { useState } from "react";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Home from "./Home";
import Profile from "./Profile";
import SearchResults from "./SearchResults";
import LargePokemon from "./Pokemon/LargeView";
import NavigationBar from "./NavigationBar";

function App() {
  const [user, setUser] = useState(null);
  return (
    <HashRouter>
      <div>
        <NavigationBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="home" element={<Home />} />
          {/* use the URL */}
          <Route
            path="profile/*"
            element={<Profile user={user} setUser={setUser} />}
          />
          {/* needs to take a parameter, or use the URL */}
          <Route path="results/:search/*" element={<SearchResults />} />
          {/* needs to take a parameter, or use the URL */}
          <Route path="pokemon/:pokemonId/*" element={<LargePokemon />} />
          <Route
            path="pokemon/transaction/:transactionId/*"
            element={<LargePokemon />}
          />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
