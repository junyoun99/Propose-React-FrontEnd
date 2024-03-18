import {useEffect, useState, Component} from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import MenuBaAfterLogin from './MenuBarAfterLogin';
import Footer from './Footer';
import styles from './Css/Final.module.scss';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Loading from './Loading'


const BackUpload = () => {  
      
  const name = localStorage.getItem('id')
  const sort = localStorage.getItem('sort')
  const [point1, setPoint1] = useState("");
  const [point2, setPoint2] = useState("");
  const [point3, setPoint3] = useState("");
  const [point4, setPoint4] = useState("");

  const imagePath = localStorage.getItem('id') + "/" + localStorage.getItem('sort') + "/";

  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0
  };

  const image1 = [
    imagePath + '0.jpg',
    imagePath +  'images/back_0.jpg'
  ];

  const image2 = [
    imagePath + '1.jpg',
    imagePath +  'images/back_1.jpg'
  ];

  const image3 = [
    imagePath + '2.jpg',
    imagePath +  'images/back_2.jpg'
  ];

  const image4 = [
    imagePath + '3.jpg',
    imagePath +  'images/back_3.jpg'
  ];

  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [currentIndex3, setCurrentIndex3] = useState(0);
  const [currentIndex4, setCurrentIndex4] = useState(0);

  const [comment0, setComment0] = useState("")
  const [comment1, setComment1] = useState("")
  const [comment2, setComment2] = useState("")
  const [comment3, setComment3] = useState("")

  const [checked, setChecked] = useState(true);

  
  const save = () => {
    let average_point = parseInt(parseFloat(point1) + parseFloat(point2) + parseFloat(point3) + parseFloat(point4))/4
    let add_point = localStorage.getItem('point_back') + ',' + average_point.toString()
      localStorage.setItem('point_back', add_point)
      if(add_point != null){
        axios.post('http://localhost:8080/members/AddPoint', {
                id: name,
                sort: sort,
                points: add_point
            }).then((res) => {
                console.log(average_point)
                console.log(localStorage.getItem('point_back'))
                console.log(add_point)
                console.log(res.data.point_back);
            })
      }
      alert("기록이 저장되었습니다.")
  }

  useEffect(() => {
    const filePath = localStorage.getItem('id') + "/" + localStorage.getItem('sort') + "/partpoint.txt"; // replace with your file path
    const commentFilePath = localStorage.getItem('id') + "/" + localStorage.getItem('sort') + "/comment.txt";
    
    fetch(filePath)
      .then((response) => {
        // console.log(response.status)
        if (!response.ok) {
          throw new Error("Failed to load file");
        }
        return response.text();
      })
      .then((data) => {
        if(data.length < 100){
          // let point_1 = data.split(',')[0]
          setPoint1(data.split(',')[0]);
          setPoint2(data.split(',')[1]);
          setPoint3(data.split(',')[2]);
          setPoint4(data.split(',')[3]);
        }
        
      })
      .catch((error) => {
        console.error(error);
      });

      fetch(commentFilePath)
      .then((response) => {
        // console.log(response.status)
        if (!response.ok) {
          throw new Error("Failed to load file");
        }
        return response.text();
      })
      .then((data) => {
        if(data.length < 1000){
        
          let comments0 = ""
          let comments1 = ""
          let comments2 = ""
          let comments3 = ""

          
          for(let i = 0; i < 4; i++){
            let rightArm = true;
            let leftArm = true;
            let rightLeg = true;
            let leftLeg = true;
            for(let j = 0; j < data.split('&,')[i].split(',').length; j++){
                if(rightArm){
                  if((parseInt(data.split('&,')[i].split(',')[j*2]) === 1) || (parseInt(data.split('&,')[i].split(',')[j*2]) === 3)){
                    if(parseInt(data.split('&,')[i].split(',')[j*2]) === 1){
                      rightArm = false;
                    }
                    if(parseInt(data.split('&,')[i].split(',')[j*2+1]) < 0){
                      if(i === 0){
                        comments0 = comments0 + "오른쪽 팔을 더 올려주세요.\n"
                      }
                      else if(i === 1){
                        comments1 = comments1 + "오른쪽 팔을 귓쪽에 붙여주세요.\n"
                      }
                      else if(i === 2){
                        comments2 = comments2 + "오른쪽 팔을 귓쪽에 붙여주세요.\n"
                      }
                      else if(i === 3){
                        
                      }
                    }
                    else{
                      if(i === 0){
                        comments0 = comments0 + "오른쪽 팔을 더 내려주세요.\n"
                      }
                      else if(i === 1){
                        comments1 = comments1 + "오른쪽 팔이 너무 귀에 붙어있는 듯 합니다.\n"
                      }
                      else if(i === 2){
                        comments2 = comments2 + "오른쪽 팔이 너무 귀에 붙어있는 듯 합니다.\n"
                      }
                      else if(i === 3){
                        
                      }
                    }
                  }
                }
                
                if(leftArm){
                  if((parseInt(data.split('&,')[i].split(',')[j*2]) === 2) || (parseInt(data.split('&,')[i].split(',')[j*2]) === 4)){
                    if(parseInt(data.split('&,')[i].split(',')[j*2]) === 2){
                      leftArm = false;
                    }
                    if(parseInt(data.split('&,')[i].split(',')[j*2+1]) < 0){
                      if(i === 0){
                        comments0 = comments0 + "왼쪽 팔을 더 올려주세요.\n"
                      }
                      else if(i === 1){
                        
                      }
                      else if(i === 2){
                        
                      }
                      else if(i === 3){
                        comments3 = comments3 + "왼쪽 팔을 귓쪽에 붙여주세요.\n"
                      }
                    }
                    else{
                      if(i === 0){
                        comments0 = comments0 + "왼쪽 팔을 더 내려주세요.\n"
                      }
                      else if(i === 1){
                        
                      }
                      else if(i === 2){
                        
                      }
                      else if(i === 3){
                        comments3 = comments3 + "왼쪽 팔이 너무 귀에 붙어있는 듯 합니다.\n"
                      }
                    }
                  }
                }
                
                if(rightLeg){
                  if((parseInt(data.split('&,')[i].split(',')[j*2]) === 8) || (parseInt(data.split('&,')[i].split(',')[j*2]) === 10)){
                    if(parseInt(data.split('&,')[i].split(',')[j*2]) === 8){
                      rightLeg = false;
                    }
                    if(parseInt(data.split('&,')[i].split(',')[j*2+1]) < 0){
                      if(i === 0){
                        comments0 = comments0 + "오른쪽 다리를 더 벌려주세요.\n"
                      }
                      else if(i === 1){
                        comments1 = comments1 + "오른쪽 다리를 더 벌려주세요.\n"
                      }
                      else if(i === 2){
                        comments2 = comments2 + "오른쪽 다리를 더 벌려주세요.\n"
                      }
                      else if(i === 3){
                        comments3 = comments3 + "오른쪽 다리를 더 벌려주세요.\n"
                      }
                    }
                    else{
                      if(i === 0){
                        comments0 = comments0 + "오른쪽 다리를 더 구부려주세요.\n"
                      }
                      else if(i === 1){
                        comments1 = comments1 + "오른쪽 다리를 더 구부려주세요.\n"
                      }
                      else if(i === 2){
                        comments2 = comments2 + "오른쪽 다리를 더 구부려주세요.\n"
                      }
                      else if(i === 3){
                        comments3 = comments3 + "오른쪽 다리를 더 구부려주세요.\n"
                      }
                    }
                  }
                }
                
                if(leftLeg){
                  if((parseInt(data.split('&,')[i].split(',')[j*2]) === 9) || (parseInt(data.split('&,')[i].split(',')[j*2]) === 11)){
                    if(parseInt(data.split('&,')[i].split(',')[j*2]) === 9){
                      leftLeg = false;
                    }
                    if(parseInt(data.split('&,')[i].split(',')[j*2+1]) < 0){
                      if(i === 0){
                        comments0 = comments0 + "몸의 중심이 왼쪽으로 치우쳐진 것 같아요.\n"
                      }
                      else if(i === 1){
                        comments1 = comments1 + "몸의 중심이 왼쪽으로 치우쳐진 것 같아요.\n"
                      }
                      else if(i === 2){
                        comments2 = comments2 + "몸의 중심이 왼쪽으로 치우쳐진 것 같아요.\n"
                      }
                      else if(i === 3){
                        comments3 = comments3 + "몸의 중심이 왼쪽으로 치우쳐진 것 같아요.\n"
                      }
                    }
                    else{
                      if(i === 0){
                        comments0 = comments0 + "왼쪽 다리를 일직선으로 펴주세요.\n"
                      }
                      else if(i === 1){
                        comments1 = comments1 + "왼쪽 다리를 일직선으로 펴주세요.\n"
                      }
                      else if(i === 2){
                        comments2 = comments2 + "왼쪽 다리를 일직선으로 펴주세요.\n"
                      }
                      else if(i === 3){
                        comments3 = comments3 + "왼쪽 다리를 일직선으로 펴주세요.\n"
                      }
                    }
                  }
                }
                
              

              // comment_part.push(j);
              // comment_skeleton.push(data.split('&,')[i].split(',')[j*2]);
              // comment_value.push(data.split('&,')[i].split(',')[j*2+1]);
            }
          }
          if(comments0 === ""){
            comments0 = "자세가 완벽합니다!! 굳굳"
          }
          if(comments1 === ""){
            comments1 = "자세가 완벽합니다!! 굳굳"
          }
          if(comments2 === ""){
            comments2 = "자세가 완벽합니다!! 굳굳"
          }
          if(comments3 === ""){
            comments3 = "자세가 완벽합니다!! 굳굳"
          }
          if(checked){
            setComment0(comments0)
            setComment1(comments1)
            setComment2(comments2)
            setComment3(comments3)
            setChecked(false)
          }
          
        }
        
      })
      .catch((error) => {
        console.error(error);
      });
    


      const interval1 = setInterval(() => {
        setCurrentIndex1(currentIndex1 => (currentIndex1 + 1) % image1.length);
      }, 1000);

      const interval2 = setInterval(() => {
        setCurrentIndex2(currentIndex2 => (currentIndex2 + 1) % image2.length);
      }, 1000);

      const interval3 = setInterval(() => {
        setCurrentIndex3(currentIndex3 => (currentIndex3 + 1) % image3.length);
      }, 1000);

      const interval4 = setInterval(() => {
        setCurrentIndex4(currentIndex4 => (currentIndex4 + 1) % image4.length);
      }, 1000);
  
      return () => {
        clearInterval(interval1);
        clearInterval(interval2);
        clearInterval(interval3);
        clearInterval(interval4);
      }

  });

    if(point1 === ""){
      return (
        <div>
          <Loading />
          <div style={{visibility: "hidden"}}>{point1}{comment0}</div>
        </div>
      )
    }
    else{
      return (
        <div className={styles.total_box}>
          <MenuBaAfterLogin />
            <div className={styles.total_box_shaper}>
              <div className={styles.slider_box}>
                <div className={styles.slider_title}>
                  {name}님의 결과입니다.
                </div>
                <Slider {...settings}>
                  <div className={styles.slider1}>
                    <img src={image1[currentIndex1]} className={styles.slider_image}></img>
                    <a>
                      <br/>총 스코어 : <font style={{fontWeight: 'bold'}}>{point1}</font>점
                      <br/>총 평<br/>
                      <font style={{fontSize: '15pt'}}>{comment0}</font>
                      {/* <font style={{fontSize: '15pt'}}>오른쪽 다리와 왼쪽 다리를 좀 더 벌리면 좋을 것 같아요.</font><br/> */}
                      <br/> 수고많았어요!
                    </a>
                  </div>
                  <div className={styles.slider1}>
                    <img src={image2[currentIndex2]} className={styles.slider_image}></img>
                    <a>
                      <br/>총 스코어 : <font style={{fontWeight: 'bold'}}>{point2}</font>점
                      <br/>총 평<br/>
                      <font style={{fontSize: '15pt'}}>{comment1}</font>
                      {/* <font style={{fontSize: '15pt'}}>오른쪽 다리와 왼쪽 다리를 좀 더 벌리면 좋을 것 같아요.</font><br/> */}
                      <br/> 수고많았어요!
                    </a>
                  </div>
                  <div className={styles.slider1}>
                    <img src={image3[currentIndex3]} className={styles.slider_image}></img>
                    <a>
                      <br/>총 스코어 : <font style={{fontWeight: 'bold'}}>{point3}</font>점
                      <br/>총 평<br/>
                      <font style={{fontSize: '15pt'}}>{comment2}</font>
                      {/* <font style={{fontSize: '15pt'}}>오른쪽 다리와 왼쪽 다리를 좀 더 벌리면 좋을 것 같아요.</font><br/> */}
                      <br/> 수고많았어요!
                    </a>
                  </div>
                  <div className={styles.slider1}>
                    <img src={image4[currentIndex4]} className={styles.slider_image}></img>
                    <a>
                      <br/>총 스코어 : <font style={{fontWeight: 'bold'}}>{point4}</font>점
                      <br/>총 평<br/>
                      <font style={{fontSize: '15pt'}}>{comment3}</font>
                      {/* <font style={{fontSize: '15pt'}}>오른쪽 다리와 왼쪽 다리를 좀 더 벌리면 좋을 것 같아요.</font><br/> */}
                      <br/> 수고많았어요!
                    </a>
                  </div>
                </Slider>
              </div>
            </div>
            <div className={styles.slider_title}>
              <Button className="copywriting2" variant="primary" onClick={save}>기록 저장하기</Button>
            </div>
            <br/>
          <Footer />
        </div>
      )
    }
    
  }
  export default BackUpload;


