import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from '../src/Pages/Home/Home.jsx'
import './i18n.jsx'
import Login from './Pages/Login/Login.jsx';
import Register from './Pages/Register/Register.jsx';
import CarId from './Pages/CarId/CarId.jsx';
function App() {
  return (
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Register/>}/>
      <Route path='/mycar/:id' element={<CarId/>}/>
    </Routes>
  );
}

export default App;
