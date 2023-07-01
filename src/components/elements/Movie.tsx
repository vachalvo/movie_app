import React, {FC, useEffect, useState} from 'react';
import Calls from "../../core/Calls";
import "../../styles/Movie.css";

interface MovieProps {
    title: string;
    episode_number: number;
    poster: string;
}

const Movie: FC<MovieProps> = ({title, episode_number, poster}) => {
    const [imageBlob, setImageBlob] = useState<Blob | null>(null);

    useEffect(() => {
        Calls.fetchPoster(poster)
            .then((blob) => {
                setImageBlob(blob);
            })
            .catch((error) => {
                console.error('Error loading image:', error);
            });
    }, [poster]);

    const renderImage = (): JSX.Element | null => {
        if (imageBlob) {
            const imageUrl = URL.createObjectURL(imageBlob);
            return <img src={imageUrl} alt="Loaded" />;
        }
        return null;
    };

    return (
        <div className="card-container">
            <div className="img-container">
                {renderImage()}
            </div>
            <div className="title">
                <b>{title}</b> (Episode no - {episode_number})
            </div>
        </div>
    );
};

export default Movie;