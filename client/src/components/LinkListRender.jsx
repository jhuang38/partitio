import { Card, Grid, Typography, CardContent, Link, Box, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import React, {useState, useRef} from "react";
import LinkEditModal from "./LinkEditModal";
import { useDispatch } from "react-redux";
import { triggerAlert } from "../features/alert/alertSlice";

export default function LinkListRender({linkData = [], editView=false, socket={}, cid = '', username = ''}) {
    const [linkEditModalOpen, setLinkEditModalOpen] = useState(false);
    const [linkEditData, setLinkEditData] = useState({});
    const dispatch = useDispatch();
    const openEditModal = () => {
        setLinkEditModalOpen(() => true)
    }
    const closeEditModal = () => {
        setLinkEditModalOpen(() => false)
    }
    const dispatchEditData = (payload = {}) => {
        socket.emit('link edited', {cid, username, ...payload})
        dispatch(triggerAlert({message: `Link edited. If you don't see your changes, the link you were trying to edited may have been deleted.`, type: 'success'}))
        closeEditModal()
    }
    const dispatchDeleteData = (payload = {}) => {
        socket.emit('link deleted', {cid, username, ...payload})
        dispatch(triggerAlert({message: `Link ${payload.link_name} succesfully deleted.`, type: 'success'}))
        closeEditModal()
    }
    return (
        <>
            <Grid spacing = {2} container sx = {{paddingTop: 1, paddingBottom: 1}}>
                {
                    [...linkData].sort((a, b) => {
                        return new Date(b.last_updated) - new Date(a.last_updated)
                    }).map((l = {}) => {
                        const openLinkUrl = () => {
                            let url = l.link_url;
                            if (!/^https?:\/\//i.test(url)) {
                                url = 'http://' + url;
                            }
                            window.open(url)
                        }
                        const onEditButtonClick = () => {
                            setLinkEditData(() => l)
                            openEditModal()
                        }
                        return (
                            <Grid item xs = {12}>
                                <Card variant = 'outlined'>
                                    <CardContent sx = {{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1}}>
                                        <Box>
                                            <Link variant = 'h6' component = 'div' underline = 'none' onClick = {openLinkUrl} color = 'inherit' sx = {{cursor: 'pointer'}}>
                                                {l.link_name}
                                            </Link>
                                            <Typography variant = 'body2'>{l.link_desc}</Typography>
                                        </Box>
                                        {
                                        !editView ||
                                        <IconButton onClick = {onEditButtonClick}>
                                            <EditIcon/>
                                        </IconButton>
                                        
                                        }
                                        
                                    </CardContent>
                                    
                                </Card>
                            </Grid>
                            
                        )
                    })
                }
                <Card></Card>
            </Grid>
            <LinkEditModal open = {linkEditModalOpen} onClose = {closeEditModal} linkData = {linkEditData}
            onEditSubmit = {dispatchEditData} onDeleteSubmit = {dispatchDeleteData}
            />
        </>
        
    );
}