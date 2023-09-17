import {useState} from "react";
import {useMovies} from "./hooks/useMovies";
import {useLocalStorageState} from "./hooks/useLocalStorageState";
import {Loader} from "./components/loader";
import ErrorMessage from "./components/messages/errorMessage";
import NavBar from "./components/navBar";
import Search from "./components/search";
import NumResults from "./components/numResults";
import Main from "./components/main";
import Box from "./components/box";
import MovieList from "./components/movieList";
import MovieDetails from "./components/movieDetail";
import WatchedSummary from "./components/watchedSummary";
import WatchedMoviesList from "./components/watchedMoviesList";
export default function App() {

    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);


    const {movies, isLoading, error} = useMovies(query);

    const [watched, setWatched] = useLocalStorageState([], "watched");

    function handleSelectMovie(id) {
        setSelectedId(SelectedId => id === selectedId ? null : id);
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatch(movie) {
        setWatched(watched => [...watched, movie]);
    }

    function handleDeleteWatched(id) {
        setWatched(watched => watched.filter(movie => movie.imdbID !== id));
    }


    return (
        <>
            <NavBar movies={movies} error={error}>
                   <Search query={query} setQuery={setQuery}/>
                   <NumResults movies={movies}/>
            </NavBar>
            <Main>
                <Box>
                    {isLoading && <Loader/>}
                    {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
                    {error && <ErrorMessage message={error}/>}
                </Box>

                <Box>
                    {selectedId ? (<MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie}
                                                 onAddWatched={handleAddWatch} watched={watched}/>) : (
                        <>
                            <WatchedSummary watched={watched}/>
                            <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched}/>
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}






