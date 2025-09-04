import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  id: null,
  isLogin: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { name, id } = action.payload || {};
      state.name = name || null;
      state.id = id || null;
      state.isLogin = true;
      state.error = null;
    },
    clearUser(state) {
      state.name = null;
      state.id = null;
      state.isLogin = false;
      state.error = null;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isLogin = false;
    },
    login(state) {
      state.isLogin = true;
      state.error = null;
    },
    logout(state) {
      state.name = null;
      state.id = null;
      state.isLogin = false;
      state.error = null;
    },
  },
});

export const { setUser, clearUser, setLoading, setError, login, logout } =
  userSlice.actions;
export default userSlice.reducer;
