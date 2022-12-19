import React, {useState, useRef, useEffect} from 'react';
import { Box } from '@mui/system';
import { SpeedDial, SpeedDialIcon, Modal, Typography, TextField, Switch, FormControlLabel, FormGroup, Button, Fab } from '@mui/material';
import {pageRenderStyles, modalFormStyle, modalBoxStyle} from '../../utils/render_styles';
import { useDispatch, useSelector } from 'react-redux';
import { addCollection, getUserCollections, setUserCollections } from '../../features/collection/collectionSlice';
import TextMultiSelect from '../TextMultiSelect';
import ValidatedTextInput from '../ValidatedTextInput';
import GridLayout from '../GridLayout';
import Add from '@mui/icons-material/Add';
import { collectionNameValidator, collectionDescriptionValidator } from '../../utils/validators';
import CollectionEditModal from '../CollectionEditModal';


export default function Collection({}) {
    const [modalOpen, setModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editModalData, setEditModalData] = useState({
        collection_description: '',
        collection_id: '',
        collection_name: '',
        collection_visibility: false,
        maintainers: [],
        permissions: 'maintainer'
    })
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
    console.log({userCollections})
    const openModal = () => {
        setModalOpen(() => true)
    }
    const handleModalClose = () => {
        setModalOpen(() => false)
    }
    const openEditModal = () => {
        setEditModalOpen(() => true)
        console.log('setting edit modal to open')
    }
    const handleEditModalClose = () => {
        setEditModalOpen(() => false)
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
                console.log({error: e})
            })
             
        }
        
    }
    console.log({editModalOpen})
    return (
        <Box sx = {pageRenderStyles}>
            <GridLayout 
            labels = {userCollections.map((c = {}) => {
                return c.collection_name
            })}
            primaryActions = {userCollections.map((c = {}) => {
                return () => {
                    
                }
            })}
            secondaryActions = {userCollections.map((c = {}) => {
                return () => {
                    setEditModalData(() => c)
                    openEditModal()
                }
            })}
            />
            <Fab
            onClick={openModal}
            ariaLabel='add collection'
            color = 'primary'
            sx = {{
                position: 'absolute',
                bottom: '2em',
                right: '2em'
            }}
            >
                <Add/>
            </Fab>
            <CollectionEditModal open = {editModalOpen} onClose = {handleEditModalClose} collectionData = {editModalData}/>
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