import { createSlice } from "@reduxjs/toolkit";

export interface Brand {
  id: number;
  name: string;
}

export interface BrandState {
  brandList: Brand[];
}

const initialState: BrandState = {
  brandList: [],
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    saveBrandList: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.brandList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveBrandList } = brandSlice.actions;

export default brandSlice.reducer;
