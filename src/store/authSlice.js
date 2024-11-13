import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login:false,
    userData: null,
}


export const authslice = createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        login:(state, action)=>{
            state.login = true;
            state.userData = action.payload;
        },
        logout:(state, action)=>{
            state.login = false;
            state.userData = action.payload
        }
    }
})

export const {login, logout} = authslice.actions;
const AuthSlice = authslice.reducer;
export default AuthSlice;