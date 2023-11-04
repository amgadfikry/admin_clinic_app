import { createSlice } from "@reduxjs/toolkit";

const appointmentsState = createSlice({
  name: "appointments",
  initialState: {
    "data": []
  },
  reducers: {
    setAppointmentsData: (state, action) => {
      state.data = action.payload;
    }
  }
})

export default appointmentsState.reducer;
export const { setAppointmentsData } = appointmentsState.actions;
export const appointmentsDataState = state => state.appointments.data;