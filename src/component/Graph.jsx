import React,{useRef,PureComponent} from 'react';
import {LineChart, Line, XAxis,YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import styles from './Css/Main_front.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import AttendanceCheck from './AttendanceCheck';





   class Graph extends PureComponent{
      
      render(){
        const point_shoulder = localStorage.getItem('point_shoulder').split(',')
        const shoulder = [0, 0, 0, 0, 0, 0, 0, 0]
        for(let i = 0; i < shoulder.length; i++){
          if(typeof point_shoulder[i] == "undefined" || isNaN(point_shoulder[i])){
            continue
          }
          shoulder[i] = parseInt(point_shoulder[i])
        }

        const point_back = localStorage.getItem('point_back').split(',')
        const back = [0, 0, 0, 0, 0, 0, 0, 0]
        for(let i = 0; i < back.length; i++){
          if(typeof point_back[i] == "undefined" || isNaN(point_back[i])){
            continue
          }
          back[i] = parseInt(point_back[i])
        }

        const point_ankle = localStorage.getItem('point_ankle').split(',')
        const ankle = [0, 0, 0, 0, 0, 0, 0, 0]
        for(let i = 0; i < ankle.length; i++){
          if(typeof point_ankle[i] == "undefined" || isNaN(point_ankle[i])){
            continue
          }
          ankle[i] = parseInt(point_ankle[i])
        }
        const data = [
    
          {
            name: '0주차', 어깨: shoulder[0], 허리: back[0], 발목: ankle[0],
          },
          {
            name: '1주차', 어깨: shoulder[1], 허리: back[1], 발목: ankle[1],
          },
          {
            name: '2주차', 어깨: shoulder[2], 허리: back[2], 발목: ankle[2],
          },
          {
            name: '3주차', 어깨: shoulder[3], 허리: back[3], 발목: ankle[3],
          },
          {
            name: '4주차', 어깨: shoulder[4], 허리: back[4], 발목: ankle[4],
          },
          {
            name: '5주차', 어깨: shoulder[5], 허리: back[5], 발목: ankle[5],
          },
          {
            name: '6주차', 어깨: shoulder[6], 허리: back[6], 발목: ankle[6],
          },
          {
            name: '7주차', 어깨: shoulder[7], 허리: back[7], 발목: ankle[7],
          },
         
        ]
        console.log(ankle)
        return (
            
            <div className={styles.total_box}>
                <div className={styles.left_box}>
                  <div className={styles.left_box_line} style={{marginTop: '18%'}}>
                    <p className={styles.copywriting}>각 주차별 점수 그래프</p>
                  </div>
                    <div className={styles.left_box_graph} style={{marginTop: '10%'}}>
          <LineChart
            width={700}
            height={450}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="어깨" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="허리" stroke="#82ca9d" />
            <Line type="monotone" dataKey="발목" stroke="#db1111" />
          </LineChart>
                    </div>
                    </div>
              <div className={styles.right_box_two}>
                <div className={styles.right_box_three}>
                          <div className={styles.right_box_line} style={{marginTop: '25%'}}>
                            <p className={styles.copywriting}>출석 캘린더</p>
                          </div>
                          <div className={styles.right_box_Cal} style={{marginTop: '10%'}}>
                              <AttendanceCheck />
                          </div>
                </div>
                
              </div>
            </div>
        );
      }
}
  export default Graph;