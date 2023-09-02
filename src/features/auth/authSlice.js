import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState : {
        user: null,
        token: null,
    },
    reducers: {
        setCredentials:(state,action)=>{
            const {user,accessToken} = action.payload 
            state.user = userstare.token = accessToken
        },
        logout: (state,action) => {
            state.user = null
            state.token = null
        }
    }
})

export const {setCredentials,logout} = authSlice.actions

export default authSlice.reducer