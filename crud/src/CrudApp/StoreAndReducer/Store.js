import {configureStore} from "@reduxjs/toolkit";
import UserReducer from "./Reducer";

export const myStore=configureStore({
    reducer:{
        users:UserReducer
    }
})