import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  loggedInUserData: JSON.parse(localStorage.getItem("loggedInUserData")) || {},
  userLoggedIn: localStorage.getItem("userLoggedIn") === "true",
  role: "",
  loading: false,
  success: null,
  error: null,
};

const url = import.meta.env.VITE_API_URL;

export const register = createAsyncThunk(
  "/user/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = axios.post(`${url}/api/v1/users/register`, data);
      toast.promise(response, {
        loading: "Registering user",
        success: (res) => res?.data?.message,
        error: (err) => err?.response?.data?.message,
      });
      return (await response).data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const login = createAsyncThunk(
  "/user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = axios.post(`${url}/api/v1/users/login`, data, {
        withCredentials: true,
      });
      toast.promise(response, {
        loading: "Wait a minute",
        success: (res) => res?.data?.message,
        error: (err) => err?.response?.data?.message,
      });
      return (await response).data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logout = createAsyncThunk(
  "/user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = axios.post(
        `${url}/api/v1/users/logout`,
        {},
        { withCredentials: true }
      );
      toast.promise(response, {
        loading: "Logiing out user",
        success: (res) => res?.data?.message,
        error: (err) => err?.response?.data?.message,
      });
      return (await response).data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getProfile = createAsyncThunk(
  "/user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/api/v1/users/profile`, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        localStorage.setItem(
          "loggedInUserData",
          JSON.stringify(action.payload.data)
        );
        localStorage.setItem("userLoggedIn", "true");
        state.loggedInUserData = action.payload.data;
        state.userLoggedIn = true;
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem(
          "loggedInUserData",
          JSON.stringify(action.payload.data)
        );
        localStorage.setItem("userLoggedIn", "true");
        state.loggedInUserData = action.payload.data;
        state.userLoggedIn = true;
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.loggedInUserData = {};
        state.userLoggedIn = false;
        state.loading = false;
        state.success = "Logged out successfully";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        localStorage.setItem(
          "loggedInUserData",
          JSON.stringify(action.payload.data)
        );
        state.loggedInUserData = action.payload.data;
        state.loading = false;
        state.success = "Profile loaded successfully";
      });
  },
});

export default userSlice.reducer;
