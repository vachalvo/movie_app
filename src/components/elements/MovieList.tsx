import React, {FC} from 'react';
import Movie from "./Movie";
import {MovieType} from "../../core/Calls";
import "../../styles/MovieList.css";

interface MovieListProps {
    movies: MovieType[];
}

const MovieList: FC<MovieListProps> = ({movies}) => {
    return (
        <div className="movie-list-container">
            {movies.map((movie) =>(<Movie key={movie.title} title={movie.title} episode_number={movie.episode_number} poster={movie.poster} />))}
        </div>
    );
};

export default MovieList;