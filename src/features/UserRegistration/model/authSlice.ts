import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileResponse } from "@/entities/User/types";

interface AuthState {
  token: string | null;
  userProfile: UserProfileResponse | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  userProfile: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setUserProfile(state, action: PayloadAction<UserProfileResponse | null>) {
      state.userProfile = action.payload;
    },
    logout(state) {
      state.token = null;
      state.userProfile = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, setUserProfile, logout } = authSlice.actions;

export default authSlice.reducer;
