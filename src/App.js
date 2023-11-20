import "./App.css";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Home from "./Home";
import Profile from "./Profile";
import SearchResults from "./SearchResults";
import LargePokemon from "./Pokemon/LargeView";
import NavigationBar from "./NavigationBar";

function App() {
  return (
    <HashRouter>
      <div>
        <NavigationBar />

        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />

          <Route path="/home" element={<Home />} />

          {/* use the URL */}
          <Route path="/profile/*" element={<Profile />} />

          {/* needs to take a parameter, or use the URL */}
          <Route path="/results/*" element={<SearchResults />} />

          {/* needs to take a parameter, or use the URL */}
          <Route path="/details/*" element={<LargePokemon />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
