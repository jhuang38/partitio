import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/Login';
import { Typography } from '@mui/material';
import Signup from './components/Signup';

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={<Navigate to ='/login'/>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/signup' element = {<Signup/>}/>
        </Routes>
      </main>
      
    </>
  );
}

export default App;
