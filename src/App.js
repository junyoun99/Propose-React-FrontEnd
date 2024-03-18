import './App.css';
import Day from './component/Day';
import DayList from './component/DayList';
import ShoulderUpload from './component/shoulderUpload';
import Main from './component/Main';
import ExercisePage from './component/exercisePage'
import Ankle from './component/ankle'
import Sort from './component/sort'
import Shoulder from './component/shoulder';
import AnkleUpload from './component/ankleUpload';
import GraphPage from './component/GraphPage';
import Loading from './component/Loading';
import Back from './component/back'
import BackUpload from './component/backUpload'
import { BrowserRouter, Routes , Route } from "react-router-dom";

function App(props) {
  

  return (
    
    <BrowserRouter>
    <Routes>
        <Route path ='/main' element={<Main />}/>
        <Route path ='/day' element={<Day />}/>
        <Route path ='/shoulderUpload' element={<ShoulderUpload />}/>
        <Route path ='/daylist' element={<DayList />}/>
        <Route path ='/exercisePage' element={<ExercisePage />}/>
        <Route path ='/ankle' element={<Ankle />}/>
        <Route path ='/sort' element={<Sort />}/>
        <Route path ='/shoulder' element={<Shoulder />}/>
        <Route path ='/ankleUpload' element={<AnkleUpload />}/>
        <Route path ='/GraphPage' element={<GraphPage />}/>
        <Route path ='/Loading' element={<Loading />}/>
        <Route path ='/back' element={<Back />}/>
        <Route path ='/backUpload' element={<BackUpload />}/>
    </Routes>
  </BrowserRouter>   
    
    
  )

}

export default App;
