// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import imageReducer from './reducers/imageSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    image: imageReducer,
  },
});

export default store;
