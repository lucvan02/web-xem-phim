// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { getMovieDetail } from '../../Utils/api';
// import './MovieDetail.css'; // Import your CSS file here
// import Header from '../../components/Header/Header'; // Import Header component
// import Footer from '../../components/Footer/Footer'; // Import Footer component

// const MovieDetail = () => {
//   const { movieId } = useParams();
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMovieDetail = async () => {
//       try {
//         const movieDetail = await getMovieDetail(movieId);
//         setMovie(movieDetail);
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching movie detail');
//         setLoading(false);
//       }
//     };

//     fetchMovieDetail();
//   }, [movieId]);

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">Error: {error}</div>;
//   }

//   if (!movie) {
//     return <div className="no-movie">No movie found</div>;
//   }

//   return (
//     <div>
//       <Header />
//       <div className="ah_content">
//         <div className="movie-detail">

//           <div className="info-movie">
//             <h1 className="heading_movie">{movie.name}</h1>
//             <div className="head ah-frame-bg">
//               <div className="first">
//                 <img src={movie.image} alt={movie.name} />
//               </div>
//               <div className="last">
//                 <div className="list_cate">
//                   <div>Thể loại</div>
//                   <div>
//                     {movie.categories.map(category => (
//                       <Link to={`/the-loai/${category.categoryId}`}>
//                         {category.name}
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//                 {/* <div className="status">
//                   <div>Trạng thái</div>
//                   <div>{movie.status === 1 ? 'Đang tiến hành' : 'Inactive'}</div>
//                 </div> */}
//                 <div className="score">
//                   <div>Điểm</div>
//                   <div>{movie.star}</div>
//                 </div>
//                 <div className="update_time">
//                   <div>Phát hành</div>
//                   <div>{movie.movieSchedule}</div>
//                 </div>
//                 <div className="duration">
//                   <div>Thời lượng</div>
//                   <div>{movie.episodes} Tập</div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex ah-frame-bg flex-wrap">
//               <div className="flex flex-wrap flex-1">
//                 <Link to={`/watch/${movieId}`} className="padding-5-15 fs-35 button-default fw-500 fs-15 flex flex-hozi-center bg-lochinvar" title="Xem Ngay">
//                   <span className="material-icons-round">play_circle_outline</span>
//                 </Link>
//                 <a href="javascript:void(0)" id="toggle_follow" className="bg-green padding-5-15 fs-35 button-default fw-500 fs-15 flex flex-hozi-center" title="Theo dõi phim này">
//                   <span className="material-icons-round">bookmark_add</span>
//                 </a>
//               </div>
//               <div className="last">
//                 <div id="rated" className="bg-orange padding-5-15 fs-35 button-default fw-500 fs-15 flex flex-hozi-center">
//                   <span className="material-icons-round">stars</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="body">
//             <div className="list_episode ah-frame-bg">
//               <div className="heading flex flex-space-auto fw-700">
//                 <span>Danh sách tập</span>
//                 <span id="newest-ep-is-readed" className="fs-13"></span>
//               </div>
//               <div className="list-item-episode scroll-bar">
//                 {movie.episodeList.map(episode => (
//                   <a key={episode.episodeId} href={episode.link} title={`Tập ${episode.episode}`}>
//                     <span>{episode.episode}</span>
//                   </a>
//                 ))}
//               </div>
//             </div>
//             <div className="desc ah-frame-bg">
//               <div>
//                 <h2 className="heading">Nội dung</h2>
//               </div>
//               <div>{movie.movieContent}</div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default MovieDetail;




import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import { getMovieDetail } from '../../Utils/api';
import './MovieDetail.css';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const movieDetail = await getMovieDetail(movieId);
        setMovie(movieDetail);
        setLoading(false);
      } catch (error) {
        setError('Error fetching movie detail');
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!movie) {
    return <div className="no-movie">No movie found</div>;
  }

  return (
    <div className='mainBody'>
    <Header/>

    <div className="movie-detail">
      <h2 className="title">{movie.name}</h2>
      <div className="details">
        <img src={movie.image} alt={movie.name} className="poster" />
        <div className="info">
          {/* <h3 className="name">{movie.name}</h3> */}
          
          <p className="episodes">Số tập: {movie.episodes}</p>
          <p className="schedule">Năm phát hành: {movie.movieSchedule}</p>
          <p className="country">Quốc gia: {movie.country.name}</p>
          <p className="star">Đánh giá: {movie.star}/5</p>
          <p className="price">Giá mua: {movie.price}</p>
          <p className="views">Lượt xem: {movie.views}</p>

          {/* <p className="status">Status: {movie.status === 1 ? 'Active' : 'Inactive'}</p> */}
          {/* <h4 className="categories">Thể loại:</h4>
          <ul className="category-list">                    
            {movie.categories.map(category => (
              <li key={category.categoryId} className="category-item">{category.name}</li>
            ))}
          </ul>
          <h4 className="episode-list">Episode List:</h4>
          <ul className="episode-list">
            {movie.episodeList.map(episode => (
              <li key={episode.episodeId} className="episode-item">
                {episode.name} - Episode: {episode.episode}, Season: {episode.season}
              </li>
            ))}
          </ul> */}


         <div className="list_cate">
                  <p>Thể loại</p>
                  <div>
                    {movie.categories.map(category => (
                      <Link to={`/the-loai/${category.categoryId}`}>
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

           {/* <div className="list_episode ah-frame-bg">
              <div className="heading flex flex-space-auto fw-700">
                <p>Danh sách tập</p>
                <span id="newest-ep-is-readed" className="fs-13"></span>
              </div>
              <div className="list-item-episode scroll-bar">
                {movie.episodeList.map(episode => (
                  <a key={episode.episodeId} href={episode.episodeId} title={`Tập ${episode.episode}`}>
                    <span>{episode.episode}</span>
                  </a>
                ))}
              </div>
            </div> */}


          {/* <Link to={`/watch/${movieId}`} className="watch-now-button">Lưu phim</Link> */}

          <Link to={`/watch/${movieId}`} className="watch-now-button">Xem ngay</Link>
        </div>
      </div>
      <p className="content">Mô tả: {movie.movieContent}</p>
    </div>
    

    <div className='list-comment'>
      <h2>Bình luận</h2>
    </div>

    <Footer/>
    </div>
  );
};

export default MovieDetail;
