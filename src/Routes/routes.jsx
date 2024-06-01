import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from '../App';
import Home from '../Pages/Home/Home';
import Movie from '../Movie/Movie';
import Upcoming from '../Pages/Upcoming/Upcoming';
import WishList from '../Pages/WishList/WishList';
import FavoriteMovies from '../Pages/FavoriteMovies/FavoriteMovies';
import Search from '../Pages/Search/Search';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='movie/:id' element={<Movie />} />
      <Route path='upcoming' element={<Upcoming />} />
      <Route path='wishlist' element={<WishList />} />
      <Route path='favorites' element={<FavoriteMovies />} />
      <Route path='search/:query' element={<Search />} />
      <Route path='*' element={<Home />} />
    </Route>
  )
);

export default router;
