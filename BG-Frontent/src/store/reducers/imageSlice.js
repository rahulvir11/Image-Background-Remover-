import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  file: null,
  convertedImage: null,
};

const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
      setFile: (state, action) => {
        console.log(action);
        state.file = action.payload;
      },
      reset: (state) => {
        state.file = null;
        state.convertedImage = null;
      },
      setConvertImageAPI : (state, action)=>{ 
        console.log(action);
      state.convertedImage = action.payload
    }
    },
  });
  export const { setFile, reset,setConvertImageAPI } = imageSlice.actions;
  export default imageSlice.reducer;