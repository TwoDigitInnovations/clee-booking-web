import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: null,
  loading: false,
  error: null,
};

const bookingSettingsSlice = createSlice({
  name: 'bookingSettings',
  initialState,
  reducers: {
    getBookingSettingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getBookingSettingsSuccess: (state, action) => {
      state.loading = false;
      state.settings = action.payload;
      state.error = null;
    },
    getBookingSettingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getBookingSettingsStart,
  getBookingSettingsSuccess,
  getBookingSettingsFailure,
} = bookingSettingsSlice.actions;

export default bookingSettingsSlice.reducer;
