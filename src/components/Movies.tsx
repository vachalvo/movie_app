import React, {useCallback, useEffect, useMemo, useState} from 'react';
import MovieList from "./elements/MovieList";
import Button from "./elements/Button";
import Calls, {MovieType} from "../core/Calls";

const initialState = {
    movies: [] as MovieType[],
    ascending: true
};

const Movies: React.FC = () => {
    const [ state, setState ] = useState(initialState);
    const [ isLoading, setIsLoading ] = useState(false);

    const fetchMovies = async () => {
        try {
            setIsLoading(true);

            // Fetch movies from API.
            const moviesList = await Calls.fetchMovies();

            // Convert episode number to number.
            const movies = moviesList.movies.map(movie => ({...movie, episode_number: +movie.episode_number}));

            setState({
                ...state,
                movies
            });
        } catch (error) {
            alert("Something went wrong...")
        }

        setIsLoading(false);
    };

    // Fetch movies from API after screen load for the first time.
    useEffect(() => {
        setState(initialState);
        fetchMovies();
    }, []);

    const sortMoviesAscending = useCallback((movies: MovieType[]) => (
            movies.sort((a: MovieType, b: MovieType) => a.episode_number - b.episode_number)),
        []);

    const sortMoviesDescending = useCallback((movies: MovieType[]) => (
            movies.sort((a: MovieType, b: MovieType) => b.episode_number - a.episode_number)),
        []);

    const onButtonClick = useCallback(() => setState({...state, ascending: !state.ascending}),
        [state]);

    const movies = useMemo(() => state.ascending ? sortMoviesAscending(state.movies) : sortMoviesDescending(state.movies),
        [state.ascending, state.movies]);

    return (isLoading
        ? <>Loading</>
        : <>
            <MovieList movies={movies} />
            <Button text={state.ascending ? "DESCENDING" : "ASCENDING"} onClick={onButtonClick}/>
        </>);
};

export default Movies;