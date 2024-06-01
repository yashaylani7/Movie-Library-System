
import Top_Rated from '../../Components/Top_Rated/Top_Rated'
import './Upcoming.css'
function Upcoming() {
    // just calling the Top_Rated component with different props
    return (
        <Top_Rated heading="Upcoming" url="https://api.themoviedb.org/3/movie/upcoming"/>
    )
}

export default Upcoming
