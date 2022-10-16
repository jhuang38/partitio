import InputGroup from "./InputGroup";
import { useRef } from "react";
import {motion} from 'framer-motion';
import { buttonVariant } from "../utils/animation_variants";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    let emailRef = useRef({});
    let passwordRef = useRef({});
    const redirectToSignup = () => {
        navigate('/signup')
    }
    const onLoginSubmit = (e) => {
        e.preventDefault();
        console.log(emailRef.current.value);
        console.log(passwordRef.current.value);
    }
    return (
        <div className = 'landing'>
            
            <form className = 'login' onSubmit = {onLoginSubmit}>
                <h2>Login</h2>
                <InputGroup input_name='Email' input_type = 'text' input_id = 'email' input_ref = {emailRef}/>
                <InputGroup input_name ='Password' input_type = 'password' input_id = 'password' input_ref = {passwordRef}/>
                <motion.button 
                whileHover = 'hover'
                initial = 'initial'
                whileTap = 'click'
                variants = {buttonVariant}
                type = 'submit'>Log in</motion.button>
                <hr></hr>
                <em>Don't have an account? Sign up <Link underline = 'always' color = 'inherit' onClick = {redirectToSignup} href='#'>here!</Link></em>
            </form>
        </div>
    );
}