import React from 'react';
import MenuBarAfterLogin from './MenuBarAfterLogin';
import Footer from './Footer';
import { useEffect, useState, Component, PureComponent } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Styles from './Css/Exercise.module.scss';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { Button } from 'react-bootstrap';
import { BsBoxArrowUpRight } from 'react-icons/bs';


const data1 = [
  { name: 'Group A', value: 1 },
  { name: 'Group B', value: 5 },
];

const COLORS = ['rgb(202,56,100)', 'rgb(51,110,217)'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
// 이상 슬라이드1 라벨 속성



const data2 = [
  { name: 'Group A', value: 1 },
  { name: 'Group B', value: 2 },
];
// 이상 슬라이드2 라벨 속성



const ExercisePage = () => {  
  // const [todoList, setTodoList] = useState(null);
  const [id, setId] = useState(null);
  const [pass, setpass] = useState(null);
  const [email, setemail] = useState(null);

  // const fetchData = async () => {
  //   const response = await axios.get('http://localhost:8080');
  //   setTodoList(response.data);
  // };
  useEffect(() => {
    // fetchData();
    setId(localStorage.getItem("id"));
    setpass(localStorage.getItem("pass"));
    setemail(localStorage.getItem("email"));
  }, []);

  const gogo = () => {
    document.location.href = "./sort"; 
  }
  
  // if(!todoList){
  //   return <div>loading...</div>
  // }

  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0
  };

  return (
    <div className={Styles.total_box}>
      <MenuBarAfterLogin />
      <div className={Styles.height_shape_box}>
        <div className={Styles.progress_box}>
          안녕하세요, {localStorage.getItem('id')}님! 오늘도 힘내볼까요?
        </div>
        <div className={Styles.slider_box}>
          <Slider {...settings}>
            <div className={Styles.slider_1}>
              <div className={Styles.slider_1_left}>
                <div className={Styles.title}>
                  요가
                </div>
                <div className={Styles.middle}>
                  몸을 올바르게 정렬하는 법을 배웁니다.<br/>
                  아픈 곳을 부드럽게 풀어내고, 나아가 해당 부위의 기초 근력을 늘려 부상의 위험을 줄입니다.
                </div>
                <div className={Styles.graph}>
                  <div className={Styles.graph_1}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart width='10%' height='10%'>
                        <Pie
                          data={data1}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {data1.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    남은 진도 : 1/6
                  </div>
                  <div className={Styles.graph_2}>
                    <font style={{fontWeight: 'bold', fontSize: '20pt'}}>1주차</font>
                    <br/><br/>
                    허리는 우리 몸을 지탱하는 가장 중요한 요소 중 하나입니다. 무리하지 않는 선에서 코어근육을 강화시키는 방법을 배우고, 허리의 힘을 올바르게 사용하는 방법을 알아봅시다.
                  </div>
                </div>
                <Button variant="secondary" className={Styles.button} onClick={gogo}>강의실 바로가기 <BsBoxArrowUpRight></BsBoxArrowUpRight></Button>{' '}
              </div>
              <div className={Styles.slider_1_right}>
                <img className={Styles.slider_1_character} src='images/slider1.png'/>
              </div>
            </div>






            <div className={Styles.slider_2}>
              <div className={Styles.slider_2_left}>
                <div className={Styles.title}>
                  태권도
                </div>
                <div className={Styles.middle}>
                  태권도 품새 자동 재점 시스템입니다.<br/>
                  공격과 방어의 기본기를 엮어 태권도의 정수를 배웁니다.
                </div>
                <div className={Styles.graph}>
                  <div className={Styles.graph_1}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart width='10%' height='10%'>
                        <Pie
                          data={data2}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {data2.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    남은 진도 : 1/3
                  </div>
                  <div className={Styles.graph_2}>
                    <font style={{fontWeight: 'bold', fontSize: '20pt'}}>1주차</font>
                    <br/><br/>
                    태권도의 생활체육화를 위해 유망한 태권도인들이 모여 정리한 어린 수련생을 위한 태극품새에 대해 배워봅니다.
                  </div>
                </div>
                <Button variant="secondary" className={Styles.button}>강의실 바로가기 <BsBoxArrowUpRight></BsBoxArrowUpRight></Button>{' '}
              </div>
              <div className={Styles.slider_1_right}>
                <img className={Styles.slider_1_character} src='images/slider2.png'/>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ExercisePage;
  


// return (
//   <div className={Styles.total_box}>
//     <MenuBar />
//     <div className={Styles.first_box}>
//       <Slider {...settings}/>
//         <button onClick={()=>{document.location.href = './yoga'}} style={{width: '100px'}}>요가</button>
//         <button style={{width: '100px'}}>태권도</button>
//         <button style={{width: '100px'}}>???</button>
//     </div>
//     <Footer/>
//   </div>
// );