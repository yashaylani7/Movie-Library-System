import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');   //  contains the value of search input
  const navigate = useNavigate();
  const redirectToSearch = (event) => {
    event.preventDefault();
    navigate(`/search/${searchTerm}`);
  }
  return (
    <nav className="navbar__main-block">
      <ul className="navbar__menu-bar">
      <li className="navbar__fields"><Link to='/'>Home</Link></li>
        <li className="navbar__search">
          <form onSubmit={redirectToSearch}>
            <input type="text" className="navbar__search-input" placeholder="search movie" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
            <button id="#searchButton" type='submit'>
              <i className="fa-solid fa-magnifying-glass fa-beat navbar__search-icon" ></i>
            </button>
          </form>
        </li>
        <li className="navbar__fields"><Link to='/upcoming'>Upcoming</Link></li>
        <li className="navbar__fields"><Link to='/wishlist'>Wish List</Link></li>
        <li className="navbar__fields"><Link to='/favorites'>Favorites</Link></li>
        <li className="navbar__fields"><Link to='/login'>Login</Link></li>
        {/* <li className="navbar__fields"><Link to='/login'>Login</Link></li>
        <li className="navbar__fields"><Link to='https://www.themoviedb.org/signup' target='blank'>Register</Link></li> */}
    </ul>
</nav >
  )
}

export default Navbar
