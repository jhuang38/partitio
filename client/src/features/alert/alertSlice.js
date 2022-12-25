import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alertMessage: '',
    alertType: '',
    isOpen: false
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        triggerAlert: (state, action) => {
            const {message, type} = action.payload;
            state.alertMessage = message;
            state.alertType = type
            state.isOpen = true;
        },
        receiveAlert: (state, action) => {
            if (!state.isOpen) {
                const {message, type} = action.payload;
                state.alertMessage = message;
                state.alertType = type
                state.isOpen = true;
            }
        },
        clearAlert: (state) => {
            state.isOpen = false;
            state.alertMessage = '';
            state.alertType = 'info';
            
        }
    }
})

export const {triggerAlert, clearAlert, receiveAlert} = alertSlice.actions;

export default alertSlice.reducer;