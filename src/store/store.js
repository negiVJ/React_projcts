import {configureStore} from '@reduxjs/toolkit' 
import AuthSlice from './authSlice';
import PostSlice from './postSlice';

const store = configureStore({
    reducer:{
        auth:AuthSlice,
        post:PostSlice,
    },
})

export default store;