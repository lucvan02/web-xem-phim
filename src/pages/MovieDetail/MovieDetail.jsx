import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetail, saveMovieToCollection, checkMovieCollectionExists, deleteCollectionByMovieAndUser } from '../../Utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBookmark } from '@fortawesome/free-solid-svg-icons';
import './MovieDetail.css';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { createVNPayPayment, checkMoviePurchaseExists } from '../../Utils/api';
import { Modal, Button } from 'react-bootstrap';
import Comment from '../Comment/Comment';


const MovieDetail = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saveMessage, setSaveMessage] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showPopup, setShowPopup] = useState(false);
   const [isMovieSaved, setIsMovieSaved] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  // const [userInfo, setUserInfo] = useState(null);
  const user = JSON.parse(localStorage.getItem('userInfo'));
          
  const handleButtonBuyClick = (e) => {
      e.preventDefault();
      setShowPopup(true);
  };
  


  const handlePurchaseMovie = async () => {
    
    try {
      const paymentData = {
        // bankcode:9704198526191432198,
        amount: movie.price,
        language: 'vn',
        movieId: movie.movieId,
        movieName: movie.name,
        username: user.username,
        email: user.email,
        bankCode: 'NCB', 
        
      };
      const response = await createVNPayPayment(paymentData);
      window.open(response.data, '_blank');
    } catch (error) {
      console.error('Error purchasing movie:', error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };



    useEffect(() => {
        const checkBought = async () => {
            try {
              // const user = await getUserInfo();
              // setUserInfo(user);
              if (user) {
                const exists = await checkMoviePurchaseExists(movieId, user.username);
                setIsPurchased(exists);
              }
            } catch (error) {
              console.error('Error fetching user info or checking movie purchase:', error);
            }
          };
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

        const checkMovieSaved = async () => {
            try {
                const username = JSON.parse(localStorage.getItem('userInfo')).username;
                const response = await checkMovieCollectionExists(movieId, username);
                setIsMovieSaved(response); // True nếu đã lưu, false nếu chưa
            } catch (error) {
                console.error('Error checking movie collection:', error);
            }
        };
        checkBought();
        fetchMovieDetail();
        checkMovieSaved();
    }, [movieId]);

    const handleSaveMovie = async () => {
        try {
            const username = JSON.parse(localStorage.getItem('userInfo')).username;
            const today = new Date().toISOString().split('T')[0];
            const movieCollection = { movieId: parseInt(movieId), username, time: today };

            if (isMovieSaved) {
                // Nếu đã lưu, thực hiện xoá
                await deleteCollectionByMovieAndUser(movieId, username);
                setIsMovieSaved(false);
                setSaveMessage('Đã xoá khỏi danh sách lưu phim');
            } else {
                // Nếu chưa lưu, thực hiện lưu
                const response = await saveMovieToCollection(movieCollection);
                setIsMovieSaved(true);
                setSaveMessage('Đã lưu phim');
            }
        } catch (error) {
            setSaveMessage('Error saving movie to collection');
        }
    };

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
            <Header />
            <div className="movie-detail">
                <h2 className="title">{movie.name}</h2>
                <div className="details">
                    <img src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.image}`} alt={movie.name} className="poster" />
                    <div className="info">
                        <p className="episodes">Số tập: {movie.episodes}</p>
                        <p className="schedule">Năm phát hành: {movie.movieSchedule}</p>
                        <p className="country">Quốc gia: {movie.country.name}</p>
                        <p className="star">
                            {movie.star === 0 ? (
                                <span>Chưa có đánh giá</span>
                            ) : (
                                <>
                                    Đánh giá: {movie.star}/5 <FontAwesomeIcon icon={faStar} />
                                </>
                            )}
                        </p>
                        <p className="price">Giá mua: {movie.price}</p>
                        <div className="list_cate">
                            <p>Thể loại</p>
                            
                            <div>
                                {movie.categories.map(category => (
                                    <Link to={`/the-loai/${category.categoryId}`} key={category.categoryId}>
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
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
                    
                        {(isPurchased||movie.price===0)? (

                        <div className="list_episode ah-frame-bg">
                            <div className="heading flex flex-space-auto fw-700">
                                <p>Danh sách tập</p>
                                <span id="newest-ep-is-readed" className="fs-13"></span>
                            </div>
                            {movie.episodes === 1 ? (
                                <div className="list-item-episode scroll-bar">
                                    <Link to={`/watch/${movieId}/${movie.episodeList[0].episodeId}`}>
                                        <span>Full</span>
                                    </Link>
                                </div>
                            ) : (
                                <div className="list-item-episode scroll-bar">
                                    {movie.episodeList.map(episode => (
                                        <Link to={`/watch/${movieId}/${episode.episodeId}`} key={episode.episodeId}>
                                            <span>{episode.episode}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}


                        </div>) : (
                            <button onClick={handleButtonBuyClick} className="purchase-button">Mua phim</button>
                        )}

                        

                        </div>

                        <div>
                            <span onClick={handleSaveMovie} className="save-movie-button">
                                <FontAwesomeIcon icon={faBookmark} />
                            </span>
                            {saveMessage && <p className="save-message">{saveMessage}</p>}
                        </div>
                    </div>
                </div>
                <p className="content">Mô tả: {movie.movieContent}</p>
                <div>
                    <p>Diễn viên:</p>
                    {movie.persons.length === 0 ? (
                        <p>Đang cập nhật</p>
                    ) : (
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {movie.persons.map(person => (
                                <div key={person.personId} style={{ margin: '10px', textAlign: 'center' }}>
                                    <img
                                        src={`${process.env.REACT_APP_UPLOAD_URL}/${person.image}`}
                                        alt={person.name}
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
                                    />
                                    <span style={{ display: 'block', marginTop: '5px' }}>{person.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Comment movieId={movieId} />
            <Footer />
        </div>
    );
};

export default MovieDetail;
