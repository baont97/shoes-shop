import { createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  brandId: number;
  price: number;
  desc: string;
  colorId: number;
  image: string;
}

export interface Color {
  id: number;
  name: string;
  hex: string;
}

export interface Size {
  id: number;
  name: string;
}

export interface ProductState {
  productList: Product[];
  colorList: Color[];
  sizeList: Size[];
}

const initialState: ProductState = {
  productList: [],
  colorList: [
    {
      id: 1,
      name: "Trắng",
      hex: "#FFFFFF",
    },
    {
      id: 2,
      name: "Đỏ",
      hex: "#eb3443",
    },
    {
      id: 3,
      name: "Vàng",
      hex: "#dfeb34",
    },
  ],
  sizeList: Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    name: i + 38 + "",
  })),
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    saveProductList: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.productList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveProductList } = productSlice.actions;

export default productSlice.reducer;
