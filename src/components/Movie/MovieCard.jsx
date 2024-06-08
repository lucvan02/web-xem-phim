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
//         <div className="movie-info">
//           <div className="movie-rating">
//             {movie.star}/5 <FontAwesomeIcon icon={faStar} />
//           </div>
//           <div className="movie-views">
//             {/* <FontAwesomeIcon icon={faEye} /> {movie.views} */}
//             {movie.categories.some(category => category.name === "Phim lẻ") ? (
//             <div className="movie-category">Full</div>
//           ) : null}
//           </div>
          
//         </div>
//         <Card.Img variant="top" src={movie.image} alt={movie.name} className="movie-image" />
//         {/* <Card.Img variant="top"  src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.image}`} alt={movie.name} className="movie-image" /> */}
//         <Card.Body>
//           <Card.Title className="movie-name">{movie.name}</Card.Title>
//         </Card.Body>
//       </Link>
//     </Card>
//   );
// };

// export default MovieCard;
















import React, { useState } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEye } from '@fortawesome/free-solid-svg-icons';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleCardClick = (e) => {
    if (movie.price > 0) {
      e.preventDefault();
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <Card className="movie-card">
        <Link to={`/movie/${movie.movieId}`} className="movie-link" onClick={handleCardClick}>
          <div className="movie-info">
            <div className="movie-rating">
              {movie.star}/5 <FontAwesomeIcon icon={faStar} />
            </div>
            {/* <div className="movie-views">
              {movie.categories.some(category => category.name === "Phim lẻ") ? (
                <div className="movie-category">Full</div>
              ) : null}
            </div> */}
            {/* nếu phim có tổng số tập bằng 1 thì hiện chữ full */}
            {movie.episodes === 1 ? (
              <div className="movie-views"><div className="movie-category">Full</div></div>
            ) : null}
          </div>
          <Card.Img variant="top" src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.image}`} alt={movie.name} className="movie-image" />
          <Card.Body>
            <Card.Title className="movie-name">{movie.name}</Card.Title>
          </Card.Body>
        </Link>
      </Card>

      <Modal show={showPopup} onHide={handleClosePopup} centered>
        <Modal.Header closeButton>
          <Modal.Title>Yêu cầu mua phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bộ phim này có giá {movie.price}. Bạn cần mua phim để có thể xem.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePopup}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => { /* logic mua phim */ }}>
            Mua phim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovieCard;
