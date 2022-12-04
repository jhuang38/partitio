import React, {useState, useEffect} from 'react'
import { TextField } from '@mui/material'

export default function ValidatedTextInput({label = '', validator, innerRef, errorRef, required = false, ...rest}) {
    const [text, setText] = useState('')
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const handleChange = (e) => {
        setText(() => e.target.value)
    }
    useEffect(() => {
        // validator: (str) => {error: bool, message: string (error message, if any)}
        const inputStatus = validator(text) || {}
        if (inputStatus.error) {
            setError(() => true)
            setErrorMsg(() => inputStatus.message)
        } else {
            setError(() => false)
            setErrorMsg(() => '')
        }
        innerRef.current = text
    }, [text])
    useEffect(() => {
        errorRef.current = error
    }, [error])
    return (
        <TextField
        label = {label}
        error = {error}
        onChange = {handleChange}
        required = {required}
        helperText = {errorMsg}
        {...rest}
        >{text}</TextField>
    )
}