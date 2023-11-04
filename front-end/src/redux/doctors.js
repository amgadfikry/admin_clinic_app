import { createSlice } from "@reduxjs/toolkit";

const doctorsState = createSlice({
  name: "doctors",
  initialState: {
    "data": []
  },
  reducers: {
    setDoctorsData: (state, action) => {
      state.data = action.payload;
    }
  }
})

export default doctorsState.reducer;
export const { setDoctorsData } = doctorsState.actions;
export const doctorsDataState = state => state.doctors.data;