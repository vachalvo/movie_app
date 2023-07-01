const defaultConfig = {
    movieUri: "https://raw.githubusercontent.com/Ghamry0x1/Star-Wars-Movie-App/master/movies.json",
    posterBaseUri: "https://raw.githubusercontent.com/Ghamry0x1/Star-Wars-Movie-App/master/public/images/"
};

// Types
export type MovieType = {
    title: string;
    episode_number: number;
    poster: string;
}
export type MovieDatabaseType = {
    movies: MovieType[]
}

const Calls = {
    fetchMovies: async (): Promise<MovieDatabaseType> => {
        return await (await fetch(defaultConfig.movieUri)).json();
    },
    fetchPoster: async (posterName: string): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            fetch(`${defaultConfig.posterBaseUri}${posterName}`)
                .then((response) => {
                    if (!response.ok) throw new Error('Image request failed');
                    return response.blob();
                })
                .then((blob) => {
                    resolve(blob);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
};

export default Calls;