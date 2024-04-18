// import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { getMoviesForHomePage } from '../../Utils/api';
// import './Home.css';
// import MovieCard from '../../components/Movie/MovieCard';
// import Header from '../../components/Header/Header';
// import Footer from '../../components/Footer/Footer';

// const Home = () => {
//   const [phimLe, setPhimLe] = useState([]);
//   const [phimBo, setPhimBo] = useState([]);
//   const [phimMoi, setPhimMoi] = useState([]);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const moiResponse = await getMoviesForHomePage('moi');
//         const leResponse = await getMoviesForHomePage('le');
//         const boResponse = await getMoviesForHomePage('bo');

//         setPhimMoi(moiResponse);
//         setPhimLe(leResponse);
//         setPhimBo(boResponse);
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//       }
//     };

//     fetchMovies();
//   }, []);

//   const redirectToAllMovies = (category) => {
//     window.location.href = `/${category}`;
//   };

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 4,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//     ],
//   };

//   return (
//     <div className='mainBody'>
//       <Header />

//       <div className="home-container">
//         <div className="movie-section">
//           <h2>Phim mới cập nhật<Button onClick={() => redirectToAllMovies("phim-moi")} className="view-all-button">Xem tất cả</Button></h2>
//           <Slider {...settings}>
//             {phimMoi.map(movie => (
//               <div key={movie.id} className="movie-card">
//                 <MovieCard key={movie.id} movie={movie} />
//               </div>
//             ))}
//           </Slider>
//         </div>

//         <div className="movie-section">
//           <h2>Phim lẻ<Button onClick={() => redirectToAllMovies("phim-le")} className="view-all-button">Xem tất cả</Button></h2>
//           <Slider {...settings}>
//             {phimLe.map(movie => (
//               <div key={movie.id} className="movie-card">
//                 <MovieCard key={movie.id} movie={movie} />
//               </div>
//             ))}
//           </Slider>
//         </div>

//         <div className="movie-section">
//           <h2>Phim bộ<Button onClick={() => redirectToAllMovies("phim-bo")} className="view-all-button">Xem tất cả</Button></h2>
//           <Slider {...settings}>
//             {phimBo.map(movie => (
//               <div key={movie.id} className="movie-card">
//                 <MovieCard key={movie.id} movie={movie} />
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Home;








import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getMoviesForHomePage } from '../../Utils/api';
import './Home.css';
import MovieCard from '../../components/Movie/MovieCard';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import RandomMovieSidebar from '../../components/Sidebar/RandomMovieSidebar';
import { Link } from 'react-router-dom';

const Home = () => {
  const [phimLe, setPhimLe] = useState([]);
  const [phimBo, setPhimBo] = useState([]);
  const [phimMoi, setPhimMoi] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moiResponse = await getMoviesForHomePage('moi');
        const leResponse = await getMoviesForHomePage('le');
        const boResponse = await getMoviesForHomePage('bo');

        setPhimMoi(moiResponse);
        setPhimLe(leResponse);
        setPhimBo(boResponse);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const redirectToAllMovies = (category) => {
    window.location.href = `/${category}`;
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className='mainBody'>
      <Header />

      <div className="home-container">

        {/* <div className="movie-section">
          <h2>Phim mới cập nhật<Button onClick={() => redirectToAllMovies("phim-moi")} className="view-all-button">Xem tất cả</Button></h2>
          <Slider {...settings}>
            {phimMoi.map(movie => (
              <div key={movie.id} className="movie-card">
                <MovieCard key={movie.id} movie={movie} />
              </div>
            ))}
          </Slider>
        </div> */}

        <div className="movie-section">
          <h2>Phim lẻ<Button onClick={() => redirectToAllMovies("phim-le")} className="view-all-button">Xem tất cả</Button></h2>
          <Slider {...settings}>
            {phimLe.map(movie => (
              <div key={movie.id} className="movie-card">
                <MovieCard key={movie.id} movie={movie} />
              </div>
            ))}
          </Slider>
        </div>

        <div className="movie-section">
          {/* <h2>Phim bộ<Button onClick={() => redirectToAllMovies("phim-bo")} className="view-all-button">Xem tất cả</Button></h2> */}
          <h2>Phim bộ<Link to="/the-loai/2"> <Button  className="view-all-button">Xem tất cả</Button></Link></h2>
          <Slider {...settings}>
            {phimBo.map(movie => (
              <div key={movie.id} className="movie-card">
                <MovieCard key={movie.id} movie={movie} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* <RandomMovieSidebar /> */}

      <Footer />
    </div>
  );
};

export default Home;
