import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { fetchData } from '/src/Utils/API';
import { useParams } from 'react-router-dom'
import './index.css';

function getRandomElements(arr, n) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}
const video_types = ["Trailer", "Teaser", "Clip", "Behind the Scenes"]; 

// responsive carousel
const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 3
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

function index() {
    const [videos, setVideos] = useState([]);
    const { id } = useParams()
    useEffect(() => {
        let data_videos = [];
        fetchData(`https://api.themoviedb.org/3/movie/${id}/videos`)
            .then(data => {
                // console.log(data)
                data.results.map((object) => {                    
                    if (video_types.includes(object.type)) {
                        if (object.site === "YouTube") {
                                data_videos.push(object.key)
                        }
                    }
                })
                // console.log(data_videos);
                data_videos = getRandomElements(data_videos, 8);
                setVideos(data_videos);
            })
            .catch(err => console.error(err));
    }, [])

    return (
        <div id="video_gallery_container">
            <h1 id='video_gallery__videos_heading'>Videos</h1>
            <Carousel responsive={responsive}>
                {videos.map((video, i) => (
                    <div className='video_gallery_video' key={i}>
                        <iframe width="600" height="320" src={`https://www.youtube.com/embed/${video}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                ))}
            </Carousel>            
        </div>
    )
}

export default index
