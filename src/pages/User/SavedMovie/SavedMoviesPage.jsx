import React, { useEffect, useState } from 'react';
import { getAllMoviesByUser } from '../../../Utils/api'; // Đường dẫn đến file api.js của bạn
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import MovieCard from '../../../components/Movie/MovieCard';
// import './SavedMoviesPage.css'; // CSS cho giao diện đẹp hơn

const SavedMoviesPage = () => {
    const [savedMovies, setSavedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSavedMovies = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (userInfo && userInfo.username) {
                    const username = userInfo.username;
                    const response = await getAllMoviesByUser(username);
                    setSavedMovies(response);
                } else {
                    setError('No user information found');
                }
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error fetching saved movies');
                setLoading(false);
            }
        };

        fetchSavedMovies();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='mainBody'>
            <Header />
            <div className="saved-movies-page">
                <h1>Phim đã lưu</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : savedMovies.length === 0 ? (
                    <p>Bạn chưa lưu phim nào.</p>
                ) : (
                    <ul className="movie-list">
                        {savedMovies.map(movie => (
                            <li key={movie.id}>
                                <MovieCard movie={movie} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SavedMoviesPage;