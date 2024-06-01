import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { imagesList } from '../../../Utils/ExtraData';
import { fetchData } from '/src/Utils/API';
import { useParams } from 'react-router-dom'
import './index.css';

function getRandomElements(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function index() {
  const [images, setImages] = useState(imagesList);
  const { id } = useParams()

  useEffect(() => {
    let data_images = [];
    fetchData(`https://api.themoviedb.org/3/movie/${id}/images`)
      .then(data => {
        // console.log(data)
        data_images = data.backdrops.map((image) => {
          return "https://image.tmdb.org/t/p/w500"+image.file_path;
        })  
        data_images = getRandomElements(data_images, 20);
        setImages(data_images);
      })
      .catch(err => console.error(err));
}, [])

  // responsive carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
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
  
  return (
    
    <div id='image_gallery_container'>
      <h1 id='image_gallery__images_heading'>Images</h1>
      <Carousel responsive={responsive}
        slidesToSlide={2}
        autoPlay={true}
        autoPlaySpeed={4500}
        infinite={true} transitionDuration={1000}
      >
        {images.map((image, i) => (
          <div key={i}>
            <img src={image} alt={i} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default index
