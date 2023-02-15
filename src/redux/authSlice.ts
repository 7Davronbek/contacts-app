import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  isLoading: boolean;
  error: string;
  auth: string;
}

const initialState: IAuthState = {
  isLoading: false,
  error: "",
  auth: localStorage.getItem("TOKEN") || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.auth = "";
      localStorage.setItem("TOKEN", state.auth);
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
