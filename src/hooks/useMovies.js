import { useEffect, useState } from "react";

const key = "f9beea74";

export function useMovies(query, callback) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(function () {
        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("");

                const headers = new Headers();
                headers.append("Content-Type", "application/json"); // Set the content type

                const request = new Request(
                    http://www.omdbapi.com/?apikey=${key}&s=${query},
                {
                    method: "GET",
                        headers: headers,
                    signal: controller.signal,
                }
            );

                const res = await fetch(request);

                if (!res.ok) throw new Error("Something went wrong with fetching movies");

                const data = await res.json();
                if (data.Response === "False") {
                    setMovies([]);
                    throw new Error("Movie not found");
                }

                setMovies(data.Search);
                setError("");
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }

        fetchMovies();

        return function () {
            controller.abort();
        };
    }, [query]);

    return { movies, isLoading, error };
}
