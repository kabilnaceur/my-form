import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Form } from "../../../utils/types";

export interface FormsState {
  forms: Form[];
}

const initialState: FormsState = {
  forms: [],
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<Form>) => {
      state.forms = state.forms.concat(action.payload);
    },
  },
});

export default formsSlice.reducer;
export const { addForm } = formsSlice.actions;
