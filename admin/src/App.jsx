import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'
import { Provider } from 'react-redux';

import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { store } from './Redux/store';
import Hotel from './hotels/Hotel';

function App() {
 

  return (
    <Provider store={store}>
   <BrowserRouter>
     <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Profile/>}/>
      <Route path='/hotels' element={<Hotel/>}/>

      



     </Routes>
   </BrowserRouter>
   </Provider>
    
  )
}

export default App
