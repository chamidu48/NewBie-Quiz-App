import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjects: [],
};

const subjectsSlice = createSlice({
  name: "subjects",
  initialState: initialState,
  reducers: {
    setSubjects: (state, action) => {
      const {subjects} = action.payload
      state.subjects = subjects;
    },
    clearSubjects: (state) => {
        state.subjects = [];
    },
  },
});

export const { setSubjects, clearSubjects } = subjectsSlice.actions;
export default subjectsSlice.reducer;
