import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';

function App() {
 

  return (
   <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/users' element={<Profile/>}/>


     </Routes>
   </BrowserRouter>
    
  )
}

export default App
