import React, {useEffect, useState} from "react";
import ProjectEditorView from "./ProjectEditorView";
import ProjectPublicView from "./ProjectPublicView";
import { useDispatch, useSelector } from "react-redux";
import { getProjectView } from "../../features/project/projectSlice";
import { Box } from "@mui/material";
import { pageRenderStyles } from "../../utils/render_styles";
import NotFound from "./NotFound";

export default function ProjectView({cid = ''}) {
    const dispatch = useDispatch();
    const currentProject = useSelector(state => state.project)
    const [viewType, setViewType] = useState('view')
    
    const determineProjectRender = (props) => {
        switch (viewType) {
            case 'edit':
                return <ProjectEditorView {...props}/>;
            case 'view':
                return <ProjectPublicView {...props}/>;
            default:
                return <NotFound/>
        }
    }
    useEffect(() => {
        if (cid) {
            dispatch(getProjectView(cid))
            .then(res => {
                return res.payload;
            })
            .then((data = {}) => {
                if (data.editable) {
                    setViewType(() => 'edit')
                    // establish ws connection
                } else if (data.viewable) {
                    setViewType(() => 'view')
                } else {
                    setViewType(() => '')
                }
            })
        }
    }, [])
    return (
        <Box sx = {pageRenderStyles}>
            {determineProjectRender(currentProject)}
        </Box>
    )
}