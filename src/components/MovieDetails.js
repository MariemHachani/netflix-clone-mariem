import axios from '../helpers/axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Banner from './Banner';
import Nav from './Nav';
import StarRatingComponent from 'react-star-rating-component';
import './MovieDetails.css';
import Reviews from './Reviews';

const API_KEY = "27a364e66a0acad65a3d2eda58c2bec5";
function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {

            const request = await axios.get(`/movie/${id}?api_key=${API_KEY}`);
            setMovie(request.data);
            return request;
        }
        fetchData().then(setMovie([]));
    }, [id]);
    return (
        <div>
            <Nav></Nav>
            <Banner selection={movie}></Banner>
            <div className="movie__details">
                <div className="movie__details__content">

                    <h1>{movie?.title || movie?.name || movie?.original_name}:</h1>
                    <p>{movie.tagline}</p>
                </div>
            </div>

            <div className="movie__details">
                <div className="movie__details__content">
                    <h2>Star rating:</h2> <p>Out of <strong>{movie.vote_count}</strong> votes</p>
                    <StarRatingComponent
                        name="rate1"
                        starCount={10}
                        value={movie.vote_average}
                        editing={false
                        }
                    />
                    {movie?.release_date && <div><h3>Released on:</h3><p>{movie?.release_date}</p></div>}
                </div>
                <div className="movie__details__content">
                    <Reviews id={movie.id}></Reviews>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails
