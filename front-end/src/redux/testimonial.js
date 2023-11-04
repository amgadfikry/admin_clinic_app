import { createSlice } from "@reduxjs/toolkit";

const testimonialState = createSlice({
  name: "testomonial",
  initialState: {
    "data": []
  },
  reducers: {
    setTestimonialsData: (state, action) => {
      state.data = action.payload;
    }
  }
})

export default testimonialState.reducer;
export const { setTestimonialsData } = testimonialState.actions;
export const testimonialDataState = state => state.testomonial.data;