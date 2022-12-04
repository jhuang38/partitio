import React, {useState, useRef, useEffect} from 'react';
import { Box } from '@mui/system';
import { SpeedDial, SpeedDialIcon, Modal, Typography, TextField, Switch, FormControlLabel, FormGroup, Button } from '@mui/material';
import {pageRenderStyles, modalFormStyle, modalBoxStyle} from '../../utils/render_styles';
import { useDispatch, useSelector } from 'react-redux';
import { addCollection, getUserCollections, setUserCollections } from '../../features/collection/collectionSlice';
import TextMultiSelect from '../TextMultiSelect';
import ValidatedTextInput from '../ValidatedTextInput';
import GridLayout from '../GridLayout';

const collectionNameValidator = (input = '') => {
    console.log({input})
    if (input.length <= 0) return {error: true, message: 'Collection name cannot be empty.'}

    if (input.length > 50) return {error: true, message: 'Collection name must be under 50 characters long.'}
    
    return {error: false, message: ''}
}

const collectionDescriptionValidator = (input = '') => {
    if (input.length > 500) return {error: true, message: 'Collection description must be under 500 characters long.'}

    return {error: false, message: ''}
}

export default function Collection({}) {
    const [modalOpen, setModalOpen] = useState(false)
    const collectionNameRef = useRef('')
    const collectionNameErrorRef = useRef(true)
    const collectionDescriptionRef = useRef('')
    const collectionDescriptionErrorRef = useRef(true)
    const collectionVisibilityRef = useRef(false)
    const collectionMaintainersRef = useRef([])
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.auth.user)
    const userCollections = useSelector(state => state.collection.userCollections)
    useEffect(() => {
        if (currentUser && currentUser.username) {
            dispatch(getUserCollections(currentUser.username))
            .then(data => {
                console.log({data})
                dispatch(setUserCollections(data.payload))
            })
        }
        
    }, [])
    const openModal = () => {
        setModalOpen(() => true)
    }
    const handleModalClose = () => {
        setModalOpen(() => false)
    }
    const handleCollectionVisibilityToggle = (e) => {
        collectionVisibilityRef.current = e.target.checked
    }
    const handleCollectionSubmit = (e) => {
        e.preventDefault()
        if (!collectionNameErrorRef.current && !collectionDescriptionErrorRef.current) {
            const payload = {
                collectionName: collectionNameRef.current,
                collectionDescription: collectionDescriptionRef.current,
                collectionVisibility: collectionVisibilityRef.current,
                collectionMaintainers: collectionMaintainersRef.current,
                collectionCreator: currentUser
            }
            dispatch(addCollection(payload))
            .then(res => {
                console.log({res})
                handleModalClose()
            })
            .catch(e => {

            })
             
        }
        console.log(collectionNameRef.current)
        console.log(collectionDescriptionRef.current)
        console.log(collectionVisibilityRef.current)
        console.log(collectionMaintainersRef.current)    
        
    }
    return (
        <Box sx = {pageRenderStyles}>
            <GridLayout labels = {userCollections.map((c = {}) => {
                return c.collection_name
            })}/>
            
            <SpeedDial
            onClick={openModal}
            ariaLabel='add collection'
            sx = {{
                position: 'absolute',
                bottom: '2em',
                right: '2em'
            }}
            icon = {<SpeedDialIcon/>}
            >

            </SpeedDial>
            <Modal
            open = {modalOpen}
            onClose = {handleModalClose}
            >
                <Box sx = {modalBoxStyle}>
                    <Typography variant = 'h5' sx = {{fontWeight: 'bold'}}>Create Collection</Typography>
                    <Typography variant = 'string'>
                        Create a collection!
                    </Typography>
                    <form onSubmit = {handleCollectionSubmit} style = {modalFormStyle}>
                        <FormGroup sx = {modalFormStyle}>
                        {/* <TextField inputRef ={ collectionNameRef} label = 'Collection Name'></TextField> */}
                        <ValidatedTextInput 
                        label = 'Collection Name' 
                        innerRef = {collectionNameRef} 
                        errorRef = {collectionNameErrorRef}
                        validator = {collectionNameValidator}
                        required = {true}
                        >
                        </ValidatedTextInput>
                        <ValidatedTextInput
                        label= 'Description'
                        innerRef= {collectionDescriptionRef}
                        errorRef = {collectionDescriptionErrorRef}
                        validator = {collectionDescriptionValidator}
                        required = {false}
                        multiline = {true}
                        >

                        </ValidatedTextInput>
                        <FormControlLabel control = {<Switch onChange = {(handleCollectionVisibilityToggle)} label = 'Public'/>} label = 'Public'/>
                        <TextMultiSelect
                        placeholder = 'Add maintainers...'
                        innerRef={collectionMaintainersRef}
                        />
                        <Button type = 'submit' variant = 'contained'>Submit</Button>
                        
                        </FormGroup>
                        
                        
                    </form>
                </Box>
            </Modal>
        </Box>
    )
}