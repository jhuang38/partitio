import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { pageRenderStyles } from "../../utils/render_styles";

export default function Loading() {
    return (
        <Box sx = {{...pageRenderStyles, alignItems: 'center', justifyContent: 'center'}}>
            <Typography>Loading...</Typography>
            <CircularProgress/>
        </Box>
    )
}