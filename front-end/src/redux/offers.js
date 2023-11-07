import { createSlice } from "@reduxjs/toolkit";

const offersState = createSlice({
  name: "offers",
  initialState: {
    "data": []
  },
  reducers: {
    setOffersData: (state, action) => {
      state.data = action.payload;
    },
    deleteSpeciality: (state, action) => {
      state.data = state.data.filter(offer => offer.id !== action.payload);
    }
  }
})

export default offersState.reducer;
export const { setOffersData, deleteOffer } = offersState.actions;
export const offersDataState = state => state.offers.data;