import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import bookingReducer from "./slices/bookingSlice";
import servicesReducer from "./slices/servicesSlice";
import calendarSettingsReducer from "./slices/calendarSettingsSlice";
import bookingSettingsReducer from "./slices/bookingSettingsSlice";
import staffReducer from "./slices/staffSlice";
import authReducer from "./slices/authSlice";
import freeTrialReducer from "./slices/freeTrialSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
    services: servicesReducer,
    calendarSettings: calendarSettingsReducer,
    bookingSettings: bookingSettingsReducer,
    staff: staffReducer,
    auth: authReducer,
    freeTrial: freeTrialReducer,
  },
});
