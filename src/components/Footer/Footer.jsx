import React from 'react';
import { Container } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          {/* <h3>PTITHCM</h3> */}
          {/* <div className="contact-info">
            <img src="../../assets/img/hayphim.png" alt="logoweb" />
            <p>------PTITHCM<br />
              ------97 Man Thiện, Tăng Nhơn Phú A, TP.Thủ Đức</p>
            <p>------Call us: (+01) 23456789</p>
          </div> */}
          {/* <div className="feedback-form">
            <h4>Gửi ý kiến cho chúng tôi</h4>
            <form action="#">
              <input type="text" placeholder="" />
              <button type="submit" className="btn">Gửi ngay <i className="ion-ios-arrow-forward"></i></button>
            </form>
          </div> */}
        </div>
      </Container>
      <button className="back-to-top" onClick={scrollToTop}>^</button>
    </footer>
  );
};

export default Footer;
