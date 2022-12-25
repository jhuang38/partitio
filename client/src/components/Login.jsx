import { useRef, useState, useEffect } from "react";
import { Button, CardContent, Divider, FormGroup, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser, updateUserState } from "../features/auth/authSlice";
import React from "react"
import { useDispatch } from "react-redux";
import { modalFormStyle, pageRenderStyles } from "../utils/render_styles";
import {Box, Card} from "@mui/material";
import ValidatedTextInput from "./ValidatedTextInput";
import { usernameValidator } from "../utils/validators";
import { triggerAlert } from "../features/alert/alertSlice";

export default function Login() {
    const navigate = useNavigate();
    let usernameRef = useRef('');
    let usernameErrorRef = useRef(false);
    let passwordRef = useRef('');
    let passwordErrorRef = useRef(false);
    let dispatch = useDispatch();

    const redirectToSignup = () => {
        navigate('/signup')
    }
    const onLoginSubmit = (e) => {
        e.preventDefault();
        if (usernameErrorRef.current || passwordErrorRef.current) {
            return;
        }
        const username = usernameRef.current
        const password = passwordRef.current
        const params = {
            username,
            password
        }
        dispatch(loginUser(params))
        .then(res => {
            const authError = res.payload.auth_error
            const authStatus = res.payload.auth_status
            const userStatus = res.payload.auth_user
            if (authStatus === 'success') {
                dispatch(updateUserState(userStatus))
                dispatch(triggerAlert({message: 'Login success! Redirecting...', type: 'success'}))
                localStorage.setItem('token', res.payload.token)
            } else {
                dispatch(triggerAlert({message: authError, type: 'error'}))
            }
            return res.payload
        })
        .catch(e => {
            console.error(e)
        })
    }
    return (
        <>
        <Box sx = {{...pageRenderStyles, justifyContent: 'center', width: 'calc(max(300px, 30vw))', alignSelf: 'center'}}>
            <Card>
                <CardContent sx = {{...pageRenderStyles, gap: 2}}>
                    <Typography variant = 'h5' fontWeight='bold'>Login</Typography>
                    <form onSubmit={onLoginSubmit}>
                        <FormGroup sx = {{gap: 2}}>
                        <ValidatedTextInput
                        label = 'Username'
                        validator = {usernameValidator}
                        innerRef = {usernameRef}
                        errorRef = {usernameErrorRef}
                        required = {true}
                        />
                        <ValidatedTextInput
                        label = 'Password'
                        innerRef = {passwordRef}
                        errorRef = {passwordErrorRef}
                        required = {true}
                        type = 'password'
                        />
                        <Button variant = 'contained' type = 'submit' sx = {{width: '100%'}}>Log in</Button>
                        </FormGroup>
                        
                    </form>
                    
                    <Divider/>
                    <Typography variant = 'body2' sx = {{alignSelf: 'center'}}>Don't have an account? Sign up <Link underline = 'always' color = 'inherit' onClick = {redirectToSignup} href='#'>here!</Link>
                    </Typography>

                </CardContent>
            </Card>
        </Box>
        </>
        
    );
}