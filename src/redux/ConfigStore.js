import { configureStore } from "@reduxjs/toolkit";
import frameReducer from "./Frame"
import ImagesReducer from "./ImagesStore"
export default configureStore({
    reducer:{
        frame: frameReducer,
        Images: ImagesReducer
    }
});