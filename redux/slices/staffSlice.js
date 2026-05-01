import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  staff: [],
  loading: false,
  error: null,
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    fetchStaffStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStaffSuccess: (state, action) => {
      state.loading = false;
      state.staff = action.payload;
      state.error = null;
    },
    fetchStaffFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStaffStart,
  fetchStaffSuccess,
  fetchStaffFailure,
} = staffSlice.actions;

export default staffSlice.reducer;
