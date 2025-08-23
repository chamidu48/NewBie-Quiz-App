import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  email: null,
  currentQuizSubject: null
};

const userSlice = createSlice({
  name: "user-newbie",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      const { uid, email } = action.payload;
      state.userId = uid;
      state.email = email;
    },
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

export const { setUser, setCurrentQuizSubject, clearUser } = userSlice.actions;
export default userSlice.reducer;
