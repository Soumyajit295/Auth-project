import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
    loggedInUserData : JSON.parse(localStorage.getItem('loggedInUserData')) || [],
    userLoggedIn : localStorage.getItem('userLoggedIn') || false,
    role : localStorage.getItem('userLoggedIn') || ''
}

const url = import.meta.env.VITE_API_URL

export const register = createAsyncThunk('/user/register',async(data,{rejectWithValue})=>{
    try{
        const promise = axios.post(`${url}/api/v1/users/register`,data)
        toast.promise(promise,{
            loading : 'Registering user',
            success : (res)=>res?.data?.message,
            error : (err)=>err?.response?.data?.message
        })
        return (await promise).data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})
export const login = createAsyncThunk('/user/login',async(data,{rejectWithValue})=>{
    try{
        const promise = axios.post(`${url}/api/v1/users/login`,data)
        toast.promise(promise,{
            loading : 'Wait a minute',
            success : (res)=>res?.data?.message,
            error : (err)=>err?.response?.data?.message
        })
        return (await promise).data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})
export const logout = createAsyncThunk('/user/logout',async(_,{rejectWithValue})=>{
    try{
        const promise = axios.post(`${url}/api/v1/users/logout`)
        toast.promise(promise,{
            loading : 'Logging out user',
            success : (res)=>res?.data?.message,
            error : (err)=>err?.response?.data?.message
        })
        return (await promise).data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})
export const getProfile = createAsyncThunk('/user/profile',async(_,{rejectWithValue})=>{
    try{
        const promise = await axios.get(`${url}/api/v1/users/profile`)
        return promise.data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(login.fulfilled,(state,action)=>{
            localStorage.setItem('loggedInUserData',JSON.stringify(action?.payload?.data))
            localStorage.setItem('userLoggedIn',true)
            state.loggedInUserData = action?.payload?.data
            state.userLoggedIn = true
        })
        builder.addCase(logout.fulfilled,(state,action)=>{
            localStorage.clear()
            state.loggedInUserData = []
            state.userLoggedIn = false
        })
        builder.addCase(getProfile.fulfilled,(state,action)=>{
            localStorage.setItem('loggedInUserData',JSON.stringify(action?.payload?.data))
            state.loggedInUserData = action?.payload?.data
        })
    }
})

export default userSlice.reducer