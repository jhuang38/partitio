import React, { useEffect, useRef, useState} from "react";
import { modalBoxStyle, modalFormStyle } from "../utils/render_styles";
import { collectionNameValidator, collectionDescriptionValidator } from '../utils/validators'
import { Box } from '@mui/system';
import {  Modal, Typography, Switch, FormControlLabel, FormGroup, Button, Fab } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { editCollection, deleteCollection } from "../features/collection/collectionSlice";
import TextMultiSelect from "./TextMultiSelect";
import ValidatedTextInput from "./ValidatedTextInput";

export default function CollectionEditModal ({open, onClose, collectionData = {
    collection_description: '',
    collection_id: '',
    collection_name: '',
    is_public: false,
    maintainers: [],
    permission: 'maintainer'
    }}) {
    const descriptionRef = useRef({})
    const nameRef = useRef({})
    const visibilityRef = useRef({})
    const maintainersRef = useRef({})
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.auth.user)

    console.log(collectionData.collection_visibility)
    descriptionRef.current = collectionData.collection_description
    nameRef.current = collectionData.collection_name
    visibilityRef.current = collectionData.is_public
    maintainersRef.current = collectionData.maintainers

    const descriptionErrorRef = useRef(true)
    const nameErrorRef = useRef(true)

    const disabled = collectionData.permission !== 'owner'
    const handleVisibilityToggle = (e) => {
        console.log(e.target)
        visibilityRef.current = e.target.checked
    }
    const handleEditSubmit = (e) => {
        e.preventDefault()
        if (!nameErrorRef.current && !descriptionErrorRef.current && currentUser && currentUser.username) {
            console.log('success')
            dispatch(editCollection({
                collection_description: descriptionRef.current,
                collection_id: collectionData.collection_id,
                collection_name: nameRef.current,
                collection_visibility: visibilityRef.current,
                maintainers: maintainersRef.current,
                username: currentUser.username
            }))
            .then(res => {
                console.log({res})
                onClose()
            })
        }
    }
    const handleCollectionDelete = () => {
        dispatch(deleteCollection({
            collection_id: collectionData.collection_id,
            username: currentUser.username
        }))
        .then(res => {
            console.log({res})
            onClose()
        })
    }
    return (
        <Modal
        open = {open}
        onClose = {onClose}
        key = {collectionData.collection_id}
        >
            <Box sx = {modalBoxStyle}>
                    <Typography variant = 'h5' sx = {{fontWeight: 'bold'}}>Collection Settings</Typography>
                    <Typography variant = 'string'>
                        Change and view collection settings.
                    </Typography>
                    <form onSubmit = {handleEditSubmit} style = {modalFormStyle}>
                        <FormGroup sx = {modalFormStyle}>
                        <ValidatedTextInput 
                        label = 'Collection Name' 
                        innerRef = {nameRef} 
                        errorRef = {nameErrorRef}
                        validator = {collectionNameValidator}
                        required = {true}
                        disabled = {disabled}
                        >
                        </ValidatedTextInput>
                        <ValidatedTextInput
                        label= 'Description'
                        innerRef= {descriptionRef}
                        errorRef = {descriptionErrorRef}
                        validator = {collectionDescriptionValidator}
                        required = {false}
                        multiline = {true}
                        disabled = {disabled}
                        >

                        </ValidatedTextInput>
                        <FormControlLabel control = {<Switch onChange = {handleVisibilityToggle} label = 'Public' disabled = {disabled} checked = {visibilityRef.current}/>} label = 'Public'/>
                        <TextMultiSelect
                        placeholder = 'Edit maintainers...'
                        innerRef={maintainersRef}
                        isDisabled = {disabled}
                        prevOptions = {maintainersRef.current.map(o => ({label: o, value: o}))}
                        optionValidator = {(input) => {
                                return currentUser && input !== currentUser.username
                            }}
                        />
                        <Button type = 'submit' variant = 'contained' disabled = {disabled}>Edit</Button>
                        <Button color = 'error' variant = 'contained' disabled = {disabled} onClick = {handleCollectionDelete}>Delete Collection</Button>
                        
                        </FormGroup>
                        
                        
                    </form>
                </Box>
        </Modal>
    )
}