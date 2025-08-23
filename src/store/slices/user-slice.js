import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentQuizSubject: null,
  currentIndex: 0,
  isFinished: false,
  score: 0,
  answered: [],
};

const userSlice = createSlice({
  name: "user-newbie",
  initialState: initialState,
  reducers: {
    setCurrentQuizSubject: (state, action) => {
      const { subject } = action.payload;
      state.currentQuizSubject = subject;
    },
    setCurrentIndex: (state, action) => {
      const { currentIndex } = action.payload;
      state.currentIndex = currentIndex;
    },
    setScore: (state) => {
      state.score = ++state.score;
    },
    setFinished: (state) => {
      state.isFinished = true;
    },
    addToAnswered: (state, action) => {
      const { answeredQ } = action.payload;
      state.answered.push(answeredQ);
    },
    clearSession: (state) => {
      state.currentIndex = 0;
      state.score = 0;
      state.answered = [];
      state.isFinished = false;
    },
    clearUser: (state) => {
      state.userId = null;
      state.email = null;
    },
  },
});

export const {
  setCurrentQuizSubject,
  setScore,
  setFinished,
  setCurrentIndex,
  addToAnswered,
  clearSession,
  clearUser,
} = userSlice.actions;
export default userSlice.reducer;
