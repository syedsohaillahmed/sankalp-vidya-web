import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
  isLoading: false,
  isError: false,
  data: null,
};

export const authSlice = createSlice({
  name: "loggedIn",
  initialState,
  reducers: {
    login: (state, action) => {
        state.isLoggedin = true
        state.data = action.payload.data
    },
    logout : (state, action)=>{
        state.isLoggedin = false
        state.data = null
    }
  }
});

export const { login, logout } = authSlice.actions
export default authSlice.reducer