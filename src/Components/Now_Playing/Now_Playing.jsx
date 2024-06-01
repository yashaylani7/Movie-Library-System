import { useState, useEffect } from 'react';
import './Now_playing.css';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../Utils/API';

function Now_Playing() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upNextMovies, setUpNextMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const nowPlayingRes = await fetchData("https://api.themoviedb.org/3/movie/now_playing");
        const upNextRes = await fetchData("https://api.themoviedb.org/3/movie/now_playing?page=2");
        
        setNowPlayingMovies(nowPlayingRes.results.slice(0, 10));
        setUpNextMovies(upNextRes.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const seeMovieDetails = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className='now-playing'>
      <div className="headings">
        <h1>Now Playing</h1>
        <h1>Up Next</h1>
      </div>
      {isLoading ? (
        <h1 className='loading_heading'>Loading . . .</h1>
      ) : (
        <div className="main-container">
          {/* Now Playing */}
          <div className="slide-show">
            <div id="moviesCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2400">
              <div className="carousel-indicators">
                {nowPlayingMovies.map((movie, index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#moviesCarousel"
                    data-bs-slide-to={index}
                    className={index === currentIndex ? 'active' : ''}
                    aria-current={index === currentIndex ? 'true' : 'false'}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
              <div className="carousel-inner">
                {nowPlayingMovies.map((movie, index) => (
                  <div key={index} onClick={() => seeMovieDetails(movie.id)} className={`carousel-item ${index === currentIndex ? 'active' : ''}`}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="d-block w-100 carousel-img" alt={movie.title} />
                    <div className="carousel-caption d-none d-md-block">
                    </div>
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#moviesCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#moviesCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          {/* Up Next */}
          <div id="upNextMoviesCards">
            {upNextMovies.map((movie, index) => (
              <div className="upNextMoviesCards__card" key={index}>
                <div className="row">
                  <div className="col-md-4">
                    <img id="upNextMoviesCards__card__img" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="img-fluid rounded-start aside-card-image" alt={movie.title} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">{movie.overview}</p>
                      <button id="now_playing_up_next__movie_btn" onClick={() => seeMovieDetails(movie.id)}>More</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Now_Playing;
