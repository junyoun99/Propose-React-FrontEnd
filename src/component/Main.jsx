import React from 'react';
import MenuBarAfterLogin from './MenuBarAfterLogin';
import MenuBarBeforeLogin from './MenuBarBeforeLogin'
import Main_front from './Main_front';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Main = () => {  
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
  
  // if(!todoList){
  //   return <div>loading...</div>
  // }

  if(id == null){
    return (
      <div>
        <MenuBarBeforeLogin />
        <Main_front />
        <Footer />
      </div>
    )
  }
  else{
    return (
      <div>
        <MenuBarAfterLogin />
        <Main_front />
        <Footer />
      </div>  
    );
  }
  
  }
  export default Main;
  