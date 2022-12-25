import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, Snackbar, Alert } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useParams } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import MenuItems from "./MenuItems"
import MenuIcon from "@mui/icons-material/Menu"
import React from "react"
import Collection from "./dashboard_renders/Collection"
import Profile from "./dashboard_renders/Profile"
import { useDispatch, useSelector } from "react-redux";
import {logOff} from '../features/auth/authSlice'
import ProjectView from "./dashboard_renders/ProjectView";
import { clearAlert } from "../features/alert/alertSlice";
import NotFound from "./dashboard_renders/NotFound";

export default function Dashboard({render = 'collections'}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let {cid} = useParams();
    const [drawerOpen, setDrawerState] = useState(false)
    const [pageHeading, setPageHeading] = useState('Collections')
    useEffect(() => {
        switch(render) {
            case 'collections':
                setPageHeading(() => 'My Collections')
                break
            case 'shared':
                setPageHeading(() => 'Shared with Me')
                break
            case 'project':
                setPageHeading(() => 'Project')
                break
            case 'profile':
                setPageHeading(() => 'Profile')
                break
            default:
                setPageHeading(() => 'Collections')
        }
    }, [render])
    const handleOpenMenu = () => {
        setDrawerState(() => true)
    }
    const handleCloseMenu = () => {
        setDrawerState(() => false)
    }
    const renderContent = () => {
        switch(render) {
            case 'collections':
                return <Collection collectionType = 'user'/>
            case 'shared':
                return <Collection collectionType = 'shared'/>
            case 'project':
                return <ProjectView cid = {cid}/>
            case 'profile':
                return <Profile/>
            default:
                return <NotFound/>
        }
    }
    const navigateFromMenu = (url) => {
        navigate(url)
        handleCloseMenu()
    }
    const logoffUser = () => {
        dispatch(logOff())
        .then(e => {
            navigate('/login')
        })
    }
    return (
        <>
            <AppBar sx = {{width: '100%', position: 'sticky'}}>
                
                <Toolbar sx = {{color: 'white'}}>
                    <IconButton onClick = {handleOpenMenu}>
                        <MenuIcon
                        size="large"
                        edge="start"
                        color="inherit"
                        style = {{
                            color: 'white'
                        }}
                        sx = {{
                            margin: 2
                        }}
                        ></MenuIcon>
                    </IconButton>
                    <Typography variant = 'h5' component = 'div' sx = {{flexGrow: 1, margin: 2}}>{pageHeading}</Typography>
                    <IconButton onClick = {() => navigateFromMenu('/profile')}>
                        <AccountCircleIcon
                        size="large"
                        edge="start"
                        color="inherit"
                        style = {{
                            color: 'white'
                        }}
                        sx = {{
                            margin: 2
                        }}/>
                    </IconButton>
                    <IconButton onClick = {logoffUser}>
                        <LogoutIcon 
                        size="large"
                        edge="start"
                        color="inherit"
                        style = {{
                            color: 'white'
                        }}
                        sx = {{
                            margin: 2
                        }}/>
                    </IconButton>
                    
                    
                    
                </Toolbar>
            </AppBar>
        {renderContent()}
        <Drawer
        anchor = 'left'
        open = {drawerOpen}
        onClose = {handleCloseMenu}
        >
        <MenuItems 
        items = {['My Collections', 'Shared with me']} 
        actionMap = {[() => navigateFromMenu('/collections'), () => navigateFromMenu('/shared')]}
        ></MenuItems>
        </Drawer>
        </>
        
    )
}