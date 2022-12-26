import { Modal, Box, Typography, FormGroup, Button } from "@mui/material"
import { modalBoxStyle, modalFormStyle } from "../utils/render_styles"
import React, {useRef} from "react"
import ValidatedTextInput from "./ValidatedTextInput";
import { linkDescriptionValidator, linkNameValidator, linkURLValidator } from "../utils/validators";


export default function LinkEditModal({open, onClose, linkData = {
       link_id: '',
       link_name: '',
       link_desc: '',
       link_url: '',
       last_updated: '',
       last_updated_by: ''}, onEditSubmit, onDeleteSubmit}) {
    let linkNameRef = useRef('');
    let linkNameErrRef = useRef(true);
    let linkDescRef = useRef('');
    let linkDescErrRef = useRef(true)
    let linkUrlRef = useRef('');
    let linkUrlErrRef = useRef(true)

    linkNameRef.current = linkData.link_name;
    linkDescRef.current = linkData.link_desc;
    linkUrlRef.current = linkData.link_url;

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (linkNameErrRef.current || linkDescErrRef.current || linkUrlErrRef.current) {
            return;
        }
        const payload = {
            link_id: linkData.link_id,
            link_name: linkNameRef.current,
            link_desc: linkDescRef.current,
            link_url: linkUrlRef.current,
        }
        onEditSubmit(payload)
    }
    const handleDeleteSubmit = () => {
        const payload = {
            link_id: linkData.link_id,
            link_name: linkNameRef.current
        }
        onDeleteSubmit(payload)
    }

    // note: date timezones are just taken as zulu in database, Z must be manually added to display
    return (
        <Modal open = {open} onClose = {onClose} disablePortal = {true}>
            <Box sx = {modalBoxStyle}>
                <Typography variant = 'h5' sx = {{fontWeight: 'bold'}}>Edit Link</Typography>
                <Typography variant = 'string'>Edit or delete a link.</Typography>
                <form onSubmit={handleEditSubmit} style = {modalFormStyle}>
                    <FormGroup sx = {modalFormStyle}>
                        <ValidatedTextInput label = 'Link Name' validator={linkNameValidator} innerRef = {linkNameRef} errorRef = {linkNameErrRef} required = {true}/>
                        <ValidatedTextInput label = 'Link Description' validator = {linkDescriptionValidator} innerRef = {linkDescRef} errorRef = {linkDescErrRef} required = {false} multiline = {true}/>
                        <ValidatedTextInput label = 'Link URL' validator = {linkURLValidator} innerRef = {linkUrlRef} errorRef = {linkUrlErrRef} required = {true}/>
                        <Typography variant = 'body1'>Last edited on {(new Date(linkData.last_updated + 'Z')).toLocaleString()} by {linkData.last_updated_by}</Typography>
                        <Button type = 'submit' variant = 'contained'>Edit link</Button>
                        <Button color = 'error' variant = 'contained' onClick = {handleDeleteSubmit}>Delete link</Button>
                    </FormGroup>
                </form>
            </Box>
        </Modal>
    )
}