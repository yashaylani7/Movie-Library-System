export const imagesList = [
    "src/assets/Images/img01.jpg",
    "src/assets/Images/img02.jpg",
    "src/assets/Images/img03.jpg",
    "src/assets/Images/img04.jpg",
    "src/assets/Images/img05.jpg",
    "src/assets/Images/img06.jpg",
    "src/assets/Images/img07.jpg",
    "src/assets/Images/img08.jpg",
    "src/assets/Images/img09.jpg",
    "src/assets/Images/img10.jpg",
    "src/assets/Images/img11.jpg",
    "src/assets/Images/img12.jpg",
    "src/assets/Images/img13.jpg",
    "src/assets/Images/img14.jpg",
    "src/assets/Images/img15.jpg",
    "src/assets/Images/img16.jpg",
    "src/assets/Images/img17.jpg",
    "src/assets/Images/img18.jpg",
    "src/assets/Images/img19.jpg",
    "src/assets/Images/img20.jpg",
]

export const now_playing_movies = [
    { image: "src/assets/Images/img01.jpg" ,
    title:"Zootopia", description:"This is a movie containing rabbit and some other animals inside a city and so on and on until they find something that has to be amazing"},
    { image: "src/assets/Images/img02.jpg" ,
    title:"Zootopia", description:"This is a movie containing rabbit and some other animals inside a city and so on and on until they find something that has to be amazing"},
    { image: "src/assets/Images/img03.jpg" ,
    title:"Zootopia", description:"This is a movie containing rabbit and some other animals inside a city and so on and on until they find something that has to be amazing"},
    { image: "src/assets/Images/img04.jpg" ,
    title:"Zootopia", description:"This is a movie containing rabbit and some other animals inside a city and so on and on until they find something that has to be amazing"},
    { image: "src/assets/Images/img05.jpg" ,
    title:"Zootopia", description:"This is a movie containing rabbit and some other animals inside a city and so on and on until they find something that has to be amazing"},
    { image: "src/assets/Images/img06.jpg" ,
    title:"Zootopia", description:"This is a movie containing rabbit and some other animals inside a city and so on and on until they find something that has to be amazing"},
]

const wishMovies = ["967847", "508883", "278", "497", "324857"]
const favoriteMovies = ["467244", "278", "497", "122", "324857"]

export const setWishlistMovies = () => {
    localStorage.setItem("wishlist", JSON.stringify(wishMovies));
}

export const setFavoriteMovies = () => {
    localStorage.setItem("favMovies", JSON.stringify(favoriteMovies));
}