import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { projectAPI } from "./projectAPI";

export const getProjectView = createAsyncThunk(
    'project/get-project-view',
    async (cid) => {
        const res = await projectAPI.sendRequest('get_project_view', 'GET', {cid}, null, localStorage.getItem('token'))
        return res;
    }
)


const initialState = {
    cid: '',
    name: '',
    description: '',
    links: []
}
const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        updateVisibleLinks: (state, action) => {
            state.links = action.payload.links
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProjectView.fulfilled, (state, action) => {
            if (!action.payload) {
                return
            }
            if (!action.payload.viewable) {
                return
            }
            state.name = action.payload.name
            state.description = action.payload.description
            state.cid = action.payload.cid
            state.links = action.payload.links
        })
    }
})

export const {updateVisibleLinks} = projectSlice.actions

export default projectSlice.reducer;