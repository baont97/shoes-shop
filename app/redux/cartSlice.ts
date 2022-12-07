import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

export interface CartProduct extends Product {
  sizeId: number;
  cartId: string;
  quantity: number;
  isPaid: boolean;
}

export interface CartState {
  cartList: CartProduct[];
}

const initialState: CartState = {
  cartList: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartList.push({ ...action.payload, isPaid: false });
    },
    removeFromCart: (state, action) => {
      state.cartList = state.cartList.filter(
        (x) => x.cartId !== action.payload.cartId
      );
    },
    editCart: (state, action) => {
      const index = state.cartList.findIndex(
        (x) => x.cartId === action.payload.cartId
      );
      if (index !== -1) {
        state.cartList[index] = action.payload;
      }
    },
    paidAll: (state) => {
      state.cartList = state.cartList.map((x) => ({
        ...x,
        isPaid: true,
      }));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, editCart, paidAll } =
  cartSlice.actions;

export default cartSlice.reducer;
