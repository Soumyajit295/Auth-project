import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
    loggedInUserData: JSON.parse(localStorage.getItem('loggedInUserData')) || [],
    userLoggedIn: localStorage.getItem('userLoggedIn') === 'true',
    role: '',
    loading: false,
    error: null
};

const url = import.meta.env.VITE_API_URL;

export const register = createAsyncThunk('/user/register', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${url}/api/v1/users/register`, data);
        toast.success(response?.data?.message);
        return response.data;
    } catch (err) {
        toast.error(err?.response?.data?.message || err.message);
        return rejectWithValue(err.message);
    }
});

export const login = createAsyncThunk('/user/login', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${url}/api/v1/users/login`, data, { withCredentials: true });
        toast.success(response?.data?.message);
        return response.data;
    } catch (err) {
        toast.error(err?.response?.data?.message || err.message);
        return rejectWithValue(err.message);
    }
});

export const logout = createAsyncThunk('/user/logout', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${url}/api/v1/users/logout`, {}, { withCredentials: true });
        toast.success(response?.data?.message);
        return response.data;
    } catch (err) {
        toast.error(err?.response?.data?.message || err.message);
        return rejectWithValue(err.message);
    }
});

export const getProfile = createAsyncThunk('/user/profile', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${url}/api/v1/users/profile`, { withCredentials: true });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                localStorage.setItem('loggedInUserData', JSON.stringify(action.payload.data));
                localStorage.setItem('userLoggedIn', 'true');
                state.loggedInUserData = action.payload.data;
                state.userLoggedIn = true;
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem('loggedInUserData', JSON.stringify(action.payload.data));
                localStorage.setItem('userLoggedIn', 'true');
                state.loggedInUserData = action.payload.data;
                state.userLoggedIn = true;
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.loggedInUserData = [];
                state.userLoggedIn = false;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                localStorage.setItem('loggedInUserData', JSON.stringify(action.payload.data));
                state.loggedInUserData = action.payload.data;
            });
    }
});

export default userSlice.reducer;
