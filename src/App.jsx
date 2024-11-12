import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favorites, Search, SearchResult } from "./components/Navbar";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useState(
    () => JSON.parse(localStorage.getItem("FAVOURITES")) || []
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );
        setCharacters(data.results.slice(0, 5));
      } catch (err) {
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    // if (query.length < 3) {
    //   setCharacters([]);
    //   return;
    // }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);
  useEffect(() => {
    localStorage.setItem("FAVOURITES", JSON.stringify(favourites));
  }, [favourites]);

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
