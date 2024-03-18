import {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './Css/sort.module.scss'
import MenuBaAfterLogin from './MenuBarAfterLogin';
import Footer from './Footer';

const Sort = () => {  

    const goShoulder = () => {
        document.location.href = './shoulder'
    }

    const goAnkle = () => {
        document.location.href = './ankle'
    }

    const goBack = () => {
      document.location.href = './back'
    }

    return (
      <div className={styles.total_box}>
        <MenuBaAfterLogin />
          <div className={styles.total_box_shaper}>
            <div className={`${styles.box_1} ${styles.hvrgrowrotate}`} onClick={goShoulder}>
              <div className={styles.box_1_title}>
                어깨
              </div>
            </div>
            <div className={`${styles.box_2} ${styles.hvrgrowrotate}`} onClick={goBack}>
              <div className={styles.box_2_title}>
                허리
              </div>
            </div>
            <div className={`${styles.box_3} ${styles.hvrgrowrotate}`} onClick={goAnkle}>
              <div className={styles.box_3_title}>
                발목
              </div>
            </div>
          </div>
        <Footer/>
      </div>
    );
  }
  export default Sort;



{/* <div>
        <h1>재활할 부위를 골라주세요</h1>
        <button onClick={goShoulder}>어깨</button>
        <button onClick={goAnkle}>발목</button>
        <button>허리</button>
        
</div> */}