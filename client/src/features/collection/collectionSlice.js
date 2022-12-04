import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { collectionAPI } from './collectionAPI';

export const addCollection = createAsyncThunk(
    'collection/add-collection',
    async (body) => {
        const res = await collectionAPI.sendRequest('add_collection', 'POST', {}, body, localStorage.getItem('token'))
        return res;
    }
)

export const getUserCollections = createAsyncThunk(
    'collection/get-user-collections',
    async (username) => {
        const res = await collectionAPI.sendRequest('get_user_collections', 'GET', {username}, null, localStorage.getItem('token'))
        return res.collections
    }
)


const initialState = {
    homeCollections: [],
    userCollections: []
}

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        setUserCollections: (state, action) => {
            state.userCollections = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addCollection.fulfilled, (state, action) => {
            console.log({state, action})
            state.userCollections.push(action.payload.added)
        })
    }
})

export const {setUserCollections} = collectionSlice.actions

export default collectionSlice.reducer