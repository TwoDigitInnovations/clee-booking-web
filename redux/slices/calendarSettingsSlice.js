import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: null,
  loading: false,
  error: null,
};

const calendarSettingsSlice = createSlice({
  name: 'calendarSettings',
  initialState,
  reducers: {
    getCalendarSettingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCalendarSettingsSuccess: (state, action) => {
      state.loading = false;
      state.settings = action.payload;
      state.error = null;
    },
    getCalendarSettingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getCalendarSettingsStart,
  getCalendarSettingsSuccess,
  getCalendarSettingsFailure,
} = calendarSettingsSlice.actions;

export default calendarSettingsSlice.reducer;
