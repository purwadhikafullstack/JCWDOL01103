import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postLogin } from "../../api/auth";
import { jwtDecode } from "jwt-decode";
import { getAdminWarehouse } from "../../api/adminWarehouse";

export const userLogin = createAsyncThunk(
  "auth/postLogin",
  async (userData) => {
    try {
      const response = await postLogin(userData);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const fetchUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async () => {
    try {
      const userData = jwtDecode(localStorage.getItem("token"));
      const response = await getAdminWarehouse(userData.id);
    } catch (error) {
      
    }
  }
)

const initialState = {
  isAuthorized: false,
  loading: false,
  user: null,
  response: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuthorized: (state, action) => {
      const userData = localStorage.getItem("token");
      if (userData) {
        state.isAuthorized = true;
        state.user = userData;
      }
    },
    setLoadingState: (state, action) => {
      state.loading = action.payload
    },
    loginGoogle: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.isAuthorized = true;
      state.response = {message: "Google login succesfully"};
      state.loading = false;
    },
    logoutAuthorized: (state, action) => {
      localStorage.clear();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      const { status, token, message } = action.payload;
      if (status === 200) {
        localStorage.setItem("token", token);
        state.loading = false;
        state.isAuthorized = true;
        state.response = action.payload;
      } else {
        state.loading = false;
        state.response = action.payload;
      }
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.response = action.payload;
    });
  },
});

export const { checkAuthorized, loginGoogle, logoutAuthorized, setLoadingState } = authSlice.actions;
export default authSlice.reducer;
