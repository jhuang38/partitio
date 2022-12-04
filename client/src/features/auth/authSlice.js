import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { authAPI } from './authAPI';

// backend_url.origin}/api/`

export const createNewUser = createAsyncThunk(
    'auth/createNewUser',
    async (body) => {
        const res = await authAPI.sendRequest('create_user', 'POST', {}, body);
        return res
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (params) => {
        const res = await authAPI.sendRequest('login', 'GET', params, null)
        return res
    }
)

export const tokenLogin = createAsyncThunk(
    'auth/tokenLogin',
    async (params) => {
        const res = await authAPI.sendRequest('login', 'GET', params, null, localStorage.getItem('token'))
        return res;
    }
)

export const logOff = createAsyncThunk(
    'auth/logoff',
    async () => {
        const res = await authAPI.sendRequest('logout', 'POST', {}, {}, '')
        return res
    }
)

const initialState = {
    user: null,
    loading: 'idle' // loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUserState: (state, action) => {
            state.user = action.payload.auth_user
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createNewUser.fulfilled, (state, action) => {
            console.log({state, action})
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            console.log({state, action})
        })
        .addCase(logOff.fulfilled, (state, action) => {
            console.log({state, action})
            localStorage.removeItem('token')
            state.user = null
        })
    }
});

export const {updateUserState} = authSlice.actions;


export default authSlice.reducer;