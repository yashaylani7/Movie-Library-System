import React, { useState, useEffect } from 'react';
import { fetchData } from '/src/Utils/API';
import { useParams } from 'react-router-dom';
import './index.css'
const Actor = (props) =>{
    const { cast } = props;
    const {name, profile_path, character} = cast;
    // console.log(cast);
    return (<>
        <img className='cast_gallery__actor_img' src={profile_path ? "https://image.tmdb.org/t/p/w500" + profile_path : '/src/assets/Images/blank_profile_image.jpg'} alt={cast.name} />
        <div>
            <p className='actor_name' >{name}</p>
            <p className='actor_character'>{character}</p>
        </div>
    </>
    )
}

function index() {
    const [casts, setCasts] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        fetchData(`https://api.themoviedb.org/3/movie/${id}/credits`)
            .then(data => setCasts(data.cast));
    }, []);
    // console.log(casts)
    return (
        <div className='container'>
            <div className="row">
                <h1 id="cast_gallery__heading">Cast</h1>
                <div className="col-6 cast_column1">
                    {casts.slice(0, 10).map((cast, i) => (
                        <div className='cast_gallery__actor' key={i}>    
                            <Actor cast={cast}/>
                        </div>
                    ))}
                </div>
                <div className="col-6">
                    {/* <h2>Cast2</h2> */}
                    {casts.slice(10, 20).map((cast, i) => (
                        <div className='cast_gallery__actor' key={i}>
                            <Actor cast={cast} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default index
