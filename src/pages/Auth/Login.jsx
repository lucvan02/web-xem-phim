import React, { useState } from 'react';
import { login } from '../../Utils/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [Repassword, setRePassword] = useState('');

    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await login(username, password);
            console.log('Login success:', response);
            navigate('/');
            // navigate('/admin/manage-movies');
        } catch (error) {
            console.error('Login error:', error);
            setError('Đăng nhập thất bại. Vui lòng thử lại.');
        }
    };

    const handleSwitchToRegister = () => {
        setIsRegistering(true);
    };

    const handleSwitchToLogin = () => {
        setIsRegistering(false);
    };

    return (
        <div className="login-wrapper" id="login-content">
            <div className="login-content">
                <h3>{isRegistering ? 'Đăng ký' : 'Đăng nhập'}</h3>
                {error && <p className="error">{error}</p>}
                {isRegistering ? (
                    <form className='loginform'>
                        <div className="row">
                            <label htmlFor="username">Tên người dùng:</label>
                            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="row">
                            <label htmlFor="password">Mật khẩu:</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="row">
                            <label htmlFor="password">Nhập lại mật khẩu:</label>
                            <input type="password" id="password" value={Repassword} onChange={(e) => setRePassword(e.target.value)} />
                        </div>
                        <div className="row">
                            <button type="submit">Đăng kí</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleLogin}>
                        <div className="row">
                            <label htmlFor="username">Tên người dùng:</label>
                            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="row">
                            <label htmlFor="password">Mật khẩu:</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        
                        <div className="row">
                            <button type="submit">Đăng nhập</button>
                        </div>
                    </form>
                )}
                {!isRegistering && (
                    <p className='if'>
                        Nếu chưa có tài khoản,{' '}
                        <button className="switch-to-register" onClick={handleSwitchToRegister}>đăng ký tại đây</button>.
                    </p>
                )}
                {isRegistering && (
                    <p className='if'>
                        Nếu đã có tài khoản,{' '}
                        <button className="switch-to-login" onClick={handleSwitchToLogin}>đăng nhập tại đây</button>.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;







// import React, { useState } from 'react';
// import { login } from '../../Utils/api';
// import { useNavigate, Link } from 'react-router-dom';
// import styles from './SignIn.module.scss'
// import image from '~/assets/Images';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [isRegistering, setIsRegistering] = useState(false);
//     const navigate = useNavigate();

//     const handleLogin = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await login(username, password);
//             console.log('Login success:', response);
//             navigate('/');
//         } catch (error) {
//             console.error('Login error:', error);
//             setError('Đăng nhập thất bại. Vui lòng thử lại.');
//         }
//     };

//     const handleSwitchToRegister = () => {
//         setIsRegistering(true);
//     };

//     const handleSwitchToLogin = () => {
//         setIsRegistering(false);
//     };

//     return (
//         <div className={styles.wrapper} style={{ backgroundImage: `url(${image.background})` }}>
//             <div className={styles.modal}>
//                 <Link to="/movie" className={styles.header}>
//                     <img className={styles.logoImg} src={image.logo} alt="logo" />
//                     <h4>Đăng nhập TwTCinema</h4>
//                 </Link>
//                 <form onSubmit={isRegistering ? null : handleLogin} className={styles.form}>
//                     <input
//                         type="text"
//                         id="username"
//                         value={username}
//                         placeholder="Nhập tên người dùng..."
//                         className={styles.input}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required={!isRegistering}
//                     />
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         placeholder="Nhập mật khẩu..."
//                         className={styles.input}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required={!isRegistering}
//                     />
//                     {isRegistering && (
//                         <input
//                             type="password"
//                             id="repassword"
//                             value={password}
//                             placeholder="Nhập lại mật khẩu..."
//                             className={styles.input}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required={isRegistering}
//                         />
//                     )}
//                     <button type="submit" className={styles.button}>
//                         {isRegistering ? 'Đăng ký' : 'Đăng nhập'}
//                     </button>
//                 </form>
//                 <p className={styles.textNote}>
//                     {isRegistering ? 'Bạn đã có tài khoản?' : 'Nếu chưa có tài khoản,'}{' '}
//                     <button onClick={isRegistering ? handleSwitchToLogin : handleSwitchToRegister}>
//                         {isRegistering ? 'Đăng nhập ngay bây giờ' : 'đăng ký tại đây'}
//                     </button>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;
