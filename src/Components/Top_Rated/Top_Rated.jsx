import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { imagesList } from '../../Utils/ExtraData';
import { fetchData } from '../../Utils/API';
import './Top_Rated.css';

function Top_Rated({ heading, url, seeMore = true }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);  // for fetching more movies on See More button
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(2);

    const seeMovieDetails = (id) => {
        navigate(`/movie/${id}`);
    };

    const fetchMoreMovies = async () => {
        setIsFetching(true);
        try {
            const res = await fetchData(`${url}?page=${page}`);
            if (res && res.results) {
                setMovies((prevMovies) => [...prevMovies, ...res.results]);
                setPage((prevPage) => prevPage + 1);
            }
        } catch (error) {
            console.error('Error fetching more movies:', error);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetchData(url);
                if (res && res.results) {
                    setMovies(res.results);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [url]);

    return (
        <>
            <h1 className="top_rated__main-heading">
                {heading}
            </h1>
            {isLoading ? (
                <h1 className='loading_heading'>Loading . . .</h1>
            ) : (
                <div className="top-rated-movies-cards">
                    {movies.map((movie, index) => (
                        <div key={movie.id}>
                            <div className="top_rated__main-container">
                                <div className="card">
                                    <img 
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : imagesList[index % 20]}
                                        alt="Movie Poster"
                                    />
                                    <div className="card__overlay">
                                        <div className="icon-star">
                                            <i
                                                className="fa-solid fa-star"
                                                style={{
                                                    color: '#00ff00',
                                                    fontSize: 'xx-large'
                                                }}
                                            />
                                        </div>
                                        <div className="rating">
                                            {movie.vote_average.toFixed(1)}
                                        </div>
                                        <div className="button-detail">
                                            <button className="learn-more" onClick={() => seeMovieDetails(movie.id)}>
                                                <span
                                                    aria-hidden="true"
                                                    className="circle"
                                                >
                                                    <span className="icon arrow" />
                                                </span>
                                                <span className="button-text">
                                                    View Details
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card__content">
                                    <a
                                        className="movie-title"
                                        onClick={() => seeMovieDetails(movie.id)}
                                    >
                                        {movie.title}
                                    </a>
                                    <div className="movie-year">
                                        {movie.release_date?.slice(0, 4)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {seeMore && (
                        <button id="top_rated__see_more_btn" onClick={fetchMoreMovies}>
                            {isFetching ? "Fetching ..." : "See More"}
                        </button>
                    )}
                </div>
            )}
        </>
    );
}

export default Top_Rated;
