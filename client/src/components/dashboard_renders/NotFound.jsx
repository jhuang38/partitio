import React from "react";
import { Box, Typography } from "@mui/material";
import { pageRenderStyles } from "../../utils/render_styles";

export default function NotFound() {
    return (
        <>
            <Typography variant = 'h5' sx = {{fontWeight: 'bold'}}>Not Found</Typography>
            <Typography variant = 'body2'>
                The requested page was not found. Check whether the page exists and if you have the proper permissions.
            </Typography>
        </>
    )
}