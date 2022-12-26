import React, {useEffect, useState} from 'react';
import {Routes, Route, Navigate,useNavigate, useParams} from 'react-router-dom';
import Login from './components/Login';
import { Snackbar, Alert } from '@mui/material';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard'
import { useDispatch, useSelector } from 'react-redux';
import { tokenLogin } from './features/auth/authSlice';
import {updateUserState} from './features/auth/authSlice'
import { clearAlert } from './features/alert/alertSlice';

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
          navigate(window.location.pathname || '/collections')
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

  const alertState = useSelector(state => state.alert)
  const handleAlertClose = () => {
    dispatch(clearAlert())
}
  
  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={!!user? <Navigate to = '/collections'/> : <Navigate to = '/login'/>}/>
          <Route path='/login' element = {!!user? <Navigate to = '/collections'/> : <Login/>}/>
          <Route path='/signup' element = {!!user? <Navigate to = '/collecctions'/> : <Signup/>}/>
          
          <Route path='/profile' element = {!!user? <Dashboard render = 'profile'/> : <Navigate to = '/login'/>}/>
          <Route path='/collections' element = {!!user? <Dashboard render = 'collections'/> : <Navigate to = '/login'/>}/>
          <Route path='/shared' element = {!!user? <Dashboard render = 'shared'/> : <Navigate to = '/login'/>}/>
          <Route path='/project'>
            <Route path = ':cid' element = {<Dashboard render = 'project'/>}/>
          </Route>
          
          <Route path = '*' element={!!user? <Navigate to = '/collections'/> : <Navigate to = '/login'/>}/>
        </Routes>
        
      </main>
      <Snackbar
        open = {alertState.isOpen}
        autoHideDuration = {3000}
        onClose = {handleAlertClose}
        >
            <Alert onClose = {handleAlertClose} severity = {alertState.alertType || 'info'}>
                {alertState.alertMessage}
            </Alert>
        </Snackbar>
      
    </>
  );
}

export default App;
