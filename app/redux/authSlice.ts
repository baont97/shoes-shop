import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserDetail {
  DIACHI: string;
  DIENTHOAI: string;
  EMAIL: string;
  HINHANH: string;
  HOTENKH: string;
  KHOIPHUCMATKHAU: any;
  MAKH: number;
  MATKHAUKH: string;
  NGAYSINH: string;
  TENDNKH: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  userDetail: UserDetail;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userDetail: {
    DIACHI: "",
    DIENTHOAI: "",
    EMAIL: "",
    HINHANH: "",
    HOTENKH: "",
    KHOIPHUCMATKHAU: "",
    MAKH: -1,
    MATKHAUKH: "",
    NGAYSINH: "",
    TENDNKH: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userDetail = action.payload;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = initialState.isLoggedIn;
      state.userDetail = initialState.userDetail;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logOut } = authSlice.actions;

export default authSlice.reducer;
