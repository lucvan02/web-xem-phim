import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginComponent from '../pages/Auth/LoginComponent';
import Home from '../pages/Home/Home';
import Header from '../components/Header/Header';
import MovieCategory from '../pages/MovieByCategory/MovieByCategory';
import MovieDetail from '../pages/MovieDetail/MovieDetail';
// import AddMovieForm from '../pages/Admin/AddMovie.jsx';
import CategoryMovies from '../pages/CategoryMovie/CategoryMovie';
import MovieNew from '../pages/MovieNew/MovieNew';
import AddMovie from '../pages/Admin/AddMovie';
import WatchMovie from '../pages/WatchMovie/WatchMovie';
import MovieList from '../components/Movie/MovieList';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/" element={<Home />} />
      <Route path="/phim-moi" element={<MovieNew />} />
      <Route path="/phim-le" element={<MovieCategory categoryId={1} />} />
      <Route path="/phim-bo" element={<MovieCategory categoryId={2} />} />
      
      <Route path="/the-loai/:categoryId" element={<CategoryMovies/>} />
      {/* <Route path="/quoc-gia/:countryId" element={<CountryMovies/>} /> */}

      <Route path="/movie/:movieId" element={<MovieDetail />} />
      <Route path="/watch/:movieId" element={<WatchMovie/>} />

      <Route path="/allMovies" element={<MovieList />} />

      <Route path="admin/add-movie" element={<AddMovie/>} />
    </Routes>
  );
};

export default AppRoutes;
