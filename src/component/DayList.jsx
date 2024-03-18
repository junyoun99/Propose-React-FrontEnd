import React, {useState} from "react";
import styles from './Css/Login.module.scss';
import MenuBarBeforeLogin from './MenuBarBeforeLogin';
import Button from 'react-bootstrap/Button'
import Footer from './Footer';
import axios from 'axios';
import Day from './Day';

const DayList = (props) => {
    const [email, setEmail] = useState('pothong@uhs.ac.kr');
    const [pass, setPass] = useState('aaaa');
    const [id, setId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/members/new',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                pass,
                email
            })
        }).then((res)=> {if(res.ok){
            axios.post('http://localhost:8080/members/CreatePoint', {
                id: id
            }).then((res) => {
                console.log(res.data.status);
            })


            alert("회원가입 완료.");

            document.location.href = "./day";    
        }else if(!res.ok){
            alert("이미 존재하는 아이디입니다.")
        }});
    };


    return(
        <div>
            <MenuBarBeforeLogin />
                <div className={styles.login}>
                    <div className={styles.WOW} style={{height: '60%'}}>
                         <h2>Register</h2>
                         <form className="register-form" onSubmit={handleSubmit}>
                            <label htmlFor="name">Full name</label>
                            <input value={id} name="id" onChange={(e) => setId(e.target.value)} id="id" placeholder="full id" />
                            <label htmlFor="email">email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                            <label htmlFor="password">password</label>
                            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                            <Button variant="dark" type="submit" style={{marginTop: '10px'}}>Submit</Button>
                            <mybutton className="link-btn"><a href="./day">Already have account?</a></mybutton>
                        </form>
                     </div>
                </div>
            <Footer />
        </div>
    )
}
export default DayList;