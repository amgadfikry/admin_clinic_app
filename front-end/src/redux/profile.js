import { createSlice } from "@reduxjs/toolkit";

const profileState = createSlice({
  name: "profile",
  initialState: {
    "data": {}
  },
  reducers: {
    setAdminData: (state, action) => {
      for (const key in action.payload) {
        state.data[key] = action.payload[key];
      }
    }
  }
})

export default profileState.reducer;
export const { setAdminData } = profileState.actions;
export const adminDataState = state => state.profile.data;