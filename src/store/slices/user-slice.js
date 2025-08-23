import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentQuizSubject: null
};

const userSlice = createSlice({
  name: "user-newbie",
  initialState: initialState,
  reducers: {
    setCurrentQuizSubject: (state, action) => {
      const { subject } = action.payload;
      state.currentQuizSubject = subject;
    },
    clearUser: (state) => {
      state.userId = null;
      state.email = null;
    },
  },
});

export const {setCurrentQuizSubject, clearUser } = userSlice.actions;
export default userSlice.reducer;
