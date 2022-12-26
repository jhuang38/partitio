import React from "react";
import { Box, Typography } from "@mui/material";
import LinkListRender from "../LinkListRender";

export default function ProjectPublicView({name='', description='', links=[], cid = ''}) {
    return (
        <>
            <Typography variant = 'h5' sx = {{fontWeight: 'bold'}}>{name}</Typography>
            <Typography>{description}</Typography>
            <LinkListRender linkData={links} editView= {false} cid = {cid}/>
        </>
        
        
    )
}