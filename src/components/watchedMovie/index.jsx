import placeholderImg from "../../assets/placeholder-img.jpeg";

function WatchedMovie({movie, onDeleteWatched}) {
    return (
        <li key={movie.imdbID}>
            <img src={movie.poster === "N/A" ? placeholderImg : movie.poster} alt={`${movie.title} poster`}/>
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating ? movie.imdbRating : "---"}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating ? movie.userRating : "---"}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime ? movie.runtime : "---"} min</span>
                </p>
                <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
            </div>
        </li>
    );
}
export default WatchedMovie