import { createSelector } from "reselect";

const selectUserState = (state) => state.user;
const selectQuizes = (state) => state.questions.questions || [];
const selectCurrentQuizSubject = (state) => state.user.currentQuizSubject;

export const selectQuizBySubject = createSelector(
  [selectQuizes, selectCurrentQuizSubject],
  (quizes, currentSubject) => {
    const quizObj = quizes.find((q) => q.subject === currentSubject);
    return quizObj ? quizObj.questions : [];
  }
);

export const selectSession = createSelector(
  [selectUserState],
  (userState) => ({
    questions: userState.questions,
    currentIndex: userState.currentIndex,
    score: userState.score,
    answered: userState.answered,
    isFinished: userState.isFinished
  })
);
