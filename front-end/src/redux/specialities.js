import { createSlice } from "@reduxjs/toolkit";

const specialitiesState = createSlice({
  name: "specialities",
  initialState: {
    "data": []
  },
  reducers: {
    setspecialitiesData: (state, action) => {
      state.data = action.payload;
    },
    deleteSpeciality: (state, action) => {
      state.data = state.data.filter(speciality => speciality.id !== action.payload);
    }
  }
})

export default specialitiesState.reducer;
export const { setspecialitiesData, deleteSpeciality } = specialitiesState.actions;
export const specialitiesDataState = state => state.specialities.data;