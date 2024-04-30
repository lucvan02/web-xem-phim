import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEye } from '@fortawesome/free-solid-svg-icons';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <Card className="movie-card">
      <Link to={`/movie/${movie.movieId}`} className="movie-link">
        <div className="movie-rating">{movie.star}/5<FontAwesomeIcon icon={faStar} /> </div>
        {/* <div className="movie-episodes">Số tập: {movie.episodes}</div> */}
        <div className="movie-views"><FontAwesomeIcon icon={faEye} /> {movie.views}</div>
        <Card.Img variant="top" src={movie.image} alt={movie.name} className="movie-image" />
        <Card.Body>
          <Card.Title className="movie-name">{movie.name}</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default MovieCard;


// import React from 'react';
// import { Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faEye } from '@fortawesome/free-solid-svg-icons';
// import './MovieCard.css';

// const MovieCard = ({ movie }) => {
//   return (
//     <Card className="movie-card">
//       <Link to={`/movie/${movie.movieId}`} className="movie-link">
//         <Card.Img variant="top" src={movie.image} alt={movie.name} className="movie-image" />
//         <div className="movie-details">
//           <div className="movie-info">
//             <div className="movie-rating"><FontAwesomeIcon icon={faStar} /> {movie.star}</div>
//             {/* <div className="movie-episodes">Số tập: {movie.episodes}</div> */}
//             <div className="movie-views"><FontAwesomeIcon icon={faEye} /> {movie.views}</div>
//           </div>
//           <Card.Title className="movie-name">{movie.name}</Card.Title>
//         </div>
//       </Link>
//     </Card>
//   );
// };

// export default MovieCard;