import { Grid, Box, Typography, Paper} from "@mui/material";
import {styled} from '@mui/material/styles'
import React from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    cursor: 'pointer'
  }));

export default function GridLayout({labels = [], clickHandlers = [], gridWith = 4}) {
    return (
        <Grid container spacing = {2}>
            {
                labels.map((l = '', i) => {
                    return (
                        <Grid item xs = {12} sm = {6} md = {4} >
                            <Item onClick = {clickHandlers[i]}>{l}</Item>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}