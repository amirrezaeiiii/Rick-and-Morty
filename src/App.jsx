import "./App.css";
import { characters } from "../data/data";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <CharacterList characters={characters} />
        <CharacterDetail />
      </div>
    </div>
  );
}

export default App;
