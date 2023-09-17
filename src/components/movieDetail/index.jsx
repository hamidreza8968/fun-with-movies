import {useEffect, useRef, useState} from "react";
import {useKey} from "../../hooks/useKey";
import {Loader} from "../loader";
import placeholderImg from "../../assets/placeholder-img.jpeg";
import StarRating from "../../StarRating";
import {useIsMobile} from "../../hooks/useIsMobile";
const key = "f9beea74";

function MovieDetails({selectedId, onCloseMovie, onAddWatched, watched}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const isMobile = useIsMobile();

    useKey("Escape", onCloseMovie);

    const countRef = useRef(0);
    useEffect(function () {
        if (userRating) countRef.current += 1;
    }, [userRating]);


    const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);

    const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;


    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
            countRatingDecisions: countRef.current,
        };


        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    useEffect(function () {
        async function getMovieDetails() {
            setIsLoading(true);
            const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`);
            const data = await (res.json());
            setMovie(data);
            setIsLoading(false);
        }

        getMovieDetails();

    }, [selectedId]);


    useEffect(function () {
        if (!title) return;
        document.title = title;

        return function () {
            document.title = "FunWithMovies";
        }
    }, [title]);


    return (
        <div className="details">
            {isLoading ? <Loader/> :
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
                        <img src={poster === "N/A" ? placeholderImg : poster} alt={`poster of ${title} movie`}/>
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}</p>
                            <p>{genre}</p>
                            <p><span>⭐️</span>{imdbRating ? imdbRating : '---'} IMDB rating</p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">

                            {isWatched ? <p>You rated this movie {watchedUserRating} <span>⭐️</span></p> :
                                <>
                                    <StarRating maxRating={10} size={isMobile ? 14 : 24} onSetRating={setUserRating}/>
                                    <button className="btn-add" disabled={userRating <= 0}
                                            onClick={handleAdd}>+ Add to list</button>
                                    {userRating <= 0 && <p className='button-msg'>Rate to Add to Watched list</p>}
                                </>
                            }
                        </div>
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            }
        </div>
    );
}
export default MovieDetails