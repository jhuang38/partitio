import InputGroup from "./InputGroup";
import { useEffect, useRef, useState } from "react";
import {motion} from 'framer-motion/dist/framer-motion';
import { buttonVariant } from "../utils/animation_variants";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {createNewUser} from "../features/auth/authSlice";
import Alert from "@mui/material/Alert";
import React from "react"

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let emailRef = useRef({});
    let usernameRef = useRef({});
    let passwordRef = useRef({});
    const [registerState, setRegisterState] = useState(null)
    const [registerError, setRegisterError] = useState('')
    const [alertOpen, setAlertState] = useState(false)
    const [alertContent, setAlertContent] = useState('')

    useEffect(() => {
        if (registerState) {

        }
        if (registerState === 'success' || registerState === 'failure') {
            setAlertContent(registerState === 'success'? 'Succesfully registered!' : `Registration failed - ${registerError}`)
            setAlertState(state => true)
        }
    }, [registerState])
    const closeAlert = () => {
        setAlertState(false)
        setRegisterState(null)
        setRegisterError('')
        setAlertContent('')
    }
    
    const redirectToLogin = () => {
        navigate('/login');
    }
    const onLoginSubmit = (e) => {
        e.preventDefault();
        const body = {
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }
        dispatch(createNewUser(body))
            .then(res => {
                console.log(res)
                setRegisterState(res.payload.status)
                setRegisterError(res.payload.error)
                return res.payload
            })
            .catch(e => {
                console.log(e)
            })
    }
    return (
        <div className = 'landing'>
            
            <form className = 'login' onSubmit = {onLoginSubmit}>
                <h2>Sign Up</h2>
                <InputGroup input_name='Username' input_type ='text' input_id = 'username' input_ref = {usernameRef}/>
                <InputGroup input_name='Email' input_type = 'text' input_id = 'email' input_ref = {emailRef}/>
                <InputGroup input_name ='Password' input_type = 'password' input_id = 'password' input_ref = {passwordRef}/>
                <motion.button
                className = 'formButton' 
                whileHover = 'hover'
                initial = 'initial'
                whileTap = 'click'
                variants = {buttonVariant}
                type = 'submit'>Sign Up</motion.button>
                {
                    alertOpen && 
                    <Alert severity = {registerState === 'success'? 'success' : 'error'}
                    onClose = {
                        closeAlert
                    }
                    >
                        {alertContent}
                    </Alert>
                }
                <hr></hr>
                <em>Already have an account? Log in <Link underline = 'always' color = 'inherit' onClick = {redirectToLogin} href = '#'>here!</Link></em>
            </form>
        </div>
    );
}