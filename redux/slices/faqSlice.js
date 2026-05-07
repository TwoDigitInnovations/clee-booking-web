import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  faqPage: [],
  consultSection: [],
  loading: false,
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    setFaqPage: (state, action) => {
      state.faqPage = action.payload;
    },
    setConsultSection: (state, action) => {
      state.consultSection = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setFaqPage, setConsultSection, setLoading } = faqSlice.actions;
export default faqSlice.reducer;
