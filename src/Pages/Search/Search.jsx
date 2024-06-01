import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchData } from '../../Utils/API'
import Top_Rated from '../../Components/Top_Rated/Top_Rated'


function Search() {
    const { query } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([])

    // useEffect(() => {
    //     setIsLoading(true)
    //     fetchData(`https://api.themoviedb.org/3/search/movie?query=${query}`).then(data => {
    //         setMovies(data.results)
    //         setIsLoading(false)
    //     })
    // }, [query])

    return (
        <div>
            <Top_Rated
                key={query}     // to re-render the component when the query changes
                heading={`Search for: ${query.toUpperCase()}`}
                url={`https://api.themoviedb.org/3/search/movie?query=${query}`}
                seeMore={false}
            />
        </div>
    )
}

export default Search
