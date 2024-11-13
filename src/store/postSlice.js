import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    allposts:[
    ]
}

export const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        addPost:(state, action)=>{
           state.allposts = action.payload
        }
        
    }
})

export const {addPost} = postSlice.actions;
const PostSlice = postSlice.reducer;
export default PostSlice;