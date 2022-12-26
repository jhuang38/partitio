import { Grid, Box, Typography, Paper, IconButton, FontAwesomeSvgIcon, Modal} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {styled} from '@mui/material/styles'
import React, {useState} from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }));

export default function GridLayout({labels = [], primaryActions = [], secondaryActions=[]}) {
    return (
        <Grid container spacing = {2}>
            {
                labels.map((l = '', i) => {
                    return (
                        <>
                            <Grid item xs = {12} sm = {6} md = {4} >
                                <Item >
                                <Box onClick = {primaryActions[i]} sx = {{cursor: 'pointer'}}>
                                {l}
                                </Box>
                                
                                <IconButton
                                onClick = {secondaryActions[i]}
                                >
                                    <EditIcon/>

                                </IconButton>
                                
                                </Item>
                                

                            </Grid>
                        </>
                        
                    )
                })
            }
        </Grid>
    )
}