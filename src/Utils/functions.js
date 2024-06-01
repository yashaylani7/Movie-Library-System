export const addIntoFavMovies = (id) => {
    let movies = localStorage.getItem("favMovies") || [];
    if (!JSON.parse(movies.includes(id))) {
        localStorage.setItem("favMovies", JSON.stringify([...JSON.parse(movies), id.toString()]));
    }
}

export const removeFromFavMovies = (id) => {
    let movies = localStorage.getItem("favMovies") || [];
    localStorage.setItem("favMovies", JSON.stringify(JSON.parse(movies).filter(movie_id => movie_id != id)));
}

export const addIntoWishlist = (id) => {
    let movies = localStorage.getItem("wishlist") || [];
    if (!JSON.parse(movies.includes(id))) {
        localStorage.setItem("wishlist", JSON.stringify([...JSON.parse(movies), id.toString()]));
    }
}

export const removeFromWishlist = (id) => {
    let movies = localStorage.getItem("wishlist") || [];
    localStorage.setItem("wishlist", JSON.stringify(JSON.parse(movies).filter(movie_id => movie_id != id)));
}

