import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegistrationData } from "@/entities/User/types";

interface RegistrationState {
  registrationData: RegistrationData;
  step: number;
}

const initialState: RegistrationState = {
  registrationData: {},
  step: 0,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setRegistrationData(
      state,
      action: PayloadAction<Partial<RegistrationData>>
    ) {
      state.registrationData = { ...state.registrationData, ...action.payload };
    },
    nextStep(state) {
      state.step = Math.min(state.step + 1, 2);
    },
    prevStep(state) {
      state.step = Math.max(state.step - 1, 0);
    },
    resetRegistration(state) {
      state.registrationData = {};
      state.step = 0;
    },
  },
});

export const { setRegistrationData, nextStep, prevStep, resetRegistration } =
  registrationSlice.actions;

export default registrationSlice.reducer;
