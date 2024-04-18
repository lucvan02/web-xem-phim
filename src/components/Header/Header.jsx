import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCountries, getAllCategories } from '../../Utils/api';
import './Header.css';
import { FaUser, FaAngleDown } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';

function Header() {
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await getAllCategories();
                const countriesData = await getAllCountries();
                setCategories(categoriesData);
                setCountries(countriesData);
                const token = localStorage.getItem('token');
                if (token) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.href = '/login';
    };

    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/"><img className='logo' src="/hayphim.png" alt="" /></Link>
            </div>
            
            <nav className="nav-container">
                <ul className="nav-links">
                    <li><Link to="/">Trang chủ</Link></li>
                    <li><Link to="/phim-moi">Phim mới</Link></li>
                    <li><Link to="/the-loai/1">Phim lẻ</Link></li>
                    <li><Link to="/the-loai/2">Phim bộ</Link></li>
                    <li className="dropdown">
                        <span>Thể loại</span>
                        <div className="dropdown-content">
                            {categories.map(category => (
                                <Link key={category.id} to={`/the-loai/${category.categoryId}`}>
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                        <FaAngleDown className="dropdown-icon" />
                    </li>
                    <li className="dropdown">
                        <span>Quốc gia</span>
                        <div className="dropdown-content">
                            {countries.map(country => (
                                <Link key={country.id} to={`/quoc-gia/${country.countryId}`}>
                                    {country.name}
                                </Link>
                            ))}
                        </div>
                        <FaAngleDown className="dropdown-icon" />
                    </li>
                </ul>
            </nav>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Tìm kiếm phim..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <button type="button">Tìm kiếm</button> */}
            </div>

            <ul className="user-actions">
                {isLoggedIn ? (
                    <li className="dropdown">
                        <Dropdown>
                            <Dropdown.Toggle variant="none" id="dropdown-basic">
                                <FaUser className="user-icon" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/thong-tin-tai-khoan">Thông tin tài khoản</Dropdown.Item>
                                <Dropdown.Item href="/doi-mat-khau">Đổi mật khẩu</Dropdown.Item>
                                <Dropdown.Item href="/phim-da-mua">Phim đã mua</Dropdown.Item>
                                <Dropdown.Item href="/phim-da-luu">Phim đã lưu</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="login-btn">Đăng nhập</Link>
                        </li>
                        <li>
                            <Link to="/signup" className="signup-btn">Đăng ký</Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
}

export default Header;
