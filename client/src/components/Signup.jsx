import InputGroup from "./InputGroup";
import React, { useEffect, useRef, useState } from "react";
import { Link, Box, Card, CardContent, Typography, Divider, FormGroup, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pageRenderStyles } from "../utils/render_styles";
import {createNewUser} from "../features/auth/authSlice";
import ValidatedTextInput from "./ValidatedTextInput";
import { emailValidator, passwordValidator, usernameValidator } from "../utils/validators";
import { triggerAlert } from "../features/alert/alertSlice";

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let emailRef = useRef('');
    let emailErrorRef = useRef(true);
    let usernameRef = useRef('');
    let usernameErrorRef = useRef(false);
    let passwordRef = useRef('');
    let passwordErrorRef = useRef(false);
    
    const redirectToLogin = () => {
        navigate('/login');
    }
    const onLoginSubmit = (e) => {
        e.preventDefault();
        if (emailErrorRef.current || usernameErrorRef.current || passwordErrorRef.current) {
            return;
        }
        const body = {
            email: emailRef.current,
            username: usernameRef.current,
            password: passwordRef.current
        }
        dispatch(createNewUser(body))
            .then(res => {
                const registerStatus = res.payload.status;
                const registerError = res.payload.error
                if (registerStatus === 'success') {
                    dispatch(triggerAlert({message: 'Succesfully registered!', type: 'success'}))
                } else {
                    dispatch(triggerAlert({message: `Registration failed - ${registerError}`, type: 'error'}))
                }
                return res.payload
            })
            .catch(e => {
                console.error(e)
            })
    }
    return (
        <Box sx = {{...pageRenderStyles, justifyContent: 'center', width: 'calc(max(300px, 30vw))', alignSelf: 'center'}}>
            <Card>
                <CardContent sx = {{...pageRenderStyles, gap: 2}}>
                    <Typography variant = 'h5' fontWeight='bold'>Sign Up</Typography>
                    <form onSubmit = {onLoginSubmit}>
                        <FormGroup sx = {{gap: 2}}>
                            <ValidatedTextInput
                            label = 'Username'
                            validator = {usernameValidator}
                            innerRef = {usernameRef}
                            errorRef = {usernameErrorRef}
                            required = {true}
                            />
                            <ValidatedTextInput
                            label = 'Email'
                            validator = {emailValidator}
                            innerRef = {emailRef}
                            errorRef = {emailErrorRef}
                            required = {true}
                            />
                            <ValidatedTextInput
                            label = 'Password'
                            validator = {passwordValidator}
                            innerRef = {passwordRef}
                            errorRef = {passwordErrorRef}
                            required = {true}
                            type = 'password'
                            />
                            <Button variant = 'contained' type = 'submit'>Sign Up</Button>
                        </FormGroup>
                    </form>
                    <Divider/>
                    <Typography variant = 'body2' sx = {{alignSelf: 'center'}}>Already have an account? Log in 
                        <Link underline = 'always' color = 'inherit' onClick = {redirectToLogin} href = '#'> here!</Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}