import React, {useRef} from 'react';
import { Box } from '@mui/system';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { modalFormStyle, pageRenderStyles } from '../../utils/render_styles';
import ValidatedTextInput from '../ValidatedTextInput';
import { emailValidator, usernameValidator } from '../../utils/validators';
import { useSelector } from 'react-redux';

export default function Profile({}) {
    const user = useSelector(state => state.auth.user)
    let usernameRef = useRef('')
    let usernameErrorRef = useRef(true)
    let emailRef = useRef('')
    let emailErrorRef = useRef(true)

    usernameRef.current = user.username || '';
    emailRef.current = user.email || '';
    return (
        <Box sx = {pageRenderStyles}>
            
            <Card variant='outlined'>
                <CardContent sx = {{display: 'flex', flexDirection: 'column', gap: 1}}>
                <Typography variant = 'h5' sx = {{fontWeight: 'bold'}}>Account Profile</Typography>
                {/* TODO: add feature to edit / delete profile, password changing via flask email */}
                <form style = {{display: 'flex', flexDirection: 'column', padding: 4, gap: '1em'}}>
                    <ValidatedTextInput 
                    label = 'Username'
                    validator = {usernameValidator}
                    innerRef = {usernameRef}
                    errorRef = {usernameErrorRef}
                    disabled = {true}
                    />
                    <ValidatedTextInput
                    label = 'Email'
                    validator = {emailValidator}
                    innerRef = {emailRef}
                    errorRef = {emailErrorRef}
                    disabled = {true}
                    />
                    <Box sx = {{display: 'flex', gap: 1, alignSelf: 'center'}}>
                        <Button variant = 'contained' disabled = {true}>Edit Profile</Button>
                        <Button variant = 'contained' color = 'error' disabled = {true}>Delete Account</Button>
                    </Box>           
                </form>
                </CardContent>
            </Card>
            
        </Box>
    )
}