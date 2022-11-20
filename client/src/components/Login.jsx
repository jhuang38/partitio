import InputGroup from "./InputGroup";
import { useRef, useState, useEffect } from "react";
import {motion} from 'framer-motion/dist/framer-motion';
import { buttonVariant } from "../utils/animation_variants";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser, updateUserState } from "../features/auth/authSlice";
import React from "react"
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";

export default function Login() {
    const navigate = useNavigate();
    let usernameRef = useRef({});
    let passwordRef = useRef({});
    let dispatch = useDispatch();
    const [authError, setAuthError] = useState(null)
    const [authStatus, setAuthStatus] = useState(null)
    const [userStatus, setUserStatus] = useState({})
    const [alertOpen, setAlertState] = useState(false)
    const [alertContent, setAlertContent] = useState('')
    useEffect(() => {
        if (authStatus === 'success') {
            setAlertContent(() => 'Login success! Redirecting...')
            dispatch(updateUserState(userStatus))
            navigate('/home')
        } else if (authStatus === 'failed') {
            setAlertContent(() => authError)
        }
        if (authStatus === 'success' || authStatus === 'failed') {
            setAlertState(true)
        }
    }, [authStatus])
    const closeAlert = () => {
        setAlertState(false)
        setAlertContent('')
        setAuthError(null)
        setAuthStatus(null)
    }
    const redirectToSignup = () => {
        navigate('/signup')
    }
    const onLoginSubmit = (e) => {
        e.preventDefault();
        console.log(usernameRef.current.value);
        console.log(passwordRef.current.value);
        const username = usernameRef.current.value
        const password = passwordRef.current.value
        const params = {
            username,
            password
        }
        dispatch(loginUser(params))
        .then(res => {
            console.log(res)
            setAuthError(() => res.payload.auth_error)
            setAuthStatus(() => res.payload.auth_status)
            setUserStatus(() => res.payload.auth_user)
            localStorage.setItem('token', res.payload.token)
            return res.payload
        })
        .catch(e => {
            console.log(e)
        })
    }
    return (
        <div className = 'landing'>
            
            <form className = 'login' onSubmit = {onLoginSubmit}>
                <h2>Login</h2>
                <InputGroup input_name='Username' input_type = 'text' input_id = 'username' input_ref = {usernameRef}/>
                <InputGroup input_name ='Password' input_type = 'password' input_id = 'password' input_ref = {passwordRef}/>
                <motion.button 
                whileHover = 'hover'
                initial = 'initial'
                whileTap = 'click'
                variants = {buttonVariant}
                className = 'formButton'
                type = 'submit'>Log in</motion.button>
                {
                    alertOpen &&
                    <Alert severity = {authStatus === 'success'? 'success' : 'error'} onClose = {closeAlert}>
                        {alertContent}
                    </Alert>
                }
                <hr></hr>
                <em>Don't have an account? Sign up <Link underline = 'always' color = 'inherit' onClick = {redirectToSignup} href='#'>here!</Link></em>
            </form>
        </div>
    );
}