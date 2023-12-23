// types
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Toastfunction from "../../utils/ToastFunction";
import authService from "../../services/authService";

// initial state
const initialState = {
  isLoggedIn: false,
  user: null,
  loading: false,
};

// ==============================|| SLICE - MENU ||============================== //
export const Login = createAsyncThunk("@auth/LOGIN", async (info, thunkAPI) => {
  try {
    const response = await authService.login(info);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    if (response.data) {
      await thunkAPI.dispatch(GetUserByToken());
    }
    return response.data;
  } catch (error) {
    console.log("Error", error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const Register = createAsyncThunk(
  "@auth/REGISTER",
  async (info, thunkAPI) => {
    try {
      const response = await authService.register(info);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      if (response.data) {
        await thunkAPI.dispatch(GetUserByToken());
      }
      return response.data;
    } catch (error) {
      console.log("Error", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const GetUserByToken = createAsyncThunk(
  "@auth/GetUserByToken",
  async (thunkAPI) => {
    try {
      const response = await authService.getUserByToken();

      return response.data;
    } catch (error) {
      console.log("Error", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const Logout = createAsyncThunk("@auth/LOGOUT", async () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("token");
});

const auth = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [Login.fulfilled](state) {
      state.isLoggedIn = true;
      Toastfunction.TaostSuccess("Welcome Back");
    },
    [Login.rejected]: (state) => {
      state.isLoggedIn = false;
    },
    [Register.fulfilled](state) {
      state.isLoggedIn = true;
      Toastfunction.TaostSuccess("Welcome To M-Booking ");
    },
    [Login.rejected]: (state) => {
      state.isLoggedIn = false;
    },

    [GetUserByToken.fulfilled]: (state, action) => {
      state.user = action.payload.data;
      state.loading = false;
      state.isLoggedIn = true;
    },
    [GetUserByToken.pending]: (state) => {
      state.loading = true;
    },
    [GetUserByToken.rejected]: (state) => {
      state.loading = false;
    },

    [Logout.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },

    [Register.fulfilled](state) {
      state.isLoggedIn = true;
    },
  },
});

const { reducer } = auth;
export default reducer;
