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

export const editCollection = createAsyncThunk(
    'collection/edit-collection',
    async (newCollectionInfo) => {
        const res = await collectionAPI.sendRequest('edit_collection', 'PUT', {}, newCollectionInfo, localStorage.getItem('token'))
        return res
    }
)

export const deleteCollection = createAsyncThunk(
    'collection/delete-collection',
    async (collectionInfo) => {
        const res = await collectionAPI.sendRequest('delete_collection', 'DELETE', {}, collectionInfo, localStorage.getItem('token'))
        return res
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
            let dataAdded = action.payload.added
            dataAdded.maintainers = action.payload.maintainers
            state.userCollections.push(dataAdded)
        })
        .addCase(editCollection.fulfilled, (state, action) => {
            const index = state.userCollections.findIndex((e={}) => e.collection_id === action.payload.data.collection_id)
            let newUserCollections = [...state.userCollections]
            newUserCollections[index]= action.payload.data
            state.userCollections.splice(0, state.userCollections.length)
            newUserCollections.forEach((e = {}) => {
                state.userCollections.push(e)
            })
            
            console.log({state, action})
        })
        .addCase(deleteCollection.fulfilled, (state, action) => {
            state.userCollections.splice(state.userCollections.findIndex((c = {}) => c.collection_id === action.payload.data.collection_id), 1)
        })
    }
})

export const {setUserCollections} = collectionSlice.actions

export default collectionSlice.reducer