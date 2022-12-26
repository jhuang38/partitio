import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import collectionReducer from '../features/collection/collectionSlice'
import projectReducer from '../features/project/projectSlice';
import alertReducer from '../features/alert/alertSlice'

export const store = configureStore({
  reducer: {
      auth: authReducer,
      collection: collectionReducer,
      project: projectReducer,
      alert: alertReducer
  },
});
