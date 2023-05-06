import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ApplicationState {
  firstTime: boolean;
  theme: string;
}

const initialState: ApplicationState = {
  firstTime: true,
  theme: "light",
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    changeFirstTime: (state) => {
      state.firstTime = false;
    },
  },
});

export default applicationSlice.reducer;
export const { changeTheme, changeFirstTime } = applicationSlice.actions;
