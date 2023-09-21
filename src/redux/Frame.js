import { createSlice } from "@reduxjs/toolkit";

export const frameSlice = createSlice({
    name: "frame",
    initialState: {
        frame: null,
    },
    reducers:{
        setFrame: (state,frame) => {
            state.frame = frame
        }
    }
})

export const {setFrame} = frameSlice.actions;

export default frameSlice.reducer;