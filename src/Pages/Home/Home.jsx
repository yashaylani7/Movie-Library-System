import React from 'react';
import Now_Playing from '../../Components/Now_Playing/Now_Playing';
import Top_Rated from '../../Components/Top_Rated/Top_Rated';
import './Home.css';

function Home() {
  return (
    <>
      <Now_Playing />
      <Top_Rated heading="Top Rated" url="https://api.themoviedb.org/3/movie/top_rated"/>
    </>
  );
}

export default Home;
