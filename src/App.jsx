import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favorites, Search, SearchResult } from "./components/Navbar";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacters(
    "https://rickandmortyapi.com/api/character/?name",
    query
  );
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useLocalStorage("FAVOURITES", []);
  // const [favourites, setFavourites] = useState(
  //   () => JSON.parse(localStorage.getItem("FAVOURITES")) || []
  // );

  // useEffect(() => {
  //   localStorage.setItem("FAVOURITES", JSON.stringify(favourites));
  // }, [favourites]);

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  const handleAddFavourite = (char) => {
    setFavourites((prevFav) => [...prevFav, char]);
  };
  const handleDEleteFavourite = (id) => {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  };
  const isAddTOFavorite = favourites.map((fav) => fav.id).includes(selectedId);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favorites
          favourites={favourites}
          onDeleteFavourite={handleDEleteFavourite}
        />
      </Navbar>
      <Main>
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectedCharacter={handleSelectCharacter}
        />
        <CharacterDetail
          isAddTOFavorite={isAddTOFavorite}
          selectedId={selectedId}
          onAddFavourite={handleAddFavourite}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
