import axios from '../helpers/axios';
import React, { useEffect, useState } from 'react';
import './Reviews.css';
import StarRatingComponent from 'react-star-rating-component';

const API_KEY = "27a364e66a0acad65a3d2eda58c2bec5";

function Reviews({ id }) {
    const base_url = "https://image.tmdb.org/t/p/original";
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`/movie/${id}/reviews?api_key=${API_KEY}`);
            setReviews(request.data.results);
            return request;
        }
        fetchData().then(
        );
    }, [id, reviews])
    return (
        
        <div className="review__row">
            <h2>Reviews</h2>
            {reviews ? reviews.map((review) => (
                <div className="review__content" key={review.id}>

                    {review?.author_details?.avatar_path ? <img className="review__avatar"
                        src={`${base_url}${review?.author_details?.avatar_path}`} alt={review.author}
                    ></img> : <img className="review__avatar"
                        src={'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'} alt={review.author}
                    ></img>}

                    <div className="review__details">
                        <h4>{review?.author}</h4>
                        <StarRatingComponent
                            name={`rate${review?.author}`}
                            starCount={10}
                            value={review?.author_details?.rating}
                            editing={false}
                        />
                    </div>
                </div>

            )) : <h3>No reviews found</h3>
            }
        </div >
    )
}

export default Reviews
