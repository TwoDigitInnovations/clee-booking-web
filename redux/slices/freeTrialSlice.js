import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  currentStep: 1,
  profileData: null,
  servicesData: [],
  staffData: [],
  schedulingData: null,
  planData: null,
};

const freeTrialSlice = createSlice({
  name: "freeTrial",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
      state.loading = false;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    addService: (state, action) => {
      state.servicesData.push(action.payload);
    },
    removeService: (state, action) => {
      state.servicesData = state.servicesData.filter(
        (s) => s._id !== action.payload
      );
    },
    setServicesData: (state, action) => {
      state.servicesData = action.payload;
    },
    addStaff: (state, action) => {
      state.staffData.push(action.payload);
    },
    removeStaff: (state, action) => {
      state.staffData = state.staffData.filter(
        (s) => s._id !== action.payload
      );
    },
    setStaffData: (state, action) => {
      state.staffData = action.payload;
    },
    setSchedulingData: (state, action) => {
      state.schedulingData = action.payload;
    },
    setPlanData: (state, action) => {
      state.planData = action.payload;
    },
    resetFreeTrial: () => initialState,
  },
});

export const {
  setLoading,
  setError,
  setSuccess,
  setCurrentStep,
  setProfileData,
  addService,
  removeService,
  setServicesData,
  addStaff,
  removeStaff,
  setStaffData,
  setSchedulingData,
  setPlanData,
  resetFreeTrial,
} = freeTrialSlice.actions;

export default freeTrialSlice.reducer;
