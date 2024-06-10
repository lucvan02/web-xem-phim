import React, { useState, useEffect } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { createVNPayPayment, checkMoviePurchaseExists, getUserInfo } from '../../Utils/api';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  // const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            // if (userInfo && userInfo.username) {
            //      usernam = userInfo.username;
            // }
            
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getUserInfo();
        setUserInfo(user);
        if (user) {
          const exists = await checkMoviePurchaseExists(movie.movieId, user.username);
          setIsPurchased(exists);
        }
      } catch (error) {
        console.error('Error fetching user info or checking movie purchase:', error);
      }
    };

    fetchUserInfo();
  }, [movie.movieId]);

  const handleCardClick = (e) => {
    if (movie.price > 0 && !isPurchased) {
      e.preventDefault();
      setShowPopup(true);
    }
  };
  const navi = useNavigate();
  const handlePurchaseMovie = async () => {
   
    try {
      const paymentData = {
        // bankcode:9704198526191432198,
        amount: movie.price,
        language: '123',
        movieId: movie.movieId,
        movieName: movie.name,
        username: userInfo.username,
        email: userInfo.email,
        bankCode: 'NCB', 
        
      };
      const response = await createVNPayPayment(paymentData);
      window.location.href = response.data;
      // navi('/payment-result');
    } catch (error) {
      console.error('Error purchasing movie:', error);
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
            {movie.price === 0 ? (
              <div className="movie-rating">Free</div>
            ) : (
              <div className="movie-rating">
                {movie.price} <FontAwesomeIcon icon={faCoins} />
              </div>
            )}
            {movie.episodes === 1 ? (
              <div className="movie-views"><div className="movie-category">Full</div></div>
            ) : null}
          </div>

          <Card.Img variant="top" src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.image || movie.imageMovie}`} alt={movie.name} className="movie-image" />
          <Card.Body>
            <Card.Title className="movie-name">{movie.name || movie.movieName}</Card.Title>
          </Card.Body>
        </Link>
      </Card>

      <Modal show={showPopup} onHide={handleClosePopup} centered>
        <Modal.Header closeButton>
          <Modal.Title>Yêu cầu mua phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bộ phim này có giá {movie.price}đ. Bạn cần mua phim để có thể xem.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePopup}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handlePurchaseMovie}>
            Mua phim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovieCard;



