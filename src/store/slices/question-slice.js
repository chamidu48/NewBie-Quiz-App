import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState: initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    clearQuestions: (state) => {
        state.questions = null;
    },
  },
});

export const { setQuestions, clearQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;
