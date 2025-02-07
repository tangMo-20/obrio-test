import { Button } from '@/components/Button/Button';
import { Question as QuestionType } from '@/types';
import { QUESTION_TYPE } from '@/constants';
import { parseQuestionTitle } from '@/utils.ts';
import styles from './Question.module.scss';
import clsx from 'clsx';

interface Props {
  question: QuestionType;
  selected: string | null;
  select: (index: number) => void;
  isPromo: boolean;
}

// Adding new functionality (like date pickers, etc.) will require updating the questionnaire
// json structure and updating this component. It's also possible to expand the "question type" logic
// so it would reflect what component whould be used to display the page.
export const Question = ({ question, select, selected, isPromo }: Props) => {
  const { title, subtitle, answers, type } = question;

  const handleSelectAnswer = (index: number) => {
    select(index);
  };

  return (
    <div className={styles.root}>
      <span className={clsx(styles.title, { [styles.promo]: isPromo })}>
        {parseQuestionTitle(title)}
      </span>
      {subtitle && (
        <span className={clsx(styles.subtitle, { [styles.promo]: isPromo })}>{subtitle}</span>
      )}
      <div className={styles.answers}>
        {answers.map((answer, index) => (
          <Button
            key={answer}
            title={answer}
            action={() => handleSelectAnswer(index)}
            isSelected={type === QUESTION_TYPE.QUESTION && selected === String(index)}
          />
        ))}
      </div>
    </div>
  );
};
