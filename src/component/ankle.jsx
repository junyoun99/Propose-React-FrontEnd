import ReactPlayer from 'react-player/lazy';
import axios from 'axios';
import MenuBaAfterLogin from './MenuBarAfterLogin';
import Footer from './Footer';
import { useRef, useState } from 'react';
import { useRecordWebcam } from "react-record-webcam";
import styles from './Css/ankle.module.scss';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



const Ankle = () => {
  const playerButton = useRef(null);
  const name = localStorage.getItem("id")
  const sort = "ankle_"
  localStorage.setItem('sort', sort)
  const [toggled, settoggled] = useState(0);
  const toggles = [
    [false, false, false],
    [true, false, false],
    [false, true, false],
    [false, false, true]
  ];
  
  const playFunction = () => {
    const player = playerButton.current.getInternalPlayer();
      
    
    setTimeout(function() {
      player.play();
      recordWebcam.start();
      clearInterval(interval);
      settoggled(toggled => 0);
    }, 4000);

    let count = 3
    var interval = setInterval(function(){
      console.log(count)
      settoggled(toggled => (toggled + 1) % toggles.length);
      count--
    }, 1000);
  }

  const playEndFunction = () => { //동영상이 끝나면 촬영도 끝남.
    setTimeout(function(){
      recordWebcam.stop();
  }, 4000);
  }

  // const checking = () => {
  //   axios.post('http://localhost:8080/members/upload', {
  //           id: localStorage.getItem('id'),
  //           videoPath: "/Users/jangjun-yeong/Downloads/" + name
  //       }).then((res) => {
  //         document.location.href = "./upload"; 
  //       })
    
  // }
  const movePage = useNavigate();
  const checking = () => {
    const videoPath = "/Users/jangjun-yeong/Downloads/yoga/"
    const data = { videoPath : videoPath, sort: sort , name : name};
    fetch('http://127.0.0.1:5000/auth/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    
    movePage('/ankleUpload');
  }

  const OPTIONS = {
    fileName: sort + name,
    mimeType: 'video/webm;codecs=h264',
    width: '700px',
    height: '500px'
  };

  const recordWebcam = useRecordWebcam(OPTIONS);
  
  return(
    <div className={styles.total_box}>
      <MenuBaAfterLogin/>
      <div className={styles.total_box_shaper}>
        <div className={styles.video_box}>
          <div className={styles.ins_video}>
            <ReactPlayer
                ref={playerButton}
                className='react-player'
                style={{position:'relative'}}
                url={'/ankle_.mp4'}    // 플레이어 url
                width='100%'         // 플레이어 크기 (가로)
                height='100%'
                //height='500px'        // 플레이어 크기 (세로)
                playing={false}        // 자동 재생 on
                muted={false}          // 자동 재생 on
                controls={true}       // 플레이어 컨트롤 노출 여부
                light={false}         // 플레이어 모드
                pip={true}            // pip 모드 설정 여부
                poster={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'}   // 플레이어 초기 포스터 사진
                onEnded={() => playEndFunction()}  // 플레이어 끝났을 때 이벤트
            />
          <div className={toggles[toggled][0] ? styles.countdown : styles.countdown_hidden}>
              <img src='images/3-1.png' className={styles.countdown_image}></img>
            </div>
            <div className={toggles[toggled][1] ? styles.countdown : styles.countdown_hidden}>
              <img src='images/2-1.png' className={styles.countdown_image}></img>
            </div>
            <div className={toggles[toggled][2] ? styles.countdown : styles.countdown_hidden}>
              <img src='images/1-1.png' className={styles.countdown_image}></img>
            </div>
          </div>
          <div className={styles.stu_video}>
            <video
            className={styles.video}
            width={'100%'}
            height={'100%'}
            ref={recordWebcam.webcamRef}
            autoPlay
            muted
            />
          </div>
        </div>
        <div className={styles.controller}>
          <div className={styles.controller_1}>
            카메라 상태 :
              <font style={{fontWeight: 'bold'}}>
              {
              (function(){
                if(recordWebcam.status == 'INIT'){
                  return (" 초기화 중입니다.")
                }else if(recordWebcam.status == 'CLOSED'){
                  return (" 카메라가 종료 상태입니다.")
                }else if(recordWebcam.status == 'OPEN'){
                  return (" 카메라가 준비되었습니다.")
                }else if(recordWebcam.status == 'RECORDING'){
                  return (" 녹화 중입니다.")
                }else if(recordWebcam.status == 'PREVIEW'){
                  return (" 미리보기입니다.")
                }else if(recordWebcam.status == 'ERROR'){
                  return (" 에러")
                }
              })()
              }      
              </font>  
          </div>
          <div className={styles.controller_2}>
          <Button variant="secondary" className={styles.buttons} onClick={recordWebcam.open}>
            촬영 준비
          </Button>
          <Button variant="secondary" className={styles.buttons} onClick={playFunction}>
            촬영 시작(촬영 + 동영상재생)
          </Button>
          <Button variant="secondary" className={styles.buttons} onClick={recordWebcam.stop}>
            촬영 끝
          </Button>
          <Button variant="secondary" className={styles.buttons} onClick={recordWebcam.download}>
            다운로드
          </Button>
          <Button variant="secondary" className={styles.buttons} onClick={checking}>
            결과보기
          </Button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>

  )

  }

export default Ankle;



// return (
//   <div>
//     <MenuBar />
//       <div className='player-wrapper'>
//           <ReactPlayer
//               ref={playerButton}
//               className='react-player'
//               url={'/yoga1.mp4'}    // 플레이어 url
//               width='800px'         // 플레이어 크기 (가로)
//               height='500px'        // 플레이어 크기 (세로)
//               playing={false}        // 자동 재생 on
//               muted={false}          // 자동 재생 on
//               controls={true}       // 플레이어 컨트롤 노출 여부
//               light={false}         // 플레이어 모드
//               pip={true}            // pip 모드 설정 여부
//               poster={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'}   // 플레이어 초기 포스터 사진
//               onEnded={() => playEndFunction()}  // 플레이어 끝났을 때 이벤트
//           />
//       </div>
//       <div>
//         <p>카메라 상태 :  
//          {
//           (function(){
//             if(recordWebcam.status == 'INIT'){
//               return (" 초기화 중입니다.")
//             }else if(recordWebcam.status == 'CLOSED'){
//               return (" 카메라가 종료 상태입니다.")
//             }else if(recordWebcam.status == 'OPEN'){
//               return (" 카메라가 준비되었습니다.")
//             }else if(recordWebcam.status == 'RECORDING'){
//               return (" 녹화 중입니다.")
//             }else if(recordWebcam.status == 'PREVIEW'){
//               return (" 미리보기입니다.")
//             }else if(recordWebcam.status == 'ERROR'){
//               return (" 에러")
//             }
//           })()
//          }
        
//         </p>
//         <div>
//           <button onClick={recordWebcam.open}>
//             촬영 준비
//           </button>
//           <button onClick={playFunction}>
//             촬영 시작(촬영 + 동영상재생)
//           </button>
//           <button onClick={recordWebcam.stop}>
//             촬영 끝
//           </button>
//           <button onClick={recordWebcam.download}>
//             다운로드
//           </button>
//           <button onClick={checking}>
//             결과보기
//           </button>
//         </div>
//         <video
//           ref={recordWebcam.webcamRef}
//           autoPlay
//           muted
//         />
//       </div>
//       <Footer />
//   </div>
// )
// }