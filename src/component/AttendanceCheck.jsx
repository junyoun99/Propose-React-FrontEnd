import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Css/AttendanceCheck.scss';

function AttendanceCheck() {
  const [date, setDate] = useState(new Date());
  const [attendDate, setAttendDate] = useState(localStorage.getItem('totalDate'));

  // 이전 달로 이동하는 함수
  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  // 다음 달로 이동하는 함수
  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  // 현재 달의 첫 번째 날 구하기
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  // 현재 달의 마지막 날 구하기
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  // 현재 달의 날짜 배열 구하기
  const dates = [];
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    dates.push(new Date(date.getFullYear(), date.getMonth(), i));
  }

  // 현재 달의 첫 번째 날의 요일 구하기 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // 출석 여부 상태 관리
  const [attendance, setAttendance] = useState(new Array(7).fill(false));

  // 출석체크 함수
  const handleCheckAttendance = (dayOfWeek) => {
    const currentDate = moment();
    const targetDate = moment(dates[dayOfWeek]);
    if (currentDate.isSame(targetDate, 'day')) {
      const newAttendance = [...attendance];
      newAttendance[dayOfWeek] = true;
      setAttendance(newAttendance);
	    axios.post('http://localhost:8080/members/DateCheck', {
            id: localStorage.getItem('id'),
        }).then((res) => {
            console.log(res);
            if(res.data.totalDate === "false"){
              console.log("업데이트 실패")
            }
            else{
                console.log(res.data.totalDate)
                localStorage.setItem('totalDate', parseInt(localStorage.getItem('totalDate')) + 1)
                setAttendDate(localStorage.getItem('totalDate'))
                console.log(localStorage.getItem('totalDate'))
            }
        })
      alert('출석체크가 완료되었습니다.');
    }
  };
  const isCurrentDate = (dayOfWeek) => {
    const currentDate = moment();
    const targetDate = moment(dates[dayOfWeek]);
    return currentDate.isSame(targetDate, 'day');
  };
  
  return (
    <div className={styles.attendanceCheck}>
      <h2 style={{display:'flex' }}className="copywriting">
        {date.getFullYear()}년 {date.getMonth() + 1}월
        <div style={{display:'right', marginLeft:"100px"}}>
          총 출석일 : {localStorage.getItem('totalDate')}일
        </div>
      </h2>
      <div className="mb-3">
        <Button className="copywriting2" variant="primary" onClick={handlePrevMonth}>이전 달</Button>{' '}
        <Button className="copywriting2" variant="primary" onClick={handleNextMonth}>다음 달</Button>
      </div>
      <table style={{wordBreak: 'break-all', tableLayout: 'fixed', padding: '0px', borderSpacing: '0px', textAlign: 'center', alignContent: 'center', justifyContent: 'center', padding: '0', width: '100%' ,height: '400px'}} className="table table-bordered">
        <thead>
          <tr style={{padding: '0px', borderSpacing: '0px'}} className="copywriting2">
            <th style={{borderSpacing: '0px'}} className="text-danger">일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th className="text-primary">토</th>
          </tr>
        </thead>
        <tbody style={{tableLayout: 'fixed', padding: '0px', borderSpacing: '0px'}}>
          {[...Array(Math.ceil((lastDayOfMonth.getDate() + firstDayOfWeek) / 7))].map((row, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(7)].map((cell, cellIndex) => {
                const day = rowIndex * 7 + cellIndex - firstDayOfWeek + 1;
                return (
                  <td style={{padding: '0px', margin: '0px', borderSpacing: '0px'}} className={`copywriting2 ${cellIndex === 0 ? 'text-danger' : ''}`} key={cellIndex}>
                    {day > 0 && day <= lastDayOfMonth.getDate() ? (
                      <>
                        <div style={{padding: '0px', margin: '0px'}} className={cellIndex === 6 ? 'text-primary' : ''}>{day}</div>
                        <div style={{position: 'relative'}}>
                        {isCurrentDate(day - 1) && <Button className='position-absolute bottom-10 start-50 translate-middle-x m-0 p-1' onClick={() => handleCheckAttendance(day - 1)}>출석</Button>}
                        </div>
                      </>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  }

export default AttendanceCheck;