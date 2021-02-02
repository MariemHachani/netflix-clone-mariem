import axios from '../helpers/axios';
import React, { useEffect, useState } from 'react'
import requests from '../helpers/requests';
import './Banner.css'
import { Link } from 'react-router-dom';

function Banner({ selection }) {


    const [movie, setMovie] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {

            if (selection) {
                const request = await selection;
                setMovie(selection);
                return request;
            } else {
                const request = await axios.get(requests.fetchNetflixOriginals);
                setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
                return request;
            }
        }
        fetchData().then((msg) => {

        })
            .catch((err) => {
                setError("An unknown error occured. Please try again.");
            });
    }, [selection]);
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    return (
        <>
            {error ? <header className="banner__error">
                <div className="banner__contents">
                    <h1 className="banner__title">{error}</h1>
                    <div className="banner__buttons">
                        <Link to="/"><button className="banner__button">Back to Home</button></Link>
                    </div>
                </div>
            </header> : <header className="banner"

                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}")`,
                    backgroundPosition: "center center",
                }}>
                    <div className="banner__contents">
                        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                        <div className="banner__buttons">
                            <button className="banner__button">Play</button>
                            <button className="banner__button">MyList</button>
                        </div>
                        <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
                    </div>
                    <div className="banner__fadeBottom"></div>
                </header>}

        </>
    )
}

export default Banner
