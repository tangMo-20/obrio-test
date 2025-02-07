'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header/Header';
import { Question } from '@/components/Question/Question';
import { getNextQuestionId, parseQuestionTitle } from '@/utils.ts';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { SET_ANSWER, SET_CURRENT_QUESTION } from '@/lib/features/question/questionSlice';
import { QUESTION_TYPE } from '@/constants';
import { UserAnswers } from '@/types';
import styles from './root.module.scss';
import clsx from 'clsx';

// I think dynamic routing is useless in this situation. If we generate pages
// via their ids it will suffocate the logic and security aspects of the application.
// Users would be able to ruin questionnaire flow by accessing wrong questions
// just by brood forcing URL params. In that case, we will need to add logic to prevent
// such behavior that will only increase the complexity of the application without any gain

// export async function generateStaticParams() {
//   return [];
// }

const App = () => {
  const dispatch = useAppDispatch();
  const { userId, questionnaire, currentQuestion, answers } = useAppSelector(
    (state) => state.question
  );
  const [isEnd, setIsEnd] = useState(false);
  const isPromo = currentQuestion.type === QUESTION_TYPE.PROMO;

  // It's possible to store each answer in the user json file right on the moment it was selected.
  // In that case, we will be able to continue the user's journey through the survey
  const handleSelect = (index: number) => {
    dispatch(SET_ANSWER({ questionId: currentQuestion.id, answer: String(index) }));

    const nextId = getNextQuestionId(currentQuestion);

    if (nextId) {
      dispatch(SET_CURRENT_QUESTION({ question: questionnaire.questions[nextId] }));
    } else if (nextId === null) {
      setIsEnd(true);
      handleStoreAnswers();
    }
  };

  const handleBack = () => {
    if (currentQuestion.prev) {
      dispatch(SET_CURRENT_QUESTION({ question: questionnaire.questions[currentQuestion.prev] }));
    }
  };

  const handleStoreAnswers = async () => {
    const data: UserAnswers = {
      userId,
      questionnaireId: questionnaire.id,
      answers
    };

    fetch(`/api/userAnswer/${questionnaire.id}/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ data })
    }).catch((err) => console.error('POST error:', err));
  };

  // The data from GET request could be used for saving survey progress if user leaves the page
  // In that case we will need to use this data as an initial state of a reducer
  useEffect(() => {
    fetch(`/api/userAnswer/${questionnaire.id}/${userId}`)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error('GET error:', err));
  }, [questionnaire.id, userId]);

  return (
    <div
      className={clsx(styles.root, {
        [styles.promo]: isPromo
      })}
    >
      <Header
        isBack={Boolean(currentQuestion.prev && !isEnd)}
        back={handleBack}
        isPromo={isPromo}
      />
      <div className={styles.content}>
        {isEnd ? (
          <div className={styles.finalMessage}>
            <span>Thank you for participating in a survey!</span>
            {Object.entries(answers).map(([questionId, answerId]) => {
              const title = parseQuestionTitle(questionnaire.questions[questionId].title);
              const subtitle = questionnaire.questions[questionId].subtitle;
              const answer = questionnaire.questions[questionId].answers[Number(answerId)];

              return (
                <div key={questionId} className={styles.answerDisplay}>
                  <span className={styles.question}>{title}</span>
                  {subtitle && <span className={styles.question}>{subtitle}</span>}
                  <span className={styles.answer}>{answer}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <Question
            question={currentQuestion}
            selected={answers[currentQuestion.id] ?? null}
            select={handleSelect}
            isPromo={isPromo}
          />
        )}
      </div>
    </div>
  );
};

export default App;
