import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Css/Menubar.module.scss';


const MenuBar = () => {
  const [navbarStyle, setNavbarStyle] = useState({
    backgroundColor: 'transparent',
    boxShadow: 'none',
    transition: 'all 0.3s ease-in-out'
  }); // 초기값은 투명색과 그림자 없음
  
  const [Image, setImage] = useState('Logo/Logo_black_bar.svg');
  // const [uploadPage, setUploadPage] = useState('./Main');

  const toUploadPage = () => {
    if(localStorage.getItem('sort') === 'shoulder_'){
      document.location.href = "./shoulderUpload";
    }
    else if(localStorage.getItem('sort') === 'back_'){
      document.location.href = "./backUpload";
    }
    else if(localStorage.getItem('sort') === 'ankle_'){
      document.location.href = "./ankleUpload";
    }
    else {
      alert("운동을 먼저 진행해주세요.");
    }
  }

  useEffect(() => {
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navbarHeight = document.querySelector('nav').offsetHeight;

      if (currentScrollY > navbarHeight) {
        setNavbarStyle({
          backgroundColor: 'rgba(255,255,255,1)',
          boxShadow: '0px 3px 22px 1px #555555', // 그림자 효과 추가
          transition: 'all 0.3s ease-in-out'
        }); // 스크롤 위치에 따라 Navbar 스타일 변경
        
        setImage('Logo/Logo_color_bar.svg');

      } else {
        setNavbarStyle({
          backgroundColor: 'transparent',
          boxShadow: 'none', // 그림자 없애기
          transition: 'all 0.3s ease-in-out'
        });
        
        setImage('Logo/Logo_black_bar.svg');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar style={navbarStyle} fixed='top'>
      <Container>
        <div>
          <Navbar.Brand href='./Main'>
            <img src={Image} className={styles.logo}/>
          </Navbar.Brand>
        </div>
        <Nav>
          <Nav.Link href="./Main" className={styles.bar_line}>메인</Nav.Link>
          <Nav.Link href="./Main" className={styles.bar_line} onClick={()=>{localStorage.clear()}}>로그아웃</Nav.Link>
          <Nav.Link href="./exercisePage" className={styles.bar_line}>재활운동하기</Nav.Link>
          <Nav.Link onClick={toUploadPage} className={styles.bar_line}>업로드</Nav.Link>
          <Nav.Link href="./GraphPage" className={styles.bar_line}>마이페이지</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MenuBar;