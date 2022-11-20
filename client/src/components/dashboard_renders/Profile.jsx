import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export default function Profile({}) {
    return (
        <Box sx = {{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            margin: 0,
            height: '100%',
            padding: 3,
        }}>
            <Typography variant = 'h5' component = 'div'>Account Profile</Typography>
            <form>
                
            </form>
        </Box>
    )
}