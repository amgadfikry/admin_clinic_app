import { createSlice } from "@reduxjs/toolkit";

const specialitiesState = createSlice({
  name: "specialities",
  initialState: {
    "data": []
  },
  reducers: {
    setspecialitiesData: (state, action) => {
      state.data = action.payload;
    }
  }
})

export default specialitiesState.reducer;
export const { setspecialitiesData } = specialitiesState.actions;
export const specialitiesDataState = state => state.specialities.data;