import axios from '../helpers/axios';
import React, { useEffect, useState } from 'react'
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { Link } from 'react-router-dom';
import './Banner.css';

const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [selected, setSelected] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState("");
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    };
    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
            setSelected(null);

        } else {
            if (selected) {
                setSelected(null);
            }
            setSelected(movie);
            movieTrailer(movie?.title || movie?.name || movie?.original_name)
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                }).catch((error) => console.log(error));
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map((movie) => (
                    <>
                        <img className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            key={movie.id} onClick={() => handleClick(movie)}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}

                        ></img>
                    </>
                ))}
            </div>
            { selected && <Link to={`/movie/${selected.id}`}><button className='banner__button'>More Details</button></Link>}

            { trailerUrl && <YouTube videoId={trailerUrl} opts={opts} ></YouTube>}
        </div >
    )
}

export default Row
