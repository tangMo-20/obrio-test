import { Question, Questionnaire } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initQuestionId } from '@/constants';
import rowQuestionnaire from '../../../../assets/questionnaires/testQuestionnaire.json';

export const defaultUserId = 'testUser';
export const defaultQuestionnaire = rowQuestionnaire;

interface State {
  userId: string;
  questionnaire: Questionnaire;
  currentQuestion: Question;
  answers: Record<string, string>;
}

// In a real-life scenario, initial state should be filled with user auth data
// and a questionnaire that was preselected on previous steps of the application
const initialState: State = {
  userId: defaultUserId,
  questionnaire: defaultQuestionnaire,
  currentQuestion: defaultQuestionnaire.questions[initQuestionId],
  answers: {}
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    SET_USER_ID: (state, action: PayloadAction<{ userId: string }>) => {
      state.userId = action.payload.userId;
    },
    SET_QUESTIONNAIRE: (state, action: PayloadAction<{ questionnaire: Questionnaire }>) => {
      state.questionnaire = action.payload.questionnaire;
    },
    SET_CURRENT_QUESTION: (state, action: PayloadAction<{ question: Question }>) => {
      state.currentQuestion = action.payload.question;
    },
    SET_ANSWER: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      state.answers[action.payload.questionId] = action.payload.answer;
    }
  }
});

export const { SET_USER_ID, SET_QUESTIONNAIRE, SET_CURRENT_QUESTION, SET_ANSWER } =
  questionSlice.actions;

export default questionSlice.reducer;
