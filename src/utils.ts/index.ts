import { store } from '@/app/StoreProvider';
import { Question } from '@/types';

export const getNextQuestionId = (question: Question): string | null => {
  const { answers } = store.getState().question;
  const { next } = question;

  if (!next) {
    return null;
  }

  if (typeof next === 'string') {
    return next;
  } else {
    let parsedNext;

    Object.entries(next).forEach(([questionToParse, nextQuestion]) => {
      const [question, answer] = questionToParse.split('/');

      if (answers[question] === answer) {
        parsedNext = nextQuestion;
      }
    });

    if (parsedNext) {
      return parsedNext;
    }
  }

  return null;
};

export const parseQuestionTitle = (title: string) => {
  const { answers, questionnaire } = store.getState().question;
  const matches = title.matchAll(/\{\{\w+(\/\w+)?(\/.+)?\}\}/g);

  let newTitle = title;

  for (const match of matches) {
    const originalMatch = match[0];
    const code = originalMatch.replaceAll('{', '').replaceAll('}', '');
    const [questionId, answer, replacementString] = code.split('/');

    if (answer !== undefined && replacementString !== undefined) {
      newTitle = newTitle.replaceAll(
        originalMatch,
        answers[questionId] === answer ? replacementString : ''
      );
    } else {
      const replacementString =
        questionnaire.questions[questionId].answers[Number(answers[questionId])];

      newTitle = newTitle.replaceAll(originalMatch, replacementString);
    }
  }

  return newTitle;
};
