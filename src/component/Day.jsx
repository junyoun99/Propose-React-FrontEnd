import React , {useState} from "react";
import styles from './Css/Login.module.scss';
import MenuBarBeforeLogin from './MenuBarBeforeLogin';
import Button from 'react-bootstrap/Button'
import Footer from './Footer';
import axios from 'axios';


const Day =(props) => {
    const [id, setId] = useState('');
    const [pass, setPass] = useState('');
    const [user, setUser] = useState(null);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/members/Login', {
            id: id,
            pass: pass
        }).then((res) => {
            console.log(res);
            if(res.data.id === "false"){
                alert("아이디와 비밀번호를 확인해주세요.");
                setId('');
                setPass('');
            }
            else{
                localStorage.setItem('id', res.data.id)
                localStorage.setItem('pass', res.data.pass)
                localStorage.setItem('email', res.data.email)
                localStorage.setItem('totalDate', res.data.totalDate)
                
                axios.post('http://localhost:8080/members/CheckPoint', {
                    name: id
                }).then((res) => {
                    console.log(res);
                    
                    if(res.data.point_shoulder === ""){
                        localStorage.setItem('point_shoulder', '0')
                        console.log(localStorage.getItem('point_shoulder'))
                    }
                    if(res.data.point_shoulder !== ""){
                        localStorage.setItem('point_shoulder', res.data.point_shoulder)
                        console.log(localStorage.getItem('point_shoulder'))
                    }
                    if(res.data.point_back === ""){
                        localStorage.setItem('point_back', '0')
                        console.log(localStorage.getItem('point_back'))
                    }
                    if(res.data.point_back !== ""){
                        localStorage.setItem('point_back', res.data.point_back)
                        console.log(localStorage.getItem('point_back'))
                    }
                    if(res.data.point_ankle === ""){
                        localStorage.setItem('point_ankle', '0')
                        console.log(localStorage.getItem('point_ankle'))
                    }
                    if(res.data.point_ankle !== ""){
                        localStorage.setItem('point_ankle', res.data.point_ankle)
                        console.log(localStorage.getItem('point_ankle'))
                    }
                    
                    alert("로그인 성공!");
                    document.location.href = "./main";
                    
                })
            }
        })

        
    };


    return(
        <div>
            <MenuBarBeforeLogin />
                <div className={styles.login}>
                    <div className={styles.WOW}>
                         <h2>Login</h2>
                         <form className="login-form" onSubmit={handleSubmit}>
                             <label htmlFor="id">ID</label>
                             <input value={id} onChange={(e) => setId(e.target.value)}type="id" placeholder="이메일을 입력해주세요." id="id" name="id" />
                             <label htmlFor="password">password</label>
                             <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                             <Button variant="dark" type="submit" style={{marginTop: '10px'}}>Login</Button>
                             <mybutton className="link-btn"><a href="./daylist">Don't have account?</a></mybutton>
                         </form>
                     </div>
                </div>
            <Footer />
        </div>
    )
}
export default Day;