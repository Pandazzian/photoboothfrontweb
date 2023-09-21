import { createSlice } from "@reduxjs/toolkit";

export const ImageSlice = createSlice({
    name: "Images",
    initialState: {
        images: [],
    },
    reducers:{
        addImage: (state,data) => {
            console.log(data);
            state.images = [...state.images,data]
            console.log(state.images);
        },
        delAll: (state) => {
            state.images = []
        }
    }
})

export const {addImage,delAll} = ImageSlice.actions;

export default ImageSlice.reducer;