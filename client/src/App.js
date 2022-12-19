import React, {useEffect, useState} from 'react';
import {Routes, Route, Navigate,useNavigate} from 'react-router-dom';
import Login from './components/Login';
import { Drawer, Typography } from '@mui/material';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard'
import { useDispatch, useSelector } from 'react-redux';
import { tokenLogin } from './features/auth/authSlice';
import {updateUserState} from './features/auth/authSlice'

const NavigateRender = (user, ComponentIfTrue, ComponentIfFalse) => {
  if (user) {
    return (
      <Navigate to = '/home'/>
    )
  }
  return (
    <Navigate to = '/login'/>
  )

}

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  useEffect(() => {
    if (!user) {
      dispatch(tokenLogin())
      .then(res => {
        const auth_status = res.payload.auth_status;
        if (auth_status === 'success') {
          dispatch(updateUserState(res.payload))
          navigate(window.location.pathname || '/home')
        } else {
          navigate('/login')        
        }
        return res.payload
      })
      .catch(e => {
        navigate('/login')
      })
    }
    
  }, [user])
  
  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={!!user? <Navigate to = '/home'/> : <Navigate to = '/login'/>}/>
          <Route path='/home' element = {!!user? <Dashboard render = 'home'/> : <Navigate to = '/login'/>}/>
          <Route path='/login' element = {!!user? <Navigate to = '/home'/> : <Login/>}/>
          <Route path='/signup' element = {!!user? <Navigate to = '/home'/> : <Signup/>}/>
          
          <Route path='/profile' element = {!!user? <Dashboard render = 'profile'/> : <Navigate to = '/login'/>}/>
          <Route path='/collections' element = {!!user? <Dashboard render = 'collection'/> : <Navigate to = '/login'/>}/>
          <Route path='/' element = {!!user? <Dashboard render = ''/> : <Dashboard render = '' />}/>
          
          <Route path = '*' element={!!user? <Navigate to = '/home'/> : <Navigate to = '/login'/>}/>
        </Routes>
      </main>
      
      
    </>
  );
}

export default App;
