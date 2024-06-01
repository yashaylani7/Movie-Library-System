import { setFavoriteMovies, setWishlistMovies } from "../../Utils/ExtraData";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { fetchData } from "../../Utils/API";
import "./FavoriteMovies.css";
import { addIntoWishlist, removeFromWishlist, removeFromFavMovies } from "../../Utils/functions";
const FavoriteMovies = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [showBookMark, setShowBookMark] = useState(false)     // for wishlist icon
    const [movies, setMovies] = useState([])  // favorite movies
    const [wishMovies, setWishMovies] = useState([])
    const [wishlistMovieIds, setWishlistMovieIds] = useState([])

    const seeMovieDetails = (id) => {
        navigate(`/movie/${id}`)
    }

    const toggleBookMark = (id) => {
        setShowBookMark((prev) => {
            const newPrev = !prev;
            if (newPrev) {
                document.getElementById(`favorites_wishlist2_${id}`).style.opacity = 1;
                addIntoWishlist(id);
            }
            else {
                document.getElementById(`favorites_wishlist2_${id}`).style.opacity = 0;
                removeFromWishlist(id);
            }
            return newPrev;
        });
    }

    const clearFavoriteMovies = () => {
        localStorage.setItem("favMovies", JSON.stringify([]));
        setMovies([]);
    }

    const storeFavMovies = () => {
        const movie_ids = JSON.parse(localStorage.getItem("favMovies")) || [];
        Promise.all(movie_ids.map(id => fetchData(`https://api.themoviedb.org/3/movie/${id}`)))
            .then(movies => {
                setMovies(movies);
                setIsLoading(false);
            });
    }

    const removeMovie = (id) => {
        setMovies(movies.filter(movie => movie.id != id))
        removeFromFavMovies(id);
    }

    const storeWishlist = () => {
        const movie_ids = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlistMovieIds(movie_ids);
        Promise.all(movie_ids.map(id => fetchData(`https://api.themoviedb.org/3/movie/${id}`)))
            .then(movies => {
                setWishMovies(movies);
            });
    }


    useEffect(() => {
        storeFavMovies();
        storeWishlist();    // for wishlist icon to fill up
    }, [])

    useEffect(() => {
        for (let i = 0; i < movies.length; i++) {
            if (wishlistMovieIds.includes(movies[i].id.toString())) {
                try { document.getElementById(`favorites_wishlist2_${movies[i].id}`).style.opacity = 1; }
                catch (e) { console.log(e) }
            }
            else {
                try { document.getElementById(`favorites_wishlist2_${movies[i].id}`).style.opacity = 0; }
                catch (e) { console.log(e) }
            }
        }
    }, [movies, wishlistMovieIds])

    return (
        <div className="container favorites">
            <div className="favorites_header">
                <h1 id="favorites__heading">Favorite Movies</h1>
                {/* <button style={{ "backgroundColor": "green" }} onClick={setFavoriteMovies}>set favorite movies</button>
                <button style={{ "backgroundColor": "green" }} onClick={setWishlistMovies}>set wishlist</button> */}
                <button id="favorites_btn_clear" onClick={clearFavoriteMovies}>Clear Favorites</button>
            </div>
            {isLoading ? (<h1 className="loading_heading">Loading  . . .</h1>) : (
                <div>
                    {movies.length != 0 ? movies.map((movie) => {
                        return (
                            <div className="row favorites__movie_container" key={movie.id}>
                                <div className="col-2">
                                    <img id="favorites__movie_img" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie" onClick={() => seeMovieDetails(movie.id)} />
                                </div>
                                <div className="col-8 favorites_movie_content">
                                    <h1 id="favorites__movie_title" onClick={() => seeMovieDetails(movie.id)}>{movie.title}</h1>
                                    <p id="favorites__movie_description">{movie.overview}</p>
                                    {/* <p id="wishlist__movie_year">{movie.release_date}</p> */}
                                </div>
                                <div className="col-2 favorites_movie_btns">
                                    <button id="favorites__movie_rem_btn" className="btn btn-danger" onClick={() => removeMovie(movie.id)}>Remove</button>

                                    <div className='favorites__heart-icons' title='Add to wishlist' onClick={() => toggleBookMark(movie.id)}>
                                        <i id={`favorites_wishlist1_${movie.id}`} className="favorites_bookmark_icon fa-regular fa-bookmark"
                                            style={{
                                                color: '#00ff00',
                                                fontSize: 'xx-large',
                                            }}
                                        ></i>
                                        <i id={`favorites_wishlist2_${movie.id}`} className="favorites_bookmark_icon fa-solid fa-bookmark"
                                            style={{
                                                color: '#00ff00',
                                                fontSize: 'xx-large',
                                            }}
                                        ></i>
                                    </div>
                                </div>
                            </div>)
                    }) : <h1 className="no_record_heading">No movies in Favorites</h1>}
                </div>
            )}
        </div>
    )
}

export default FavoriteMovies
