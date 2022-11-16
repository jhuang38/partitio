import { AppBar, Toolbar, Typography, Box, IconButton, Drawer } from "@mui/material"
import { useState } from "react"
import MenuItems from "./MenuItems"
import MenuIcon from "@mui/icons-material/Menu"
import React from "react"

export default function Dashboard() {
    const [drawerOpen, setDrawerState] = useState(false)
    const handleOpenMenu = () => {
        setDrawerState(() => true)
    }
    const handleCloseMenu = () => {
        setDrawerState(() => false)
    }
    return (
        <>
            <Box sx = {{
            flexGrow: 1,
            color: 'white'
        }}>
            <AppBar sx = {{}}>
                
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
                    <Typography variant = 'h5' component = 'div' sx = {{flexGrow: 1, margin: 2}}>Home</Typography>
                    
                </Toolbar>
            </AppBar>
        </Box>
        <Drawer
        anchor = 'left'
        open = {drawerOpen}
        onClose = {handleCloseMenu}
        >
        <MenuItems items = {['Profile', 'Projects']}></MenuItems>
        </Drawer>
        </>
        
    )
}