import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../Utils/API';
import './Movie_Detail.css';

function Movie_Detail() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const [showHeart, setShowHeart] = useState(false);
    const [showWishlist, setShowWishlist] = useState(false);

    useEffect(() => {
        fetchData(`https://api.themoviedb.org/3/movie/${id}`).then(res => {
            setMovieDetails(res);
        });

        const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        setShowHeart(favMovies.includes(id));
        setShowWishlist(wishlist.includes(id));
    }, [id]);

    const toggleHeart = () => {
        const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
        const updatedFavMovies = showHeart ? favMovies.filter(movie => movie !== id) : [...favMovies, id];
        localStorage.setItem("favMovies", JSON.stringify(updatedFavMovies));
        setShowHeart(!showHeart);
    };

    const toggleWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const updatedWishlist = showWishlist ? wishlist.filter(movie => movie !== id) : [...wishlist, id];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setShowWishlist(!showWishlist);
    };

    return (
        <div className='container' id='movie_detail_component'>
            <div className="row">
                <div className="col-4 movie_detail__poster_img_container">
                    <div className='movie_detail__heart-icons' title='Add to favorites' onClick={toggleHeart}>
                        <i
                            className={`movie_detail_poster_heart_icon fa-regular fa-heart ${showHeart ? 'hidden' : ''}`}
                            style={{ color: '#00ff00', fontSize: 'xx-large' }}
                        />
                        <i
                            className={`movie_detail_poster_heart_icon fa-solid fa-heart ${showHeart ? '' : 'hidden'}`}
                            style={{ color: '#00ff00', fontSize: 'xx-large' }}
                        />
                    </div>
                    <div className='movie_detail__wishlist-icons' title="Add to wishlist" onClick={toggleWishlist}>
                        <i
                            className={`movie_detail_poster_wishlist_icon fa-regular fa-bookmark ${showWishlist ? 'hidden' : ''}`}
                            style={{ color: '#00ff00', fontSize: 'xx-large' }}
                        />
                        <i
                            className={`movie_detail_poster_wishlist_icon fa-solid fa-bookmark ${showWishlist ? '' : 'hidden'}`}
                            style={{ color: '#00ff00', fontSize: 'xx-large' }}
                        />
                    </div>
                    <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} id='movie_detail__poster_img' alt='Movie Poster' />
                    <div id='movie_detail__poster_rating'>
                        <div className="icon-star">
                            <i
                                className="fa-solid fa-star"
                                style={{ color: '#00ff00', fontSize: 'x-large' }}
                            />
                        </div>
                        <p>{movieDetails.vote_average?.toFixed(1)}</p>
                    </div>
                </div>
                <div className="col-1"></div>
                <div className="col-7 movie_detail__content">
                    <div id="movie_detail__title">
                        <h2>{movieDetails.title}</h2>
                    </div>
                    <div className="movie_detail__single_line_block">
                        <p>Runtime: {movieDetails.runtime} minutes</p>
                    </div>
                    <div id="movie_detail__description">
                        <h2 className="movie_detail__sub_heading">Description</h2>
                        <p>{movieDetails.overview}</p>
                    </div>
                    <div className="movie_detail__single_line_block">
                        <p>Release Date: {movieDetails.release_date}</p>
                    </div>
                    <div id="movie_detail__genres-container">
                        <h2 className="movie_detail__sub_heading">Genre</h2>
                        {movieDetails.genres?.map((genre, index) => (
                            <div key={index} id="movie_detail__genre-capsule">
                                <span>{genre.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="movie_detail__single_line_block">
                        <a id="movie_details__imdb_link" href={`https://www.imdb.com/title/${movieDetails.imdb_id}`} target='_blank' rel='noopener noreferrer'>Visit IMDB to watch</a>
                    </div>
                    <div className="movie_detail__single_line_block">
                        <a id="movie_details__rate_movie" href="#">Rate this movie</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Movie_Detail;
