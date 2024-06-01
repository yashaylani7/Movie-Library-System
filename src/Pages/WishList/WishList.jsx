import { setFavoriteMovies, setWishlistMovies } from "../../Utils/ExtraData";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { fetchData } from "../../Utils/API";
import "./WishList.css";
import { addIntoFavMovies, removeFromFavMovies, removeFromWishlist } from "../../Utils/functions";
const WishList = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [movies, setMovies] = useState([])  // wishlist movies
    const [showHeart, setShowHeart] = useState(false)   // for favorites icon
    const [favMovies, setFavMovies] = useState([])
    const [favMoviesIds, setFavMoviesIds] = useState([])

    const seeMovieDetails = (id) => {
        navigate(`/movie/${id}`)
    }

    const toggleHeart = (id) => {
        setShowHeart((prev) => {
            const newPrev = !prev;
            if (newPrev) {
                document.getElementById(`wishlist_hear2_${id}`).style.opacity = 1;
                addIntoFavMovies(id);
            }
            else {
                document.getElementById(`wishlist_hear2_${id}`).style.opacity = 0;
                removeFromFavMovies(id);
            }
            return newPrev;
        });
    }

    const clearWishlist = () => {
        localStorage.setItem("wishlist", JSON.stringify([]));
        setMovies([]);
    }

    const storeWishlist = () => {
        const movie_ids = JSON.parse(localStorage.getItem("wishlist")) || [];
        Promise.all(movie_ids.map(id => fetchData(`https://api.themoviedb.org/3/movie/${id}`)))
            .then(movies => {
                setMovies(movies);
                setIsLoading(false);
            });
    }

    const removeMovie = (id) => {
        setMovies(movies.filter(movie => movie.id != id))
        removeFromWishlist(id);
    }

    const storeFavoriteMovies = () => {
        const movie_ids = JSON.parse(localStorage.getItem("favMovies")) || [];
        setFavMoviesIds(movie_ids);
        Promise.all(movie_ids.map(id => fetchData(`https://api.themoviedb.org/3/movie/${id}`)))
            .then(movies => {
                setFavMovies(movies);
            });
    }

    useEffect(() => {
        storeWishlist();
        storeFavoriteMovies();      // for favorites icon to fill up
    }, [])

    useEffect(() => {
        for (let i = 0; i < movies.length; i++) {
            if (favMoviesIds.includes(movies[i].id.toString())) {
                try { document.getElementById(`wishlist_hear2_${movies[i].id}`).style.opacity = 1; }
                catch (error) { console.log(error) }

            }
            else {
                try { document.getElementById(`wishlist_hear2_${movies[i].id}`).style.opacity = 0; }
                catch (error) { console.log(error) }
            }
        }
    }, [movies, favMoviesIds])

    return (
        <div className="container wishlist">
            <div className="wishlist_header">
                <h1 id="wishlist__heading">Wishlist</h1>
                {/* <button style={{ "backgroundColor": "green" }} onClick={setWishlistMovies}>set wishlist</button>
                <button style={{ "backgroundColor": "green" }} onClick={setFavoriteMovies}>set favMovies</button> */}
                <button id="wishlist_btn_clear" onClick={clearWishlist}>Clear Wishlist</button>
            </div>
            {isLoading ? (<h1 className="loading_heading">Loading  . . .</h1>) : (
                <div>
                    {movies.length != 0 ? movies.map((movie) => {
                        return (
                            <div className="row wishlist__movie_container" key={movie.id}>
                                <div className="col-2">
                                    <img id="wishlist__movie_img" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie" onClick={() => seeMovieDetails(movie.id)} />
                                </div>
                                <div className="col-8 wishlist_movie_content">
                                    <h1 id="wishlist__movie_title" onClick={() => seeMovieDetails(movie.id)}>{movie.title}</h1>
                                    <p id="wishlist__movie_description">{movie.overview}</p>
                                    {/* <p id="wishlist__movie_year">{movie.release_date}</p> */}
                                </div>
                                <div className="col-2 wishlist_movie_btns">
                                    <button id="wishlist__movie_rem_btn" className="btn btn-danger" onClick={() => removeMovie(movie.id)}>Remove</button>
                                    <div className='wishlist__heart-icons' title='Add to favorites' onClick={() => toggleHeart(movie.id)}>
                                        <i id={`wishlist_hear1_${movie.id}`} className="wishlist_heart_icon fa-regular fa-heart"
                                            style={{
                                                color: '#00ff00',
                                                fontSize: 'xx-large',
                                            }}
                                        ></i>
                                        <i id={`wishlist_hear2_${movie.id}`} className="wishlist_heart_icon fa-solid fa-heart"
                                            style={{
                                                color: '#00ff00',
                                                fontSize: 'xx-large',
                                            }}
                                        ></i>
                                    </div>
                                </div>
                            </div>)
                    }) : <h1 className="no_record_heading">No movies in wishlist</h1>}
                </div>
            )}
            
            

        </div>

    )
}

export default WishList
