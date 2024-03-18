import {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import styles from './Css/Loading.module.scss'
import { gsap } from "gsap";



const Loading = () => {
    const moving = useRef();

    useEffect(() => {
        const tl = gsap.timeline({ repeat: 0, yoyo: false });
        tl.to(moving.current, {
          x: "+=685",
          duration: 50,
        });
    }, []);

    return(
        <div className={styles.total_box}>
            <div className={styles.loading_box1}>
                <img src='images/1.png'></img>
                <div className={styles.loading_box2}>
                    <img src='images/2.png' ref={moving}></img>
                </div>
                <div className={styles.loading_box3}>
                    <img src='images/3.png'></img>
                </div>
                <div className={styles.loading_box_bottom}>
                    <a style={{fontSize: '20pt', fontFamily: 'Cafe24Ssurround'}}> 열심히 분석 중이니 잠시만 기다려주세요...</a>
                    <img style={{width: '50%'}} src='images/spinner.gif'></img>
                </div>
            </div>
        </div>
    )
}

export default Loading