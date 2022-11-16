import React, {useEffect, useState} from 'react';
import {Routes, Route, Navigate,useNavigate} from 'react-router-dom';
import Login from './components/Login';
import { Drawer, Typography } from '@mui/material';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard'
import { useDispatch, useSelector } from 'react-redux';
import { tokenLogin } from './features/auth/authSlice';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  useEffect(() => {
    if (!user) {
      dispatch(tokenLogin())
      .then(res => {
        console.log(res)
        const auth_status = res.payload.auth_status;
        if (auth_status === 'success') {
          navigate('/home')
        } else {
          navigate('/login')        
        }
        return res.payload
      })
      .catch(e => {
        navigate('/login')
      })
    }
    
  }, [])
  
  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={<Navigate to ='/login'/>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/signup' element = {<Signup/>}/>
          <Route path='/home' element = {<Dashboard/>}/>
        </Routes>
      </main>
      
      
    </>
  );
}

export default App;
