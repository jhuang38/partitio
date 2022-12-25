import React, {useState, useRef, useEffect} from "react";
import { Typography, Fab, Modal, Box, Button, FormGroup, Card } from "@mui/material";
import Add from '@mui/icons-material/Add';
import { modalBoxStyle, modalFormStyle } from "../../utils/render_styles";
import { io } from 'socket.io-client';
import server_url from "../../utils/backend_url";
import ValidatedTextInput from "../ValidatedTextInput";
import { linkNameValidator, linkDescriptionValidator, linkURLValidator } from "../../utils/validators";
import { updateVisibleLinks } from "../../features/project/projectSlice";
import { useSelector, useDispatch } from "react-redux";
import LinkListRender from "../LinkListRender";
import { receiveAlert, triggerAlert } from "../../features/alert/alertSlice";

const socket = io(server_url.origin)

export default function ProjectEditorView({name='', description='', links=[], cid = ''}) {
    const user = useSelector(state => state.auth.user)
    const username = user? user.username: ''
    const dispatch = useDispatch();
    let linkNameRef = useRef('');
    let linkNameErrRef = useRef(false);

    let linkDescRef = useRef('');
    let linkDescErrRef = useRef(false);

    let linkUrlRef = useRef('');
    let linkUrlErrRef = useRef(false);

    useEffect(() => {
        socket.emit('join project room', {cid})
        socket.on('links updated', (linkData) => {
            dispatch(updateVisibleLinks(linkData))
            dispatch(receiveAlert({message: `Links have been updated.`, type: 'info'}))
        })
        return () => {
            socket.emit('exit', {cid})
            socket.off('links updated')
        }
    }, [])
    
    const [modalOpen, setModalOpen] = useState(false);
    const addProjectModalOpen = () => {
        setModalOpen(() => true)
    }
    const addProjectModalClose = () => {
        setModalOpen(() => false);
    }
    const addLinkSubmit = (e) => {
        e.preventDefault();
        if (!linkNameErrRef.current && !linkDescErrRef.current && !linkUrlErrRef.current) {
            socket.emit('link added', {cid, username, name: linkNameRef.current, desc: linkDescRef.current, url: linkUrlRef.current})
            addProjectModalClose()
            dispatch(triggerAlert({message: `Link ${linkNameRef.current} succesfully created.`, type: 'success'}))
        }
    }
    return (
        <>
            <Typography variant = 'h5' sx = {{fontWeight: 'bold'}}>{name}</Typography>
            <Typography>{description}</Typography>
            <Fab
            onClick = {addProjectModalOpen}
            ariaLabel='add link'
            color = 'primary'
            sx = {{
                position: 'fixed',
                bottom: '2em',
                right: '2em'
            }}
            >
                <Add/>
            </Fab>
            <LinkListRender linkData={links} editView= {true} socket = {socket} cid = {cid} username = {username}/>
            <Modal
            open = {modalOpen}
            onClose = {addProjectModalClose}
            >
               <Box sx = {modalBoxStyle}>
                    <Typography sx = {{fontWeight: 'bold'}} variant = 'h6'>Add a link</Typography>
                    <form onSubmit = {addLinkSubmit} style = {modalFormStyle}>
                        <FormGroup sx = {modalFormStyle}>
                            <ValidatedTextInput
                            label = 'Link Name' 
                            innerRef = {linkNameRef} 
                            errorRef = {linkNameErrRef}
                            validator = {linkNameValidator}
                            required = {true}
                            />
                            <ValidatedTextInput
                            label = 'Link Description'
                            innerRef = {linkDescRef}
                            errorRef = {linkDescErrRef}
                            validator = {linkDescriptionValidator}
                            multiline = {true}
                            required = {false}
                            />
                            <ValidatedTextInput
                            label = 'Link URL'
                            innerRef = {linkUrlRef}
                            errorRef = {linkUrlErrRef}
                            validator = {linkURLValidator}
                            required = {true}
                            />
                            <Button type = 'submit' variant = 'contained'>Submit</Button>
                        </FormGroup>
                    </form>
               </Box> 
            </Modal>
        </>
        
    )
}