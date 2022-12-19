import { AppBar, Toolbar, Typography, Box, IconButton, Drawer } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import MenuItems from "./MenuItems"
import MenuIcon from "@mui/icons-material/Menu"
import React from "react"
import Collection from "./dashboard_renders/Collection"
import Home from "./dashboard_renders/Home"
import Profile from "./dashboard_renders/Profile"
import { useDispatch, useSelector } from "react-redux";
import {logOff} from '../features/auth/authSlice'

export default function Dashboard({render = 'home'}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const [drawerOpen, setDrawerState] = useState(false)
    const [pageHeading, setPageHeading] = useState('Home')
    useEffect(() => {
        switch(render) {
            case 'collections':
                setPageHeading(() => 'Collections')
                break
            case 'profile':
                setPageHeading(() => 'Profile')
                break
            default:
                setPageHeading(() => 'Home')
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
                return <Collection/>
            case 'profile':
                return <Profile/>
            default:
                return <Home/>
        }
    }
    const navigateFromMenu = (url) => {
        navigate(url)
        handleCloseMenu()
    }
    const logoffUser = () => {
        dispatch(logOff())
        .then(e => {
            console.log({state, e})
            navigate('/login')
        })
    }
    return (
        <>
            <Box sx = {{
            color: 'white',
            position: 'sticky',
            width: '100%'
            }}>
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
            
        </Box>
        {renderContent()}
        <Drawer
        anchor = 'left'
        open = {drawerOpen}
        onClose = {handleCloseMenu}
        >
        <MenuItems 
        items = {['Home', 'Collections']} 
        actionMap = {[() => navigateFromMenu('/home'), () => navigateFromMenu('/collection')]}
        ></MenuItems>
        </Drawer>
        </>
        
    )
}