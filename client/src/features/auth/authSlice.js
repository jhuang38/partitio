import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { authAPI } from './authAPI';

// backend_url.origin}/api/`

export const createNewUser = createAsyncThunk(
    'auth/createNewUser',
    async (body) => {
        console.log({body})
        const res = await authAPI.sendRequest('/api/auth/create-user', 'POST', {}, body);
        console.log(res);
    }
);

const initialState = {
    user: {},
    loading: 'idle' // loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(createNewUser.fulfilled, (state, action) => {
            console.log({state, action})
        })
    }
});


export default authSlice.reducer;