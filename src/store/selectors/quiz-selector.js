import { createSelector } from "reselect";

const selectQuizes = (state) => state.questions.questions || [];
const selectCurrentQuizSubject = (state) => state.user.currentQuizSubject;

export const selectQuizBySubject = createSelector(
  [selectQuizes, selectCurrentQuizSubject],
  (quizes, currentSubject) => {
    const quizObj = quizes.find((q) => q.subject === currentSubject);
    return quizObj ? quizObj.questions : [];
  }
);
