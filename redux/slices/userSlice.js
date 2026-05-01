import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("userDetail", JSON.stringify(action.payload));
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    logoutUser: (state) => {
      state.user = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("userDetail");
        localStorage.removeItem("token");
      }
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
