import InputGroup from "./InputGroup";
import { useRef } from "react";
import {motion} from 'framer-motion';
import { buttonVariant } from "../utils/animation_variants";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {createNewUser} from "../features/auth/authSlice";

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let emailRef = useRef({});
    let usernameRef = useRef({});
    let passwordRef = useRef({});
    
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
        console.log(body);
        dispatch(createNewUser(body))
        console.log('submitted')
    }
    return (
        <div className = 'landing'>
            
            <form className = 'login' onSubmit = {onLoginSubmit}>
                <h2>Sign Up</h2>
                <InputGroup input_name='Username' input_type ='text' input_id = 'username' input_ref = {usernameRef}/>
                <InputGroup input_name='Email' input_type = 'text' input_id = 'email' input_ref = {emailRef}/>
                <InputGroup input_name ='Password' input_type = 'password' input_id = 'password' input_ref = {passwordRef}/>
                <motion.button 
                whileHover = 'hover'
                initial = 'initial'
                whileTap = 'click'
                variants = {buttonVariant}
                type = 'submit'>Sign Up</motion.button>
                <hr></hr>
                <em>Already have an account? Log in <Link underline = 'always' color = 'inherit' onClick = {redirectToLogin} href = '#'>here!</Link></em>
            </form>
        </div>
    );
}