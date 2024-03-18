import React from 'react';
import MenuBar from './MenuBar';
import MenuBarAfterLogin from './MenuBarAfterLogin'
import Main_front from './Main_front';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Graph from './Graph';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const GraphPage = () => {  
 
  const [id, setId] = useState(null);
  const [pass, setpass] = useState(null);
  const [email, setemail] = useState(null);

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setpass(localStorage.getItem("pass"));
    setemail(localStorage.getItem("email"));
  }, []);
  
 

  return (
    <div>
      <MenuBarAfterLogin />
      <Graph />
      <Footer />
    </div>
  )
    
  }
  export default GraphPage;
  